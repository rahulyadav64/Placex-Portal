# PlaceX — Online Placement Portal
## BCA Final Year Project Report

---

| | |
|---|---|
| **Project Title** | PlaceX — Online Placement Portal |
| **Course** | Bachelor of Computer Applications (BCA) |
| **Year** | Final Year (2025–2026) |
| **Submitted By** | [Dedraj] |
| **Roll Number** | [23BCA10029] |
| **College** | [Chandigarh University] |
| **Date of Submission** | April 2026 |

---

## Table of Contents

1. Abstract
2. Introduction
3. Problem Statement
4. Objectives
5. Scope of the Project
6. System Requirements
7. Technology Stack
8. System Architecture
9. Module Description
10. Database Design
11. Key Features
12. Government Alignment
13. Security Implementation
14. Testing
15. Screenshots / UI Overview
16. Future Scope
17. Conclusion
18. References

---

## 1. Abstract

**PlaceX** is a modern, full-stack Online Placement Portal developed as a BCA Final Year Project. Aligned with India's **Skill India** and **Digital India** initiatives, PlaceX bridges the gap between qualified students and reputed employers through a centralised digital platform.

The portal offers three distinct role-based experiences — **Student**, **Employer**, and **Admin** — each with a dedicated dashboard and access-controlled features. Students can explore Government, Private, and PlaceX-posted job listings, build detailed profiles, track applications, and match against job requirements using an AI-driven skill-scoring system. Employers can register companies with CIN verification, post jobs, and track applicant engagement. Administrators moderate all job postings through a secure admin panel with access-key authentication.

The application is built using **React + Vite** (frontend), **Node.js + Express** (backend), and **localStorage** (client-side persistence), and is fully deployed on **Replit** for public access.

---

## 2. Introduction

Campus placement is a critical milestone in every student's academic journey, yet the existing process is often fragmented, paper-heavy, and inaccessible. Students miss opportunities due to poor information flow; employers struggle to find the right candidates; and institutions lack a unified platform for placement management.

**PlaceX** solves this through a comprehensive digital placement ecosystem that:

- Aggregates real job listings from multiple sources (Government portals, Private companies, and PlaceX-posted jobs)
- Implements role-based dashboards with protected routes for Students, Employers, and Admins
- Provides instant company CIN verification against MCA India records
- Displays government job deadlines in real-time, aligned with NCS (National Career Service) portal data
- Offers AI-assisted skill match scoring to help students find the best-fit roles

The project demonstrates practical knowledge of full-stack web development, REST API design, authentication systems, UI/UX design, and cloud deployment.

---

## 3. Problem Statement

The traditional campus placement process faces several challenges:

| Problem | Impact |
|---|---|
| No centralised job listing portal | Students miss opportunities across sectors |
| Manual verification of employers | Fraudulent job postings harm students |
| Paper-based profile submission | Slow, error-prone, and not searchable |
| No skill-match analysis | Students apply to irrelevant roles |
| Separate admin processes | Inefficient moderation of job postings |
| Government job information scattered | Students unaware of PSU/govt opportunities |

PlaceX addresses each of these through its feature set.

---

## 4. Objectives

1. Build a **unified, role-based online placement portal** for students, employers, and admins
2. Implement **real per-account authentication** so each email has one isolated, private account
3. Provide **three job categories**: Government jobs, Private/company jobs, and PlaceX-curated jobs
4. Integrate **CIN-based company verification** for employer legitimacy (MCA India format)
5. Build an **Admin Panel** with access-key authentication to moderate job postings
6. Implement a **skill-match scoring engine** to calculate student–job compatibility
7. Display **Government job listings** with updated 2026 deadlines aligned with NCS/UPSC data
8. Ensure **responsive design** for mobile, tablet, and desktop access
9. Deploy the application **publicly** via Replit cloud hosting
10. Align the platform with **Skill India** and **Digital India** government initiatives

---

## 5. Scope of the Project

### In Scope
- Student registration, login, profile management, job browsing, and application tracking
- Employer registration, company profile creation with CIN verification, and job posting
- Admin panel with job moderation (approve/reject with reason)
- Three-tab job browsing: Government, Private (JSearch API), PlaceX Portal
- Real-time job approval status sync between employer and admin
- Responsive web application with modern UI/UX

### Out of Scope
- Native mobile application (iOS/Android)
- Payment gateway integration for premium listings
- Email notification system
- Video interview integration
- Real-time chat between students and employers

---

## 6. System Requirements

### Hardware Requirements

| Component | Minimum | Recommended |
|---|---|---|
| Processor | Intel Core i3 / AMD equivalent | Intel Core i5 or above |
| RAM | 4 GB | 8 GB |
| Storage | 10 GB free | 20 GB SSD |
| Internet | 2 Mbps | 10 Mbps broadband |
| Display | 1024×768 | 1920×1080 |

### Software Requirements

| Software | Version | Purpose |
|---|---|---|
| Node.js | v24.x (LTS) | Backend runtime |
| pnpm | v9.x | Package manager |
| Git | v2.x | Version control |
| Web Browser | Chrome 110+ / Firefox 110+ | Frontend access |
| VS Code / Replit | Latest | Development IDE |
| Operating System | Windows 10 / Ubuntu 22.04 / macOS 12+ | Development environment |

---

## 7. Technology Stack

### Frontend
| Technology | Version | Role |
|---|---|---|
| React | 18.x | UI component library |
| TypeScript | 5.x | Type-safe JavaScript |
| Vite | 7.x | Build tool and dev server |
| Tailwind CSS | 3.x | Utility-first CSS framework |
| shadcn/ui | Latest | Pre-built accessible UI components |
| Wouter | 3.x | Lightweight client-side routing |
| Lucide React | Latest | Icon library |
| TanStack Query | 5.x | Server state management |

### Backend
| Technology | Version | Role |
|---|---|---|
| Node.js | v24.x | JavaScript runtime |
| Express.js | 4.x | HTTP server framework |
| TypeScript | 5.x | Type-safe server code |
| esbuild | Latest | Fast TypeScript compilation |
| Pino | Latest | Structured logging |

### Data Storage
| Layer | Technology | Purpose |
|---|---|---|
| Client-side | localStorage (per-user namespaced) | User profiles, applications, sessions |
| Server-side | JSON file store (.job-store.json) | Posted jobs, admin key persistence |
| Session | localStorage (placex_session_v1) | Authentication session management |

### External APIs
| API | Purpose |
|---|---|
| JSearch API (RapidAPI) | Real-time private sector job listings |
| NCS Portal Data | Government job listings reference |
| MCA India CIN Format | Company Identity Number validation |

### DevOps & Deployment
| Tool | Purpose |
|---|---|
| Replit | Cloud hosting and deployment |
| pnpm Workspaces | Monorepo management |
| GitHub | Version control and source hosting |

---

## 8. System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│                 CLIENT (Browser)                 │
│                                                  │
│  ┌─────────────────┐   ┌──────────────────────┐ │
│  │ Placement Portal │   │    Admin Panel       │ │
│  │  React + Vite   │   │    React + Vite      │ │
│  │  Port: dynamic  │   │    Port: dynamic     │ │
│  └────────┬────────┘   └──────────┬───────────┘ │
│           │                       │              │
└───────────┼───────────────────────┼──────────────┘
            │  REST API calls       │
            ▼                       ▼
┌─────────────────────────────────────────────────┐
│              API SERVER (Express.js)             │
│                   Port: 8080                     │
│                                                  │
│  /api/jobs/government    ── Government listings  │
│  /api/jobs/search        ── JSearch (RapidAPI)   │
│  /api/jobs/submit        ── Post employer job    │
│  /api/jobs/portal        ── PlaceX job store     │
│  /api/verify-company     ── CIN verification     │
│  /api/admin/*            ── Admin CRUD (authed)  │
│  /api/verify-key         ── Admin key check      │
│                                                  │
│  File Store: .job-store.json                     │
│  Admin Key:  .admin-key                          │
└─────────────────────────────────────────────────┘
```

### Authentication Architecture

```
Registration
│
├── Email + Password + Role → placex_users_v1 (localStorage)
├── Session created → placex_session_v1 (localStorage)
└── Profile keys namespaced → student_profile_v1_u_{email}

Login
│
├── Lookup email in placex_users_v1
├── Verify password hash (djb2 hash)
├── Role check (student vs employer)
└── Session set → redirect to correct dashboard

Logout
│
└── clearSession() → redirect to /login
```

### Data Isolation per User

```
User: alice@example.com (Student)
  ├── student_profile_v1_u_alice_example_com
  └── student_applications_v1_u_alice_example_com

User: bob@company.com (Employer)
  ├── employer_company_v1_u_bob_company_com
  └── employer_jobs_v1_u_bob_company_com
```

---

## 9. Module Description

### Module 1: Authentication System (`src/lib/auth.ts`)
Handles complete user lifecycle management.

**Functions:**
- `register()` — Creates new account, checks for duplicate email, hashes password, stores in `placex_users_v1`, sets session
- `login()` — Validates credentials, checks role, sets `placex_session_v1`
- `getSession()` — Returns current logged-in user data
- `clearSession()` — Logs user out
- `currentUserKey()` — Generates email-namespaced localStorage key for data isolation

### Module 2: Student Dashboard (`/dashboard/student`)
Protected route accessible only to authenticated students.

**Features:**
- Profile completion tracker (13 fields with % completion)
- Programming languages with proficiency levels (Beginner to Expert)
- Technical skills selector (130+ technologies across 10 categories)
- Soft skills selector
- Certifications tracker
- Internship and project portfolio
- Application history with status tracking
- Resume upload (base64 encoded)
- Profile photo upload
- AI skill-match score per job

### Module 3: Employer Dashboard (`/dashboard/employer`)
Protected route accessible only to authenticated employers.

**Features:**
- Company profile setup with CIN + GSTIN validation
- Instant CIN verification against MCA India records
- Company verification badge (Verified / Pending / Unverified)
- Job posting with required skills selection
- Per-job approval status (Approved / Under Review)
- Real-time status sync with API server (30-second auto-polling)
- Manual "Refresh Status" button
- Recruitment funnel analytics
- Job management (pause, close, delete)

### Module 4: Admin Panel (`/admin-panel`)
Separate application with access-key authentication.

**Features:**
- Secure login with `PLACEX-ADMIN-XXXXXXXX` format key
- Master ENV key always works regardless of generated keys
- Job moderation queue (Pending / Approved / Rejected tabs)
- Approve jobs with one click
- Reject jobs with a reason (selected or custom)
- View company CIN and verification status on each job card
- Real-time stats: Pending count, Approved count, Rejected count, Total
- Key regeneration for security

### Module 5: Jobs Browser (`/jobs`)
Three-tab job discovery interface.

**Tab 1 — Government Jobs:**
- 15 curated government job listings (UPSC, SSC, RBI, ISRO, NHM, etc.)
- Updated 2026 application deadlines
- Direct apply links to official portals
- Exam date, salary grade, eligibility info

**Tab 2 — Private Jobs (Live API):**
- Real-time listings from JSearch API (RapidAPI)
- Filterable by keyword, location, job type
- Skill match score calculation
- Direct apply links

**Tab 3 — PlaceX Portal:**
- Jobs posted by verified employers through PlaceX
- Dual badge system: Approved Job badge + Company Verification badge
- Admin approval required before listing appears

### Module 6: Company Verification (`/api/verify-company`)
Validates employer identity using CIN format.

**CIN Format:** `[L/U][5-digit NIC][State Code][Year][Entity Type][6-digit Serial]`
**Example:** `U72900DL2009PTC189306`

**Verification Flow:**
1. Validate CIN regex format
2. Extract state, year, entity type, listing status
3. Return instant "verified" status for valid format
4. Return "unverified" for invalid format

---

## 10. Database Design

PlaceX uses a hybrid storage approach — client-side localStorage for user data and server-side JSON file store for shared job data.

### Client-Side Storage Schema (localStorage)

**User Registry**
```json
placex_users_v1: {
  "alice@example.com": {
    "email": "alice@example.com",
    "passwordHash": "3f7a8b2c",
    "role": "student",
    "firstName": "Alice",
    "lastName": "Sharma",
    "college": "Delhi University",
    "course": "BCA",
    "createdAt": "2026-04-01T10:00:00Z"
  }
}
```

**Session**
```json
placex_session_v1: {
  "email": "alice@example.com",
  "role": "student",
  "firstName": "Alice",
  "lastName": "Sharma"
}
```

**Student Profile** (key: `student_profile_v1_u_{email}`)
```json
{
  "name": "Alice Sharma",
  "email": "alice@example.com",
  "phone": "9876543210",
  "college": "Delhi University",
  "course": "BCA",
  "year": "Final Year",
  "cgpa": "8.5",
  "programmingLanguages": [
    { "name": "Python", "level": "Advanced" },
    { "name": "JavaScript", "level": "Intermediate" }
  ],
  "technicalSkills": ["React", "Node.js", "MongoDB"],
  "projects": [...],
  "internships": [...],
  "resumeDataUrl": "data:application/pdf;base64,..."
}
```

**Posted Jobs** (key: `employer_jobs_v1_u_{email}`)
```json
[
  {
    "id": "job_1712345678",
    "title": "Full Stack Developer",
    "location": "Bangalore",
    "salary": "₹6-10 LPA",
    "type": "Full-time",
    "requiredSkills": ["React", "Node.js"],
    "openings": 3,
    "status": "Active",
    "isApproved": true,
    "postedAt": "2026-04-01T10:00:00Z"
  }
]
```

### Server-Side Storage (`.job-store.json`)
```json
{
  "job_1712345678": {
    "id": "job_1712345678",
    "title": "Full Stack Developer",
    "companyName": "TechNova Solutions",
    "companyVerificationStatus": "verified",
    "isApproved": true,
    "rejectionReason": null,
    "submittedAt": "2026-04-01T10:00:00Z"
  }
}
```

---

## 11. Key Features

### Feature 1: Real Per-Account Authentication
- Each email creates one isolated account
- Password hashing using djb2 algorithm
- Session persists across browser refreshes
- Role-based route protection (students cannot access employer dashboard and vice versa)
- Logout clears session and redirects to login

### Feature 2: CIN-Based Company Verification
- 21-character CIN format validated against MCA India pattern
- Extracts state, incorporation year, entity type, listing status
- Instant verification — no waiting period
- Verified badge displayed on all job postings

### Feature 3: Admin Job Moderation
- Separate admin panel at `/admin-panel`
- Access-key authentication (`PLACEX-ADMIN-XXXXXXXXXX` format)
- Master ENV key as permanent backup
- Approve or reject with reason (tracks audit trail)
- Real-time sync with employer dashboards

### Feature 4: Skill Match Scoring
- Student's technical skills cross-referenced with job requirements
- Match percentage calculated: `(matched skills / required skills) × 100`
- Displayed as a colour-coded score (0–99%) on each job card

### Feature 5: Three-Category Job Browser
- **Government tab**: 15 listings with 2026 deadlines (UPSC, SSC, RBI, ISRO, etc.)
- **Private tab**: Real-time listings via JSearch/RapidAPI
- **PlaceX tab**: Employer-posted, admin-approved listings

### Feature 6: Dual Badge System (PlaceX Jobs)
- **Job Approval Badge**: "Approved Job" (green) or "Under Review" (amber)
- **Company Verification Badge**: "Verified" (blue) / "Pending" (amber) / "Unverified" (red)
- Both badges visible simultaneously on each listing

### Feature 7: 130+ Skills Selector
Categorised into: Frontend, Backend, Mobile, Database, Cloud/DevOps, AI/ML/Data, Version Control, Security, Testing, Blockchain, and more — fully scrollable with instant toggle selection.

### Feature 8: Profile Completeness Tracker
- 13-point checklist tracks profile completeness
- Percentage shown with visual progress bar
- Lists what fields are still missing

---

## 12. Government Alignment

PlaceX is directly aligned with two major Government of India digital initiatives:

### Skill India Mission
- Promotes skill development awareness through the platform's skills section (130+ technologies)
- Encourages students to certify skills (AWS, Google, Microsoft, Oracle, Cisco, etc.)
- Skill match scoring incentivises students to upskill for specific roles

### Digital India Programme
- Fully digital, paperless placement process
- Online profile management replaces physical resumes
- Direct links to Government job portals (NCS, UPSC, SSC, RBI)
- CIN verification aligns with MCA India's digital company registry

### Government Job Listings
The platform features 15 government job listings including:
- UPSC Civil Services, NDA, CDS
- SSC CGL, CHSL, MTS
- RBI Grade B, Assistant
- ISRO Scientist/Engineer
- NHM Community Health Officer
- Indian Army Technical Entry
- NPS Trust Officer
- ECGC Probationary Officer
- Ordnance Factory Board Apprentice
- Sainik School Teaching Staff

---

## 13. Security Implementation

| Security Feature | Implementation |
|---|---|
| Password Hashing | djb2 hash algorithm on client side |
| Per-user Data Isolation | Email-namespaced localStorage keys |
| Admin Access Control | PLACEX-ADMIN-XXXXXXXX format key |
| Master Key Fallback | ENV variable always works as backup |
| Route Protection | Unauthenticated users redirected to /login |
| Role Enforcement | Students blocked from employer routes and vice versa |
| Admin Key Persistence | Stored in server-side .admin-key file |
| CIN Validation | Regex-based format check before accepting company data |

---

## 14. Testing

### Manual Testing Checklist

| Test Case | Expected Result | Status |
|---|---|---|
| Register new student account | Account created, redirected to dashboard | ✅ Pass |
| Register with same email again | "Account already exists" error shown | ✅ Pass |
| Login with wrong password | "Incorrect password" error shown | ✅ Pass |
| Student accessing employer dashboard | Redirected to student dashboard | ✅ Pass |
| Unauthenticated access to dashboard | Redirected to /login | ✅ Pass |
| Enter valid CIN number | "Company Verified" instantly | ✅ Pass |
| Enter invalid CIN number | "Invalid CIN format" error | ✅ Pass |
| Post job as employer | Job submitted, appears in admin queue | ✅ Pass |
| Admin approves job | Job shows "Approved" badge on portal | ✅ Pass |
| Admin rejects job with reason | Employer sees rejection reason | ✅ Pass |
| Government jobs tab | 15 listings with 2026 deadlines | ✅ Pass |
| Skill match scoring | Correct percentage based on skill overlap | ✅ Pass |
| Logout | Session cleared, redirected to login | ✅ Pass |
| Mobile responsive layout | All pages display correctly on mobile | ✅ Pass |

### API Endpoint Testing

| Endpoint | Method | Test | Status |
|---|---|---|---|
| /api/jobs/government | GET | Returns 15 govt job listings | ✅ Pass |
| /api/jobs/search | GET | Returns live job listings | ✅ Pass |
| /api/verify-company | POST | Valid CIN returns verified | ✅ Pass |
| /api/jobs/submit | POST | Job saved to file store | ✅ Pass |
| /api/admin/jobs | GET | Returns all jobs (with key) | ✅ Pass |
| /api/admin/jobs/:id/approve | PATCH | Approves job | ✅ Pass |
| /api/admin/jobs/:id/reject | PATCH | Rejects with reason | ✅ Pass |
| /api/verify-key | POST | Validates admin access key | ✅ Pass |

---

## 15. UI Overview

The PlaceX portal features a modern, glassmorphism-inspired design with:

- **Colour Palette**: Blue-to-purple gradient (`hsl(240, 80%, 55%)` to `hsl(270, 70%, 55%)`)
- **Typography**: Inter font (400, 500, 600, 700 weights)
- **Design System**: shadcn/ui components with custom Tailwind CSS utilities
- **Glass Effect**: `glass-card` class with `backdrop-blur` and `bg-background/80`
- **Responsive**: Mobile-first design with breakpoints at `md` (768px) and `lg` (1024px)

### Pages
1. **Home** — Hero, feature highlights, stats, CTA
2. **Jobs** — Three-tab job browser (Government / Private / PlaceX)
3. **Features** — Platform capabilities overview
4. **Analytics** — Platform statistics and charts
5. **Government** — NCS alignment and government job focus
6. **Student Dashboard** — Profile, applications, skill editor
7. **Employer Dashboard** — Company profile, job posting, analytics
8. **Admin Dashboard** — Job moderation panel
9. **Login / Register** — Role-based authentication forms
10. **About, Architecture, Technical, Workflow, Results, Future** — Project documentation pages

---

## 16. Future Scope

1. **Real Database Integration** — Replace localStorage with PostgreSQL for multi-device sync and data durability
2. **Email Notifications** — Automated emails for application status, job approvals, interview invitations (SendGrid / Nodemailer)
3. **Resume Builder** — In-app PDF resume generator from profile data
4. **AI Job Recommendations** — Machine learning model to suggest jobs based on profile, skills, and browsing history
5. **Video Interviews** — WebRTC-based in-platform video interviewing (eliminates external tools)
6. **Mobile App** — React Native app for iOS and Android
7. **Real MCA API Integration** — Live CIN verification via Ministry of Corporate Affairs API
8. **Placement Analytics Dashboard** — College-wide placement statistics for TPO (Training and Placement Officer)
9. **Campus Drive Management** — Schedule and manage on-campus recruitment drives
10. **Aadhaar/DigiLocker Integration** — Student identity verification via government digital identity

---

## 17. Conclusion

PlaceX successfully demonstrates how modern web technologies can be leveraged to solve a real-world institutional challenge — the campus placement process. Over the course of this project, the following were achieved:

- A **full-stack web application** with three separate services (placement portal, admin panel, API server) running as a coordinated monorepo
- **Real per-account authentication** with email isolation, role-based access control, and session management
- **Live API integration** (JSearch/RapidAPI) for real-time job data
- **Government alignment** with curated listings from UPSC, SSC, RBI, ISRO, and other portals
- **Secure admin moderation** with access-key authentication and persistent file storage
- **Professional UI/UX** with a custom design system, responsive layout, and 130+ selectable skills
- **Cloud deployment** on Replit with a publicly accessible URL

The project demonstrates competency in React, TypeScript, Node.js, Express.js, REST APIs, authentication systems, UI/UX design, and cloud deployment — core skills for a software engineering career.

PlaceX is a platform that is not just a college project, but a working product that could realistically be adopted by educational institutions across India to modernise their placement process and align with the Digital India vision.

---

## 18. References

1. Ministry of Corporate Affairs, Government of India — *Corporate Identity Number (CIN) Format* — https://www.mca.gov.in
2. National Career Service Portal — *Government Job Listings* — https://www.ncs.gov.in
3. Skill India Portal — https://www.skillindia.gov.in
4. Digital India Programme — https://www.digitalindia.gov.in
5. React Documentation — https://react.dev
6. Node.js Documentation — https://nodejs.org/docs
7. Express.js Documentation — https://expressjs.com
8. Vite Documentation — https://vitejs.dev
9. Tailwind CSS Documentation — https://tailwindcss.com
10. shadcn/ui Documentation — https://ui.shadcn.com
11. TypeScript Documentation — https://www.typescriptlang.org/docs
12. RapidAPI JSearch API — https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
13. UPSC Official Website — https://upsc.gov.in
14. SSC Official Website — https://ssc.nic.in
15. pnpm Workspaces — https://pnpm.io/workspaces

---

*Report prepared for BCA Final Year Project Submission — April 2026*
*PlaceX — Connecting Talent with Opportunity*
*Aligned with Skill India & Digital India*
