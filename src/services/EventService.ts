import { AppDataSource } from '../database/data-source';
import { Event } from '../database/entities/Event';
import { NotFoundError } from '../utils/errors';
import { EventStatus, PaginationParams } from '../types';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

export class EventService {
  private eventRepository = AppDataSource.getRepository(Event);

  async create(organizerId: string, data: Partial<Event>): Promise<Event> {
    const event = this.eventRepository.create({
      ...data,
      organizerId,
      status: EventStatus.SCHEDULED,
    });

    return this.eventRepository.save(event);
  }

  async findById(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['organizer', 'attendee'],
    });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    return event;
  }

  async findAll(params: PaginationParams): Promise<{ data: Event[]; total: number; page: number; limit: number }> {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [events, total] = await this.eventRepository.findAndCount({
      skip,
      take: limit,
      order: { eventDate: 'DESC' },
      relations: ['organizer', 'attendee'],
    });

    return { data: events, total, page, limit };
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Event[]> {
    return this.eventRepository.find({
      where: {
        eventDate: Between(startDate, endDate),
      },
      relations: ['organizer', 'attendee'],
      order: { eventDate: 'ASC' },
    });
  }

  async findByUserId(userId: string): Promise<Event[]> {
    return this.eventRepository.find({
      where: [{ organizerId: userId }, { attendeeId: userId }],
      relations: ['organizer', 'attendee'],
      order: { eventDate: 'DESC' },
    });
  }

  async update(id: string, data: Partial<Event>): Promise<Event> {
    const event = await this.findById(id);
    Object.assign(event, data);
    return this.eventRepository.save(event);
  }

  async updateStatus(id: string, status: EventStatus): Promise<Event> {
    const event = await this.findById(id);
    event.status = status;
    return this.eventRepository.save(event);
  }

  async cancel(id: string): Promise<Event> {
    return this.updateStatus(id, EventStatus.CANCELLED);
  }

  async complete(id: string, notes?: string): Promise<Event> {
    const event = await this.findById(id);
    event.status = EventStatus.COMPLETED;
    if (notes) {
      event.notes = notes;
    }
    return this.eventRepository.save(event);
  }

  async delete(id: string): Promise<void> {
    const event = await this.findById(id);
    await this.eventRepository.softRemove(event);
  }
}

export default new EventService();
