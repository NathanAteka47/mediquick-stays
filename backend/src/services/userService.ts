import bcrypt from 'bcryptjs';
import { User } from '../models/User';

export class UserService {
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static async findUserByEmail(email: string) {
    return User.findOne({ email });
  }

  static async createUser(userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) {
    const hashedPassword = await this.hashPassword(userData.password);
    
    return User.create({
      ...userData,
      password: hashedPassword
    });
  }

  static async updateUser(userId: string, updateData: Partial<{
    name: string;
    email: string;
    phone: string;
  }>) {
    return User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );
  }
}