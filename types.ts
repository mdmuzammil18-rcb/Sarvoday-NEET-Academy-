export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number; // Timestamp for sorting or other features
}

export enum FilterStatus {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export enum Role {
  TEACHER = 'Teacher',
  STUDENT = 'Student',
}

export interface User {
  username: string;
  password?: string; // Password stored in localStorage (INSECURE)
  isAdmin: boolean;
  role: Role;
}

// For AuthForm login, which doesn't need role
export interface AuthDetails {
  username: string;
  password?: string;
}

// For AuthForm signup, which requires role
export interface SignupAuthDetails extends AuthDetails {
  role: Role;
}

// For Teacher Home Screen
export enum TeacherSection {
  DASHBOARD = 'Dashboard',
  TASKS = 'My Tasks',
  STUDENTS = 'Students',
  ANNOUNCEMENTS = 'Announcements',
  ATTENDANCE = 'Attendance',
  ASSIGNMENTS = 'Assignments',
  GRADES = 'Grades',
  TESTS = 'Tests',
  TIMETABLE = 'Timetable',
  MESSAGES = 'Messages',
  PROFILE_SETTINGS = 'Profile Settings',
}

// For Student Home Screen
export enum StudentSection {
  DASHBOARD = 'Dashboard',
  MY_TASKS = 'My Tasks',
  ACADEMIC_PROGRESS = 'Academic Progress',
  CLASS_INTERACTION = 'Class Interaction',
  RESOURCES = 'Resources',
  ATTENDANCE = 'Attendance Record',
  ASSIGNMENTS = 'Assignments Hub',
  GRADES = 'My Grades',
  TIMETABLE = 'My Timetable',
  MESSAGES = 'Messages',
  STUDY_MATERIALS = 'Study Materials', // Can be part of Resources or separate
  PROFILE_SETTINGS = 'Profile & Settings',
}


export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string; // username of the teacher
  createdAt: number; // Timestamp
}

export interface StudentProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  lastActivity?: string; // e.g., "Online 2 hours ago"
  overallGrade?: string; // e.g., "A+"
  class?: string; // e.g., "Class 10A"
}

// Mock types for Student Dashboard
export interface UpcomingStudentEvent {
  id: string;
  type: 'assignment' | 'exam' | 'task';
  title: string;
  subject?: string;
  dueDate: string; // or Date object
  dueTime?: string;
}

export interface StudentCourseProgress {
  id: string;
  subject: string;
  attendance: number; // percentage
  assignmentsCompleted: number; // percentage or count
  averageTestScore: number; // percentage
  icon?: string; // e.g., fas fa-book
  color?: string; // e.g., bg-blue-500
}