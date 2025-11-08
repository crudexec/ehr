import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { User } from '../User';
import { FormStatus } from '../../../types';

@Entity('visit_logs')
export class VisitLog extends BaseEntity {
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

  @Column({ name: 'visit_date', type: 'timestamp' })
  visitDate: Date;

  @Column({ name: 'visit_type', nullable: true })
  visitType?: string;

  @Column({ nullable: true })
  location?: string;

  // Session Information
  @Column({ name: 'session_highlights', type: 'text', nullable: true })
  sessionHighlights?: string;

  @Column({ type: 'text', nullable: true })
  communication?: string;

  @Column({ name: 'behavior_management', type: 'text', nullable: true })
  behaviorManagement?: string;

  @Column({ name: 'self_management', type: 'text', nullable: true })
  selfManagement?: string;

  @Column({ name: 'concerns_challenges', type: 'text', nullable: true })
  concernsChallenges?: string;

  // Transportation and Objectives
  @Column({ name: 'transportation_type', nullable: true })
  transportationType?: string;

  @Column({ type: 'text', nullable: true })
  objectives?: string;

  // Skills Training
  @Column({ name: 'personal_care', type: 'text', nullable: true })
  personalCare?: string;

  @Column({ type: 'text', nullable: true })
  socialization?: string;

  @Column({ name: 'domestic_skills', type: 'text', nullable: true })
  domesticSkills?: string;

  @Column({ name: 'play_leisure', type: 'text', nullable: true })
  playLeisure?: string;

  @Column({ name: 'safety_skills', type: 'text', nullable: true })
  safetySkills?: string;

  @Column({ name: 'money_utilization', type: 'text', nullable: true })
  moneyUtilization?: string;

  @Column({ name: 'sensory_motor', type: 'text', nullable: true })
  sensoryMotor?: string;

  @Column({ name: 'meal_time', type: 'text', nullable: true })
  mealTime?: string;

  // Visit Goals
  @Column({ name: 'visit_goals', type: 'text', nullable: true })
  visitGoals?: string;

  @Column({ name: 'goals_met', type: 'boolean', default: false })
  goalsMet: boolean;

  // Signature
  @Column({ name: 'staff_signature_url', nullable: true })
  staffSignatureUrl?: string;

  @Column({ name: 'signed_at', type: 'timestamp', nullable: true })
  signedAt?: Date;

  @Column({
    type: 'enum',
    enum: FormStatus,
    default: FormStatus.DRAFT,
  })
  status: FormStatus;
}
