import { AppDataSource } from '../database/data-source';
import { User } from '../database/entities/User';
import { NotFoundError, ConflictError } from '../utils/errors';
import { PaginationParams, UserRole } from '../types';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async findAll(
    params: PaginationParams
  ): Promise<{ data: User[]; total: number; page: number; limit: number }> {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [users, total] = await this.userRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data: users, total, page, limit };
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
    phoneNumber?: string;
    dateOfBirth?: Date;
    address?: string;
  }): Promise<User> {
    const existingUser = await this.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError('Email already exists');
    }

    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async update(
    id: string,
    data: {
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
      dateOfBirth?: Date;
      address?: string;
      profilePicture?: string;
    }
  ): Promise<User> {
    const user = await this.findById(id);

    Object.assign(user, data);

    return this.userRepository.save(user);
  }

  async updateRole(id: string, role: UserRole): Promise<User> {
    const user = await this.findById(id);
    user.role = role;
    return this.userRepository.save(user);
  }

  async deactivate(id: string): Promise<void> {
    const user = await this.findById(id);
    user.isActive = false;
    await this.userRepository.save(user);
  }

  async activate(id: string): Promise<void> {
    const user = await this.findById(id);
    user.isActive = true;
    await this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.softRemove(user);
  }
}

export default new UserService();
