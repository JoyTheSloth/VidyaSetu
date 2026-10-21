export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  phone?: string;
  schoolId: string;
  // Role specific metadata
  details?: {
    admissionNo?: string;
    employeeId?: string;
    classId?: string;
    section?: string;
    rollNo?: number;
    subjects?: string[];
    qualification?: string;
    cabin?: string;
    bio?: string;
  };
}

export interface School {
  id: string;
  name: string;
  code: string;
  tagline: string;
  academicYear: string;
  contactEmail: string;
  phone: string;
  address: string;
  logoText: string;
}

export interface Student {
  id: string;
  admissionNo: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  class: string;
  section: string;
  rollNo: number;
  guardianName: string;
  guardianPhone: string;
  status: 'Active' | 'Inactive' | 'Archived';
  attendanceRate: number;
  feeStatus: 'Paid' | 'Partial' | 'Pending';
  totalFee: number;
  paidFee: number;
}

export interface Teacher {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  classesAssigned: { class: string; section: string; subject: string }[];
  status: 'Active' | 'On Leave' | 'Inactive';
}

export interface AttendanceRecord {
  id: string;
  date: string;
  studentId: string;
  studentName: string;
  class: string;
  section: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  remarks?: string;
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  class: string;
  section: string;
  subject: string;
  assignedBy: string;
  assignedDate: string;
  dueDate: string;
  submissionCount: number;
  totalStudents: number;
  status: 'Assigned' | 'Submitted' | 'Graded' | 'Closed';
  attachmentName?: string;
  attachmentSize?: string;
  maxMarks?: number;
}

export interface Exam {
  id: string;
  name: string;
  academicYear: string;
  term: string;
  startDate: string;
  endDate: string;
  status: 'Draft' | 'Scheduled' | 'Completed' | 'Published';
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  class: string;
  subject: string;
  maxMarks: number;
  marksObtained: number;
  grade: string;
  isPublished: boolean;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period: number;
  startTime: string;
  endTime: string;
  class: string;
  section: string;
  subject: string;
  teacherName: string;
  room: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Notice' | 'Event' | 'Holiday' | 'Emergency';
  content: string;
  audience: 'All' | 'Teachers' | 'Students' | 'Class 10';
  publishedDate: string;
  author: string;
  isPinned: boolean;
}

export interface StudyNote {
  id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  section?: string;
  chapterNo: number;
  author: string;
  uploadDate: string;
  fileName: string;
  fileSize: string;
  downloadCount: number;
  tags: string[];
  type: 'Handwritten Notes' | 'Revision Guide' | 'Formula Sheet' | 'Question Bank';
}
