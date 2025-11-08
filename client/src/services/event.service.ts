import api from './api';
import { Event, ApiResponse, PaginatedResponse } from '@/types';

export const eventService = {
  async getEvents(page = 1, limit = 10): Promise<PaginatedResponse<Event>> {
    const response = await api.get<ApiResponse<PaginatedResponse<Event>>>('/events', {
      page,
      limit,
    });
    return response.data!;
  },

  async getMyEvents(): Promise<Event[]> {
    const response = await api.get<ApiResponse<Event[]>>('/events/my-events');
    return response.data!;
  },

  async getEvent(id: string): Promise<Event> {
    const response = await api.get<ApiResponse<Event>>(`/events/${id}`);
    return response.data!;
  },

  async createEvent(data: Partial<Event>): Promise<Event> {
    const response = await api.post<ApiResponse<Event>>('/events', data);
    return response.data!;
  },

  async updateEvent(id: string, data: Partial<Event>): Promise<Event> {
    const response = await api.put<ApiResponse<Event>>(`/events/${id}`, data);
    return response.data!;
  },

  async cancelEvent(id: string): Promise<Event> {
    const response = await api.patch<ApiResponse<Event>>(`/events/${id}/cancel`);
    return response.data!;
  },

  async completeEvent(id: string, notes?: string): Promise<Event> {
    const response = await api.patch<ApiResponse<Event>>(`/events/${id}/complete`, { notes });
    return response.data!;
  },

  async deleteEvent(id: string): Promise<void> {
    await api.delete(`/events/${id}`);
  },
};

export default eventService;
