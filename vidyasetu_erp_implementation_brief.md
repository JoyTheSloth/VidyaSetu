# Vidyasetu — School ERP Implementation Brief
**Product studio:** Mabelle Studios  
**Example school / demo tenant:** BHIMS  
**Document purpose:** Build-ready specification for an AI coding agent (Integravity or similar)  
**Product type:** Responsive, multi-role School Management ERP web application

---

## 1. Product vision

Build **Vidyasetu**, a clean, modern school ERP that helps a school manage students, teachers, classes, attendance, homework, examinations, timetables, and school announcements from one coherent application.

Use **BHIMS** as the example school name throughout the demo data and UI. Treat BHIMS as configurable tenant data, not as a hard-coded brand: school administrators must be able to change the name, logo, contact details, academic year, and school settings.

### Scope for this version

Build exactly these three user-facing portals:

1. **School Admin Portal**
2. **Teacher Portal**
3. **Student Portal**

Do not build a parent portal, transport management, library, hostel, payroll, inventory, or multi-branch enterprise modules in this version. Keep the architecture extensible so they can be added later without major rewrites.

This should be a working application, not just a static visual mockup. Navigation, forms, tables, filters, role permissions, and core workflows should function with realistic demo data.

---

## 2. UX and visual direction

### Design goal

Create a premium, calm, trustworthy education product. The UI should feel modern and polished without looking childish, overly colorful, or like a generic admin template. Use a **clean light theme**, generous spacing, strong typography, subtle borders, soft shadows, restrained gradients, and consistent icons.

### Suggested design system

- **Primary navy:** `#17324D` — navigation, headings, strong emphasis
- **Teal:** `#159D96` — primary actions, active states, progress
- **Soft mint:** `#E8F6F3` — subtle highlights and selected backgrounds
- **Warm off-white:** `#F7F9FC` — application background
- **White:** `#FFFFFF` — cards and main content surfaces
- **Slate text:** `#243447` — main text
- **Muted slate:** `#687789` — supporting text
- **Border:** `#E3EAF0` — dividers and outlines
- **Success:** `#198754`
- **Warning:** `#D99116`
- **Error:** `#D64545`
- **Info:** `#3978C5`

Use gradients sparingly, mainly for a hero metric or welcome panel. Avoid neon colors, heavy glassmorphism, excessive gradients, excessive rounded cards, and low-contrast text.

### Typography

- Use **Inter** or **Geist Sans** for interface text.
- Clear hierarchy: page title, section heading, card title, label, helper text.
- Body text should be comfortably readable (around 14–16 px on desktop).
- Use tabular numerals for counts, dates, and currency where appropriate.

### Components and layout

- Responsive sidebar on desktop; collapsible drawer on smaller screens.
- Top bar with page title/breadcrumbs, search where useful, notifications, and user profile menu.
- Use consistent Lucide icons (or an equivalent icon set); do not mix icon styles.
- Tables need search, useful filters, pagination, empty states, and row actions.
- Forms need labels, inline validation, clear save/cancel actions, and confirmation for destructive actions.
- Use status badges consistently, with text as well as color.
- Use charts only where they communicate useful information.
- Add skeleton/loading states, empty states, error states, and success feedback.
- Ensure keyboard focus visibility and accessible contrast.
- Do not use emoji as primary interface icons.
- Prefer polished, practical interfaces over decorative illustrations.

### Shared application shell

- Brand in UI: **Vidyasetu**
- Example tenant: **BHIMS**
- Optional small descriptor: **School Management**
- Desktop navigation should remain stable across pages.
- Display the signed-in user's name and role.
- Add a clear role-aware logout option.
- On smaller screens, tables should adapt gracefully (responsive rows/cards or horizontal scrolling).

---

## 3. User roles and access control

### 3.1 School Admin

The School Admin is responsible for configuring and operating BHIMS. Admin permissions include:

- View school-wide dashboard and reports.
- Create, view, edit, archive, and search student records.
- Create and manage teacher accounts and staff profiles.
- Create academic years, classes, sections, subjects, and class assignments.
- Assign teachers to classes and subjects.
- Manage attendance and review attendance reports.
- Create assignments/homework and review submissions where applicable.
- Set up examinations, grading rules, enter or approve marks, and publish results.
- Create and manage timetables.
- Publish announcements and notices.
- View fee records, configure basic fee structures, record payments, and generate receipts.
- Manage school settings and their own profile.
- View an audit/activity log for important changes.

Do not assume that the School Admin is the SaaS platform owner. A separate global super-admin console is out of scope for this build.

### 3.2 Teacher

Teachers can:

- View their own dashboard.
- View only the classes and subjects assigned to them.
- View student lists for their assigned classes.
- Mark and update attendance for assigned classes, subject to the school's rules.
- Create and edit homework for assigned classes/subjects.
- View submissions if submission functionality is enabled.
- Enter marks for assigned examinations and subjects.
- View their timetable.
- Read school announcements.
- Submit a leave request (simple request/status workflow; no payroll module).
- Update allowed personal profile fields.

Teachers must not be able to access school-wide finance, account administration, arbitrary student records, or other teachers' private information.

### 3.3 Student

Students can:

- View their own dashboard.
- View their own profile and enrolled class.
- View their timetable.
- View their attendance history and summary.
- View homework and assignment instructions for their enrolled classes.
- Submit homework text or permitted attachments if submissions are enabled.
- View examination schedules, their own marks, and published report cards only.
- Read school announcements.
- View their own fee status only if the school chooses to expose it; no payment processing is required for the initial version.
- Update only limited profile preferences, such as password, avatar, or contact fields explicitly allowed by the school.

Students must never see another student's personal data, marks, attendance, fee details, or submissions.

### 3.4 Permission rules

Enforce permissions on the server and database queries, not only by hiding navigation items. Every school-owned record must be scoped to the correct school/tenant. Teachers must be scoped to assigned classes and subjects; students must be scoped to their own student identity and published academic results.

Use secure password hashing and session management. Do not store plaintext passwords. Include a clear demo-login mode for development, but never bypass authorization in production.

---

## 4. Required portals and pages

## 4.1 School Admin Portal

### A. Login
- Clean branded login screen.
- School name: BHIMS.
- Email/username and password fields.
- Show/hide password.
- Validation, loading, and error states.
- Demo account helper for local development only.

### B. Dashboard
Display practical at-a-glance metrics:
- Total active students
- Total teachers
- Today's attendance percentage
- Students absent today
- Homework/assignment overview
- Upcoming examinations
- Recent announcements
- Recent activity
- Quick actions: Add Student, Add Teacher, Take Attendance, Create Announcement, Create Exam

Use charts sparingly: attendance trend and student distribution by class are useful. Metrics must be calculated from actual demo/application data, not hard-coded values disconnected from records.

### C. Students
- Student list with search, class/section filters, status filters, pagination.
- Add/edit/view student form.
- Fields: admission number, full name, date of birth (optional), gender (optional), class, section, roll number, admission date, student email/login, guardian contact (optional), status, photo/avatar.
- Student detail page with tabs: Overview, Attendance, Homework, Exams/Results, Fee Status.
- Bulk import from CSV with preview, validation, and row-level errors.
- Export filtered results to CSV.
- Archive/transfer student rather than destructive deletion when academic records exist.

### D. Teachers
- Teacher list, search, status filter.
- Add/edit/view teacher.
- Fields: staff ID, full name, email, phone (optional), subjects, assigned classes, joining date (optional), status, avatar.
- Assign classes and subjects.
- Activate/deactivate login.
- Teacher detail page with assigned classes and timetable.

### E. Academics / Setup
- Academic year management, including active year.
- Classes and sections.
- Subjects.
- Class-subject assignments.
- Teacher-to-class/subject assignments.
- Validation to prevent duplicate sections or conflicting assignments.
- Preserve historic records when an academic year changes.

### F. Attendance
- Choose date, class, section; show student register.
- Mark Present, Absent, Late, or Excused.
- Support bulk marking Present and then changing exceptions.
- Prevent duplicate attendance records for the same student/date/session.
- Edit history or audit event for changes.
- Admin can view school-wide and class-level attendance.
- Reports by date range, class, and student; CSV export.

### G. Homework / Assignments
- Create assignment with title, instructions, class, subject, assigned date, due date, optional attachment.
- Edit, publish, archive.
- View submission status and submitted work.
- Teachers can manage their own assignments within assigned classes; admins can manage all.
- Student submissions can be text-based initially; attachments are optional and should use private storage.

### H. Exams and Results
- Create exam with name, academic year, classes, start/end dates, and status.
- Add subjects, maximum marks, passing marks, and exam dates.
- Enter marks per student and subject.
- Validate marks against maximum marks.
- Allow draft, submitted, approved/published states.
- Students can view results only after publication.
- Generate a clean printable report card / PDF-friendly result view.
- Keep an audit trail for marks changes.

### I. Timetable
- Create a timetable by class/section and weekday.
- Period fields: start time, end time, subject, assigned teacher, room (optional).
- Detect overlapping teacher/class periods and display a useful conflict message.
- Teacher and student portals show their relevant timetable.
- Allow a printable timetable view.

### J. Announcements
- Create notice with title, body, publish date, audience (all school, selected classes, teachers, or students), optional attachment.
- Draft/published/archived states.
- Show current announcements in relevant dashboards.
- Keep a simple read/unread state if feasible.

### K. Basic Fees
- Create fee categories and fee structures by class or student.
- Record a payment with amount, date, payment method, reference, and receipt number.
- Track total fee, amount paid, balance, and status.
- Generate printable receipts.
- Do not integrate a payment gateway in the initial scope.
- Validate that payments cannot exceed the outstanding balance unless explicitly configured as advance payment.
- Restrict financial access to authorized admin roles; teachers must not see finance by default.

### L. Reports
- Student count by class/section.
- Attendance summary and absentee report.
- Homework status.
- Examination results and class performance.
- Fee collection and outstanding dues.
- Export reports to CSV and provide print-friendly views.

### M. School Settings and Activity Log
- Editable school name (initial value BHIMS), logo, address, contact details, academic year, timezone, grading options, and attendance rules.
- User profile and password change.
- Activity log for important changes: student edits, attendance changes, marks publication, fee payments, account activation/deactivation.
- Confirm destructive actions.

---

## 4.2 Teacher Portal

### Dashboard
- Today's timetable.
- Classes assigned to the teacher.
- Quick action to mark attendance.
- Homework due soon and recent assignments.
- Upcoming exams / pending marks entry.
- Recent school announcements.

### My Classes
- Only assigned classes and subjects.
- Student list and basic student details.
- Search within the assigned class.

### Attendance
- Select assigned class/section and date.
- Mark Present/Absent/Late/Excused.
- Save with validation and confirmation.
- See attendance history for assigned classes.
- No access to unassigned classes.

### Homework
- Create assignment for assigned class and subject.
- Set due date and instructions.
- Review student submissions and mark as reviewed, where applicable.

### Marks
- View assigned examinations.
- Enter marks only for assigned subjects/classes.
- Save as draft or submit for admin approval.
- Prevent editing published results unless permission is explicitly granted.

### Timetable and Notices
- Personal/class timetable.
- Read school announcements.
- Submit leave request and view request status.

### Profile
- View profile and edit allowed fields.
- Change password and manage basic preferences.

---

## 4.3 Student Portal

### Dashboard
- Welcome message using student's first name.
- Today's timetable.
- Attendance summary.
- Homework due soon.
- Next examination.
- Latest school announcements.
- Recent published results.

### My Profile
- Read-only student information with only school-approved editable fields.
- Class, section, roll number, admission number, and profile photo/avatar.

### Attendance
- Personal attendance calendar/list.
- Present/absent/late summary and date range filter.
- Never expose other students' attendance.

### Homework and Learning Materials
- List assignments by subject, due date, and status.
- View instructions and attachments.
- Submit text response; optional file upload if implemented.
- Show submission confirmation and submission history.

### Exams and Results
- Exam schedule.
- Published subject-wise marks, grades, and report cards.
- Hide draft/unpublished marks.
- Print/download report card if available.

### Timetable and Announcements
- Student's class timetable.
- Notices targeted to the whole school or student's class.
- Optional unread indicator.

### Fees (read-only, optional)
- Own fee summary, paid amount, outstanding amount, and receipts.
- Do not show another student's finance details.
- Payment collection is not required for the initial build.

---

## 5. Shared UX requirements

- Shared login system with role-based redirect after authentication.
- Role-aware navigation; users should only see allowed pages.
- Search, filtering, sorting, pagination, and useful empty states on data-heavy pages.
- Forms with inline validation and clear save/cancel actions.
- Toast feedback for success and failure.
- Confirmation dialogs for important actions.
- Loading skeletons for tables and dashboards.
- Responsive layouts for desktop, tablet, and mobile.
- Accessible keyboard navigation, visible focus indicators, semantic form labels, and sufficient contrast.
- Consistent date, time, and currency formatting; use Indian Rupee (₹) for fees.
- Avoid fake charts and buttons that do nothing. Every visible primary action should work.
- Use realistic seed data for BHIMS: multiple classes/sections, students, teachers, attendance, assignments, exams, marks, fees, and announcements.
- Make demo data clearly synthetic; do not use real children's personal information.

---

## 6. Suggested technical implementation

If the project already has a stack, inspect and preserve it rather than replacing it without reason. If starting from scratch, use:

- **Frontend:** Next.js + React + TypeScript.
- **Styling:** Tailwind CSS with reusable accessible components.
- **Icons:** Lucide React.
- **Backend:** Next.js server actions/API routes for a modular MVP, or NestJS for a separately deployed API if justified.
- **Database:** PostgreSQL.
- **Authentication:** secure server-managed sessions or a reputable auth provider; role and tenant checks on every protected operation.
- **File storage:** private object storage for assignment attachments and student documents.
- **Validation:** shared schema validation for client and server inputs.
- **Testing:** unit tests for business rules, integration tests for protected APIs, and end-to-end tests for core workflows.
- **Deployment:** separate development/staging and production environments, managed database, backups, monitoring, and error tracking.

Do not introduce microservices, Kubernetes, or unnecessary complexity for the first version.

### Core data entities

Design normalized relational tables/entities for:
- Schools
- Users
- Roles and permissions
- Student profiles
- Teacher profiles
- Academic years
- Classes and sections
- Subjects
- Teacher assignments
- Enrollments
- Attendance records
- Assignments
- Assignment submissions
- Examinations
- Exam subjects
- Marks/results
- Timetable periods
- Announcements and audiences
- Fee categories
- Fee structures
- Student invoices/fee obligations
- Payments and receipts
- Leave requests
- Activity/audit logs
- School settings

Use stable IDs and timestamps. Add `school_id` to school-owned records and enforce tenant isolation in backend queries and, where available, database policies. Avoid deleting records with academic or financial history; use archive/status fields and preserve audit history.

---

## 7. Security and privacy requirements

This product handles children's education data. Treat security and privacy as core functionality, not optional enhancements.

- Enforce authentication and authorization server-side.
- Scope every query and mutation to the current school.
- Teachers can access only assigned classes/subjects.
- Students can access only their own records and published results.
- Store passwords using a secure password-hashing mechanism; never log credentials.
- Use secure, HTTP-only session cookies where applicable.
- Rate-limit login attempts and protect against common web vulnerabilities.
- Validate file types, file size, and upload permissions; use private storage.
- Keep audit records for sensitive changes.
- Encrypt data in transit and use managed encryption at rest where available.
- Back up the database automatically and test restoration.
- Provide data export and controlled account deactivation/deletion workflows.
- Minimize collection of children's personal data.
- Design for applicable Indian privacy and child-data requirements, with legal review before commercial deployment.
- Never expose secrets or service-role keys in frontend code.
- Never trust a school ID, student ID, or role sent by the client without verifying it on the server.

---

## 8. Seed/demo accounts for development

Create a local development seed with synthetic data for BHIMS and document the credentials in the README only for the local demo environment.

Suggested roles:
- School Admin
- Teacher
- Student

Include enough data to demonstrate all core flows:
- At least 3 classes and multiple sections.
- Several teacher accounts with different assignments.
- Synthetic students distributed across classes.
- Attendance records for multiple dates.
- Homework with varied submission statuses.
- An exam with draft and published results.
- Timetable periods with at least one conflict example for testing.
- Fee records with paid and outstanding balances.
- Published and draft announcements.

Do not deploy known demo credentials to production. Require secure password setup for real users.

---

## 9. Suggested build order

### Stage 1 — Foundation
- Inspect repository and current stack.
- Set up app shell, typography, colors, routing, authentication, roles, school scoping, database schema, migrations, and synthetic seed data.
- Implement polished responsive login and navigation.

### Stage 2 — School Admin
- Dashboard, students, teachers, academic setup, attendance, and settings.
- Add search, filters, validation, CSV import/export, and audit events.

### Stage 3 — Teacher
- Assigned classes, attendance, homework, marks entry, timetable, notices, and profile.
- Verify server-side class/subject restrictions.

### Stage 4 — Student
- Own dashboard, timetable, attendance, homework, published results, announcements, and optional read-only fee summary.
- Verify students cannot access each other's records.

### Stage 5 — Finance, reports, and quality
- Basic fee structures, payments, receipts, reports, and print-friendly views.
- Complete loading/error/empty states, accessibility checks, tests, and responsive refinements.

### Stage 6 — Deployment readiness
- Configure environment variables and secrets.
- Set up staging and production.
- Configure backups, monitoring, error tracking, and secure storage.
- Run permission and tenant-isolation tests.
- Document deployment, backup restoration, user creation, and handover.

Do not attempt to build every feature in a single giant code-generation pass. Implement one stage at a time, keep the application runnable, and test each stage before continuing.

---

## 10. Acceptance criteria

The application is not complete until all of these are true:

1. The app boots locally using documented instructions.
2. The UI consistently displays Vidyasetu and the example school BHIMS.
3. There are exactly three user-facing portals: School Admin, Teacher, and Student.
4. Login routes users to the correct portal based on verified role.
5. Admin can create and manage students, teachers, classes, subjects, and assignments.
6. Teachers can access only their assigned classes and subjects.
7. Students can access only their own information and published results.
8. Attendance can be recorded, reviewed, and reported without duplicate records.
9. Homework can be created by authorized users and viewed/submitted by students where enabled.
10. Marks are validated, and unpublished results remain hidden from students.
11. Timetable conflicts are detected and surfaced clearly.
12. Basic fee records and receipts calculate balances correctly.
13. Search, filters, pagination, and exports work where specified.
14. Every important form has validation and clear success/error feedback.
15. The layout works on desktop, tablet, and mobile.
16. School data isolation and role restrictions are tested on the server.
17. No critical action is represented by a nonfunctional placeholder button.
18. Seed/demo data is synthetic, and demo credentials cannot be used in production.
19. The README documents setup, migrations, seed data, environment variables, testing, and deployment.
20. Backups, restoration procedures, and basic monitoring are documented before real student data is used.

---

## 11. Instructions to the coding agent

1. First inspect the existing project, identify its framework, current routes, database, and reusable components.
2. If a project already exists, preserve working functionality and follow its established conventions unless there is a compelling reason to change them.
3. Present a concise implementation plan and identify any blocking unknowns.
4. Build the actual working application, not just a design image or static prototype.
5. Use reusable components and a consistent design system.
6. Keep all primary navigation, forms, filters, actions, and role-specific workflows functional.
7. Add database migrations and realistic synthetic BHIMS seed data.
8. Implement and test permissions before treating the application as production-ready.
9. Run available tests, linting, and type checks; fix errors introduced by the implementation.
10. Clearly report what is complete, what remains, required environment variables, and any limitations.
11. Do not claim integrations, security controls, tests, or deployment steps are complete unless they have actually been implemented and verified.

**Final design direction:** Vidyasetu should feel like a premium, dependable education SaaS: light background, navy structure, teal actions, clear tables, subtle rounded surfaces, refined typography, and a consistent icon system. Optimize for clarity and daily school use over visual decoration.
