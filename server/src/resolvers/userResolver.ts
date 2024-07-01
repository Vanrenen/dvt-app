import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const userResolver = {
    Query: {
        users: async () => await User.find(),
    },
    Mutation: {
        registerUser: async (_: any, { username, password }: { username: string; password: string; }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, password: hashedPassword });
            await user.save();
            return user;
        },
        loginUser: async (_: any, { username, password }: { username: string; password: string; }) => {
            const user = await User.findOne({ username });
            if (!user) throw new Error('User not found');
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new Error('Incorrect password');
            const token = jwt.sign({ userId: user.id }, 'SECRET_KEY');
            return { token };
        },
    },
};

export default userResolver;
