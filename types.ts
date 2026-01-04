
export enum UserRole {
  MOTHER = 'MOTHER',
  PARTNER = 'PARTNER',
  FAMILY = 'FAMILY',
  DOCTOR = 'DOCTOR'
}

export enum PregnancyPhase {
  PRE = 'PRE',
  IN = 'IN',
  POSTPARTUM = 'POSTPARTUM',
  POST = 'POST'
}

export interface VitalSign {
  timestamp: string;
  value: number;
  unit: string;
  type: 'BP_SYSTOLIC' | 'BP_DIASTOLIC' | 'SUGAR' | 'WEIGHT' | 'HEART_RATE' | 'STRESS';
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  assignedTo: UserRole;
  dueDate: string;
}

export interface HealthUpdate {
  id: string;
  date: string;
  category: 'MEDICAL' | 'MILESTONE' | 'NUTRITION';
  content: string;
  isPrivate: boolean;
}

export interface BabyDevelopment {
  week: number;
  size: string;
  weight: string;
  milestone: string;
  image: string;
}
