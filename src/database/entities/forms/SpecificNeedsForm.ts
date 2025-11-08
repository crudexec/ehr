import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { User } from '../User';
import { FormStatus } from '../../../types';

@Entity('specific_needs_forms')
export class SpecificNeedsForm extends BaseEntity {
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
  @Column({ name: 'client_name' })
  clientName: string;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth: Date;

  @Column({ nullable: true })
  diagnosis?: string;

  @Column({ name: 'legal_guardian', nullable: true })
  legalGuardian?: string;

  @Column({ name: 'guardian_phone', nullable: true })
  guardianPhone?: string;

  // Service Needs
  @Column({ name: 'service_needs', type: 'jsonb', nullable: true })
  serviceNeeds?: {
    service: string;
    frequency: string;
    duration: string;
    provider: string;
  }[];

  // Current Needs and Support
  @Column({ name: 'current_needs', type: 'text', nullable: true })
  currentNeeds?: string;

  @Column({ name: 'support_required', type: 'text', nullable: true })
  supportRequired?: string;

  @Column({ name: 'behavioral_concerns', type: 'text', nullable: true })
  behavioralConcerns?: string;

  @Column({ name: 'communication_needs', type: 'text', nullable: true })
  communicationNeeds?: string;

  @Column({ name: 'mobility_needs', type: 'text', nullable: true })
  mobilityNeeds?: string;

  @Column({ name: 'medical_needs', type: 'text', nullable: true })
  medicalNeeds?: string;

  @Column({ name: 'dietary_needs', type: 'text', nullable: true })
  dietaryNeeds?: string;

  // Authorization
  @Column({ name: 'authorized_services', type: 'text', nullable: true })
  authorizedServices?: string;

  @Column({ name: 'authorization_number', nullable: true })
  authorizationNumber?: string;

  @Column({ name: 'authorization_start', type: 'date', nullable: true })
  authorizationStart?: Date;

  @Column({ name: 'authorization_end', type: 'date', nullable: true })
  authorizationEnd?: Date;

  // Signature
  @Column({ name: 'guardian_signature_url', nullable: true })
  guardianSignatureUrl?: string;

  @Column({ name: 'guardian_signed_at', type: 'timestamp', nullable: true })
  guardianSignedAt?: Date;

  @Column({
    type: 'enum',
    enum: FormStatus,
    default: FormStatus.DRAFT,
  })
  status: FormStatus;
}
