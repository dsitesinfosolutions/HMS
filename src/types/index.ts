export type ModuleKey =
  | 'dashboard'
  | 'patients'
  | 'appointments'
  | 'doctors'
  | 'op-ip'
  | 'billing'
  | 'pharmacy'
  | 'laboratory'
  | 'radiology'
  | 'inventory'
  | 'staff'
  | 'ambulance'
  | 'reports'
  | 'telemedicine'
  | 'settings';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  condition: string;
  status: 'OP' | 'IP' | 'Emergency';
  doctor: string;
  time: string;
  avatar: string;
}

export interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  department: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  type: 'OP' | 'Online';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  patients: number;
  available: boolean;
  avatar: string;
  rating: number;
}
