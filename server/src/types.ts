import { Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
}

export interface IUserModel extends Model<IUser> {}
