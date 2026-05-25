import type { Patient, Appointment, Doctor } from '../types';

export const mockPatients: Patient[] = [
  { id: 'P-001', name: 'Arjun Mehta', age: 42, gender: 'Male', phone: '9876543210', condition: 'Hypertension', status: 'OP', doctor: 'Dr. Priya Sharma', time: '09:15 AM', avatar: 'AM' },
  { id: 'P-002', name: 'Sneha Reddy', age: 28, gender: 'Female', phone: '9876543211', condition: 'Diabetes', status: 'IP', doctor: 'Dr. Raj Kumar', time: '10:00 AM', avatar: 'SR' },
  { id: 'P-003', name: 'Vikram Singh', age: 55, gender: 'Male', phone: '9876543212', condition: 'Cardiac Arrest', status: 'Emergency', doctor: 'Dr. Anita Bose', time: '10:30 AM', avatar: 'VS' },
  { id: 'P-004', name: 'Kavitha Nair', age: 34, gender: 'Female', phone: '9876543213', condition: 'Appendicitis', status: 'IP', doctor: 'Dr. Suresh Menon', time: '11:00 AM', avatar: 'KN' },
  { id: 'P-005', name: 'Rahul Gupta', age: 19, gender: 'Male', phone: '9876543214', condition: 'Fracture', status: 'OP', doctor: 'Dr. Priya Sharma', time: '11:45 AM', avatar: 'RG' },
  { id: 'P-006', name: 'Meena Iyer', age: 62, gender: 'Female', phone: '9876543215', condition: 'Arthritis', status: 'OP', doctor: 'Dr. Raj Kumar', time: '12:15 PM', avatar: 'MI' },
];

export const mockAppointments: Appointment[] = [
  { id: 'A-001', patient: 'Arjun Mehta', doctor: 'Dr. Priya Sharma', department: 'Cardiology', time: '09:15 AM', status: 'Confirmed', type: 'OP' },
  { id: 'A-002', patient: 'Sneha Reddy', doctor: 'Dr. Raj Kumar', department: 'Endocrinology', time: '10:00 AM', status: 'Completed', type: 'OP' },
  { id: 'A-003', patient: 'Ravi Verma', doctor: 'Dr. Anita Bose', department: 'Neurology', time: '10:30 AM', status: 'Pending', type: 'Online' },
  { id: 'A-004', patient: 'Pooja Pillai', doctor: 'Dr. Suresh Menon', department: 'Orthopedics', time: '11:00 AM', status: 'Confirmed', type: 'OP' },
  { id: 'A-005', patient: 'Sunil Joshi', doctor: 'Dr. Priya Sharma', department: 'Cardiology', time: '11:30 AM', status: 'Cancelled', type: 'Online' },
  { id: 'A-006', patient: 'Asha Kumar', doctor: 'Dr. Raj Kumar', department: 'General', time: '12:00 PM', status: 'Pending', type: 'OP' },
];

export const mockDoctors: Doctor[] = [
  { id: 'D-001', name: 'Dr. Priya Sharma', specialty: 'Cardiology', patients: 12, available: true, avatar: 'PS', rating: 4.9 },
  { id: 'D-002', name: 'Dr. Raj Kumar', specialty: 'Endocrinology', patients: 8, available: true, avatar: 'RK', rating: 4.7 },
  { id: 'D-003', name: 'Dr. Anita Bose', specialty: 'Neurology', patients: 10, available: false, avatar: 'AB', rating: 4.8 },
  { id: 'D-004', name: 'Dr. Suresh Menon', specialty: 'Orthopedics', patients: 6, available: true, avatar: 'SM', rating: 4.6 },
  { id: 'D-005', name: 'Dr. Leela Nambiar', specialty: 'Pediatrics', patients: 15, available: true, avatar: 'LN', rating: 4.9 },
  { id: 'D-006', name: 'Dr. Kiran Reddy', specialty: 'Radiology', patients: 4, available: false, avatar: 'KR', rating: 4.5 },
];

export const revenueData = [
  { month: 'Jan', revenue: 485000, expenses: 320000 },
  { month: 'Feb', revenue: 520000, expenses: 340000 },
  { month: 'Mar', revenue: 498000, expenses: 310000 },
  { month: 'Apr', revenue: 610000, expenses: 380000 },
  { month: 'May', revenue: 575000, expenses: 360000 },
  { month: 'Jun', revenue: 648000, expenses: 400000 },
  { month: 'Jul', revenue: 720000, expenses: 430000 },
];

export const bedOccupancy = [
  { ward: 'General', total: 60, occupied: 48 },
  { ward: 'ICU', total: 20, occupied: 17 },
  { ward: 'Pediatric', total: 30, occupied: 22 },
  { ward: 'Maternity', total: 25, occupied: 19 },
  { ward: 'Surgical', total: 20, occupied: 14 },
];

export const departmentStats = [
  { name: 'Cardiology', patients: 45, color: '#0ea5e9' },
  { name: 'Orthopedics', patients: 32, color: '#14b8a6' },
  { name: 'Neurology', patients: 28, color: '#f59e0b' },
  { name: 'Pediatrics', patients: 55, color: '#10b981' },
  { name: 'General', patients: 78, color: '#6366f1' },
];
