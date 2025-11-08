import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { User } from '../User';
import { FormStatus } from '../../../types';

@Entity('i9_forms')
export class I9Form extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Personal Information
  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'other_names', nullable: true })
  otherNames?: string;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth: Date;

  @Column({ name: 'social_security', nullable: true })
  socialSecurity?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ name: 'zip_code', nullable: true })
  zipCode?: string;

  // Citizenship Status
  @Column({ name: 'citizenship_status', nullable: true })
  citizenshipStatus?: string;

  @Column({ name: 'alien_number', nullable: true })
  alienNumber?: string;

  @Column({ name: 'uscis_number', nullable: true })
  uscisNumber?: string;

  @Column({ name: 'work_authorization_expiry', type: 'date', nullable: true })
  workAuthorizationExpiry?: Date;

  // Document Information
  @Column({ name: 'document_title', nullable: true })
  documentTitle?: string;

  @Column({ name: 'issuing_authority', nullable: true })
  issuingAuthority?: string;

  @Column({ name: 'document_number', nullable: true })
  documentNumber?: string;

  @Column({ name: 'document_expiry', type: 'date', nullable: true })
  documentExpiry?: Date;

  // Signature
  @Column({ name: 'employee_signature_url', nullable: true })
  employeeSignatureUrl?: string;

  @Column({ name: 'employee_signed_at', type: 'timestamp', nullable: true })
  employeeSignedAt?: Date;

  @Column({ name: 'employer_signature_url', nullable: true })
  employerSignatureUrl?: string;

  @Column({ name: 'employer_signed_at', type: 'timestamp', nullable: true })
  employerSignedAt?: Date;

  @Column({
    type: 'enum',
    enum: FormStatus,
    default: FormStatus.DRAFT,
  })
  status: FormStatus;
}
