import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, School, Student, Teacher, AttendanceRecord, 
  Homework, Exam, ExamResult, TimetableSlot, Announcement, StudyNote 
} from '../types';
import { 
  DEMO_USERS, INITIAL_SCHOOL, INITIAL_STUDENTS, INITIAL_TEACHERS, 
  INITIAL_ATTENDANCE, INITIAL_HOMEWORK, INITIAL_EXAMS, INITIAL_RESULTS, 
  INITIAL_TIMETABLE, INITIAL_ANNOUNCEMENTS, INITIAL_STUDY_NOTES 
} from '../mockData';

interface AppContextType {
  currentUser: User;
  switchUser: (role: 'ADMIN' | 'TEACHER' | 'STUDENT') => void;
  updateCurrentUser: (updated: Partial<User>) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  school: School;
  updateSchool: (data: Partial<School>) => void;
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, teacher: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  attendance: AttendanceRecord[];
  recordAttendance: (records: AttendanceRecord[]) => void;
  homework: Homework[];
  addHomework: (hw: Omit<Homework, 'id' | 'submissionCount'>) => void;
  exams: Exam[];
  results: ExamResult[];
  publishExam: (examId: string) => void;
  timetable: TimetableSlot[];
  announcements: Announcement[];
  addAnnouncement: (ann: Omit<Announcement, 'id'>) => void;
  deleteAnnouncement: (id: string) => void;
  studyNotes: StudyNote[];
  addStudyNote: (note: Omit<StudyNote, 'id' | 'downloadCount'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user / active portal
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('vidyasetu_user');
    return saved ? JSON.parse(saved) : DEMO_USERS[0]; // Admin by default
  });

  // Theme state ('light' | 'dark')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('vidyasetu_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('vidyasetu_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const [school, setSchool] = useState<School>(INITIAL_SCHOOL);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [homework, setHomework] = useState<Homework[]>(INITIAL_HOMEWORK);
  const [exams, setExams] = useState<Exam[]>(INITIAL_EXAMS);
  const [results, setResults] = useState<ExamResult[]>(INITIAL_RESULTS);
  const [timetable] = useState<TimetableSlot[]>(INITIAL_TIMETABLE);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [studyNotes, setStudyNotes] = useState<StudyNote[]>(INITIAL_STUDY_NOTES);

  useEffect(() => {
    localStorage.setItem('vidyasetu_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const switchUser = (role: 'ADMIN' | 'TEACHER' | 'STUDENT') => {
    const target = DEMO_USERS.find(u => u.role === role);
    if (target) {
      setCurrentUser(target);
    }
  };

  const updateCurrentUser = (updated: Partial<User>) => {
    setCurrentUser(prev => {
      const merged = {
        ...prev,
        ...updated,
        details: {
          ...prev.details,
          ...(updated.details || {})
        }
      };
      return merged;
    });
  };

  const updateSchool = (data: Partial<School>) => {
    setSchool(prev => ({ ...prev, ...data }));
  };

  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `std_${Date.now()}`
    };
    setStudents(prev => [newStudent, ...prev]);
  };

  const updateStudent = (id: string, updatedFields: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updatedFields } : s));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const addTeacher = (teacherData: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: `tch_${Date.now()}`
    };
    setTeachers(prev => [newTeacher, ...prev]);
  };

  const updateTeacher = (id: string, updatedFields: Partial<Teacher>) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
  };

  const deleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  const recordAttendance = (newRecords: AttendanceRecord[]) => {
    setAttendance(prev => {
      // Overwrite any matching student + date record to prevent duplicates
      const filtered = prev.filter(p => 
        !newRecords.some(n => n.studentId === p.studentId && n.date === p.date)
      );
      return [...newRecords, ...filtered];
    });
  };

  const addHomework = (hwData: Omit<Homework, 'id' | 'submissionCount'>) => {
    const newHw: Homework = {
      ...hwData,
      id: `hw_${Date.now()}`,
      submissionCount: 0
    };
    setHomework(prev => [newHw, ...prev]);
  };

  const publishExam = (examId: string) => {
    setExams(prev => prev.map(e => e.id === examId ? { ...e, status: 'Published' } : e));
    setResults(prev => prev.map(r => r.examId === examId ? { ...r, isPublished: true } : r));
  };

  const addAnnouncement = (annData: Omit<Announcement, 'id'>) => {
    const newAnn: Announcement = {
      ...annData,
      id: `ann_${Date.now()}`
    };
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const addStudyNote = (noteData: Omit<StudyNote, 'id' | 'downloadCount'>) => {
    const newNote: StudyNote = {
      ...noteData,
      id: `note_${Date.now()}`,
      downloadCount: 0
    };
    setStudyNotes(prev => [newNote, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      switchUser,
      updateCurrentUser,
      theme,
      toggleTheme,
      school,
      updateSchool,
      students,
      addStudent,
      updateStudent,
      deleteStudent,
      teachers,
      addTeacher,
      updateTeacher,
      deleteTeacher,
      attendance,
      recordAttendance,
      homework,
      addHomework,
      exams,
      results,
      publishExam,
      timetable,
      announcements,
      addAnnouncement,
      deleteAnnouncement,
      studyNotes,
      addStudyNote
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
