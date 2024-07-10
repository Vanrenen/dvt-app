import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
import User from '../models/User.js';

export const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find();
      } catch (err) {
        throw new Error('Failed to fetch users');
      }
    },
    user: async (_: any, { id }: any) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new UserInputError('User not found');
        }
        return user;
      } catch (err) {
        throw new Error('Failed to fetch user');
      }
    },
  },
  Mutation: {
    registerUser: async (_: any, { username, password }: any) => {
      try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new UserInputError('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, password: hashedPassword });

        await user.save();
        return user;
      } catch (err) {
        throw new Error('Failed to register user');
      }
    },
    loginUser: async (_: any, { username, password }: any) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new UserInputError('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new UserInputError('Invalid credentials');
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        return { token };
      } catch (err) {
        throw new Error('Failed to login user');
      }
    },
  },
};
