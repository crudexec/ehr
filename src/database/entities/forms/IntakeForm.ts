import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { User } from '../User';
import { FormStatus } from '../../../types';

@Entity('intake_forms')
export class IntakeForm extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Client Information
  @Column({ name: 'client_name' })
  clientName: string;

  @Column({ name: 'client_dob', type: 'date' })
  clientDob: Date;

  @Column({ name: 'client_gender', nullable: true })
  clientGender?: string;

  @Column({ name: 'client_address', nullable: true })
  clientAddress?: string;

  @Column({ name: 'client_phone', nullable: true })
  clientPhone?: string;

  // Medical Information
  @Column({ name: 'primary_diagnosis', type: 'text', nullable: true })
  primaryDiagnosis?: string;

  @Column({ name: 'secondary_diagnosis', type: 'text', nullable: true })
  secondaryDiagnosis?: string;

  @Column({ type: 'text', nullable: true })
  medications?: string;

  @Column({ type: 'text', nullable: true })
  allergies?: string;

  @Column({ name: 'medical_history', type: 'text', nullable: true })
  medicalHistory?: string;

  // Emergency Contact
  @Column({ name: 'emergency_contact_name', nullable: true })
  emergencyContactName?: string;

  @Column({ name: 'emergency_contact_phone', nullable: true })
  emergencyContactPhone?: string;

  @Column({ name: 'emergency_contact_relationship', nullable: true })
  emergencyContactRelationship?: string;

  // Mother's Information
  @Column({ name: 'mother_name', nullable: true })
  motherName?: string;

  @Column({ name: 'mother_phone', nullable: true })
  motherPhone?: string;

  @Column({ name: 'mother_email', nullable: true })
  motherEmail?: string;

  // Father's Information
  @Column({ name: 'father_name', nullable: true })
  fatherName?: string;

  @Column({ name: 'father_phone', nullable: true })
  fatherPhone?: string;

  @Column({ name: 'father_email', nullable: true })
  fatherEmail?: string;

  // Referral Information
  @Column({ name: 'referral_source', nullable: true })
  referralSource?: string;

  @Column({ name: 'referral_date', type: 'date', nullable: true })
  referralDate?: Date;

  // Service Information
  @Column({ name: 'waiver_service', nullable: true })
  waiverService?: string;

  @Column({ name: 'service_coordinator', nullable: true })
  serviceCoordinator?: string;

  @Column({ name: 'admission_date', type: 'date', nullable: true })
  admissionDate?: Date;

  // Additional Information
  @Column({ name: 'more_about_client', type: 'text', nullable: true })
  moreAboutClient?: string;

  @Column({ name: 'school_name', nullable: true })
  schoolName?: string;

  @Column({ name: 'school_contact', nullable: true })
  schoolContact?: string;

  @Column({
    type: 'enum',
    enum: FormStatus,
    default: FormStatus.DRAFT,
  })
  status: FormStatus;
}
