import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

export enum DocumentType {
  PROFILE_PHOTO = 'PROFILE_PHOTO',
  MEDICAL_RECORD = 'MEDICAL_RECORD',
  FORM_ATTACHMENT = 'FORM_ATTACHMENT',
  GENERAL = 'GENERAL',
}

@Entity('documents')
export class Document extends BaseEntity {
  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ name: 'original_name' })
  originalName: string;

  @Column({ name: 'file_url' })
  fileUrl: string;

  @Column({ name: 'file_size' })
  fileSize: number;

  @Column({ name: 'mime_type' })
  mimeType: string;

  @Column({
    type: 'enum',
    enum: DocumentType,
    default: DocumentType.GENERAL,
  })
  type: DocumentType;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'related_entity_id', nullable: true })
  relatedEntityId?: string;

  @Column({ name: 'related_entity_type', nullable: true })
  relatedEntityType?: string;
}
