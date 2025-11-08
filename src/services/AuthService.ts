import jwt from 'jsonwebtoken';
import { AppDataSource } from '../database/data-source';
import { User } from '../database/entities/User';
import config from '../config';
import { JwtPayload, UserRole } from '../types';
import {
  AuthenticationError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from '../utils/errors';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
  }): Promise<{ user: User; token: string }> {
    const existingUser = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    const user = this.userRepository.create({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role || UserRole.STANDARD,
    });

    await this.userRepository.save(user);

    const token = this.generateToken(user);

    return { user, token };
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    if (!user.isActive) {
      throw new AuthenticationError('Account is inactive');
    }

    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
      throw new AuthenticationError('Invalid email or password');
    }

    const token = this.generateToken(user);

    return { user, token };
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isValidPassword = await user.validatePassword(currentPassword);

    if (!isValidPassword) {
      throw new ValidationError('Current password is incorrect');
    }

    user.password = newPassword;
    await this.userRepository.save(user);
  }

  private generateToken(user: User): string {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      return jwt.verify(token, config.jwt.secret) as JwtPayload;
    } catch (error) {
      throw new AuthenticationError('Invalid token');
    }
  }
}

export default new AuthService();
