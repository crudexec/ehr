import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';
import { EventStatus } from '../../types';

@Entity('events')
export class Event extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'event_date', type: 'datetime' })
  eventDate: Date;

  @Column({ name: 'end_date', type: 'datetime', nullable: true })
  endDate?: Date;

  @Column({ nullable: true })
  location?: string;

  @Column({
    type: 'simple-enum',
    enum: EventStatus,
    default: EventStatus.SCHEDULED,
  })
  status: EventStatus;

  @Column({ name: 'organizer_id' })
  organizerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'organizer_id' })
  organizer: User;

  @Column({ name: 'attendee_id', nullable: true })
  attendeeId?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'attendee_id' })
  attendee?: User;

  @Column({ name: 'is_all_day', default: false })
  isAllDay: boolean;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
