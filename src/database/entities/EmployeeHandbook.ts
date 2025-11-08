import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity('employee_handbooks')
export class EmployeeHandbook extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'agreed_at', type: 'timestamp', nullable: true })
  agreedAt?: Date;

  @Column({ name: 'handbook_version' })
  handbookVersion: string;

  @Column({ name: 'signature_url', nullable: true })
  signatureUrl?: string;

  @Column({ name: 'ip_address', nullable: true })
  ipAddress?: string;
}
