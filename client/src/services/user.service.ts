import api from './api';
import { User, ApiResponse, PaginatedResponse } from '@/types';

export const userService = {
  async getUsers(page = 1, limit = 10): Promise<PaginatedResponse<User>> {
    const response = await api.get<ApiResponse<PaginatedResponse<User>>>('/users', {
      page,
      limit,
    });
    return response.data!;
  },

  async getUser(id: string): Promise<User> {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data!;
  },

  async createUser(data: Partial<User>): Promise<User> {
    const response = await api.post<ApiResponse<User>>('/users', data);
    return response.data!;
  },

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data!;
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};

export default userService;
