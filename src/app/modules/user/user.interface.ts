/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { UserRole } from './user.constant';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(plainPassword: string, hashedPassword: string): Promise<boolean>;
  isPasswordChangedAfterJwt(passwordChangedAt: Date, JwtIssuedAt: number): boolean;
}

export type TUserRole = keyof typeof UserRole;
