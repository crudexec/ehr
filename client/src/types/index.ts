export enum UserRole {
  ADMINISTRATOR = 'ADMINISTRATOR',
  STANDARD = 'STANDARD',
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
}

export enum FormStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum EventStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  RESCHEDULED = 'RESCHEDULED',
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface IntakeForm {
  id: string;
  userId: string;
  clientName: string;
  clientDob: string;
  clientGender?: string;
  clientAddress?: string;
  clientPhone?: string;
  primaryDiagnosis?: string;
  secondaryDiagnosis?: string;
  medications?: string;
  allergies?: string;
  medicalHistory?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  status: FormStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  eventDate: string;
  endDate?: string;
  location?: string;
  status: EventStatus;
  organizerId: string;
  attendeeId?: string;
  isAllDay: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TreatmentPlan {
  id: string;
  userId: string;
  clientId?: string;
  planName: string;
  startDate: string;
  endDate?: string;
  primaryGoal: string;
  treatmentGoals?: {
    goal: string;
    targetDate: Date;
    progress: string;
    status: string;
  }[];
  progressNotes?: string;
  status: FormStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
