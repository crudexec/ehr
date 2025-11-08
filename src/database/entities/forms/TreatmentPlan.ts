import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { User } from '../User';
import { FormStatus } from '../../../types';

@Entity('treatment_plans')
export class TreatmentPlan extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'client_id', nullable: true })
  clientId?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'client_id' })
  client?: User;

  // Basic Information
  @Column({ name: 'plan_name' })
  planName: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate?: Date;

  @Column({ name: 'primary_goal', type: 'text' })
  primaryGoal: string;

  @Column({ name: 'treatment_goals', type: 'simple-json', nullable: true })
  treatmentGoals?: {
    goal: string;
    targetDate: Date;
    progress: string;
    status: string;
  }[];

  // Treatment Schedule
  @Column({ type: 'simple-json', nullable: true })
  schedule?: {
    day: string;
    time: string;
    duration: number;
    activity: string;
  }[];

  // Progress Notes
  @Column({ name: 'progress_notes', type: 'text', nullable: true })
  progressNotes?: string;

  @Column({ name: 'last_reviewed', type: 'datetime', nullable: true })
  lastReviewed?: Date;

  @Column({ name: 'next_review', type: 'datetime', nullable: true })
  nextReview?: Date;

  // Signatures
  @Column({ name: 'therapist_signature_url', nullable: true })
  therapistSignatureUrl?: string;

  @Column({ name: 'therapist_signed_at', type: 'datetime', nullable: true })
  therapistSignedAt?: Date;

  @Column({ name: 'guardian_signature_url', nullable: true })
  guardianSignatureUrl?: string;

  @Column({ name: 'guardian_signed_at', type: 'datetime', nullable: true })
  guardianSignedAt?: Date;

  @Column({
    type: 'simple-enum',
    enum: FormStatus,
    default: FormStatus.DRAFT,
  })
  status: FormStatus;
}
