import api from './api';
import { IntakeForm, ApiResponse, PaginatedResponse } from '@/types';

export const intakeFormService = {
  async getIntakeForms(userId: string, page = 1, limit = 10): Promise<PaginatedResponse<IntakeForm>> {
    const response = await api.get<ApiResponse<PaginatedResponse<IntakeForm>>>(
      `/intake-forms/user/${userId}`,
      { page, limit }
    );
    return response.data!;
  },

  async getIntakeForm(id: string): Promise<IntakeForm> {
    const response = await api.get<ApiResponse<IntakeForm>>(`/intake-forms/${id}`);
    return response.data!;
  },

  async createIntakeForm(data: Partial<IntakeForm>): Promise<IntakeForm> {
    const response = await api.post<ApiResponse<IntakeForm>>('/intake-forms', data);
    return response.data!;
  },

  async updateIntakeForm(id: string, data: Partial<IntakeForm>): Promise<IntakeForm> {
    const response = await api.put<ApiResponse<IntakeForm>>(`/intake-forms/${id}`, data);
    return response.data!;
  },

  async updateStatus(id: string, status: string): Promise<IntakeForm> {
    const response = await api.patch<ApiResponse<IntakeForm>>(`/intake-forms/${id}/status`, {
      status,
    });
    return response.data!;
  },

  async deleteIntakeForm(id: string): Promise<void> {
    await api.delete(`/intake-forms/${id}`);
  },
};

export default intakeFormService;
