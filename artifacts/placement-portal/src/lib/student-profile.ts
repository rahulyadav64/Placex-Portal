export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface ProgrammingLanguage {
  name: string;
  level: SkillLevel;
}

export interface Internship {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Project {
  name: string;
  techStack: string;
  description: string;
  link?: string;
}

export interface StudentProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  college: string;
  course: string;
  year: string;
  cgpa: string;
  programmingLanguages: ProgrammingLanguage[];
  technicalSkills: string[];
  softSkills: string[];
  certifications: string[];
  internships: Internship[];
  projects: Project[];
  linkedIn: string;
  github: string;
  objective: string;
  resumeName: string | null;
  resumeDataUrl: string | null;
  photoDataUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  status: "Applied" | "Under Review" | "Interview Scheduled" | "Offered" | "Rejected";
  appliedAt: string;
  matchScore: number;
  sourceUrl: string;
  source: string;
}

const PROFILE_KEY = "student_profile_v1";
const APPLICATIONS_KEY = "student_applications_v1";

export const DEFAULT_PROFILE: StudentProfile = {
  name: "",
  email: "",
  phone: "",
  city: "",
  college: "",
  course: "BCA",
  year: "Final Year",
  cgpa: "",
  programmingLanguages: [],
  technicalSkills: [],
  softSkills: [],
  certifications: [],
  internships: [],
  projects: [],
  linkedIn: "",
  github: "",
  objective: "",
  resumeName: null,
  resumeDataUrl: null,
  photoDataUrl: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function loadProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return { ...DEFAULT_PROFILE };
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

export function saveProfile(profile: StudentProfile): void {
  const updated = { ...profile, updatedAt: new Date().toISOString() };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
}

export function loadApplications(): Application[] {
  try {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveApplications(apps: Application[]): void {
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps));
}

export function computeMatchScore(profileSkills: string[], jobSkills: string[]): number {
  if (!jobSkills.length) return 50;
  const profileLower = profileSkills.map(s => s.toLowerCase());
  const matched = jobSkills.filter(s => profileLower.includes(s.toLowerCase())).length;
  const base = Math.round((matched / jobSkills.length) * 100);
  return Math.min(99, Math.max(10, base));
}

export function getProfileCompletion(profile: StudentProfile): { percent: number; missing: string[] } {
  const checks: { label: string; done: boolean }[] = [
    { label: "Full name", done: !!profile.name },
    { label: "Email address", done: !!profile.email },
    { label: "Phone number", done: !!profile.phone },
    { label: "City / Location", done: !!profile.city },
    { label: "College name", done: !!profile.college },
    { label: "CGPA / Percentage", done: !!profile.cgpa },
    { label: "Career objective", done: !!profile.objective },
    { label: "Programming languages", done: profile.programmingLanguages.length > 0 },
    { label: "Technical skills", done: profile.technicalSkills.length > 0 },
    { label: "Upload resume", done: !!profile.resumeName },
    { label: "LinkedIn profile", done: !!profile.linkedIn },
    { label: "GitHub profile", done: !!profile.github },
    { label: "Add a project", done: profile.projects.length > 0 },
  ];
  const done = checks.filter(c => c.done).length;
  const missing = checks.filter(c => !c.done).map(c => c.label);
  return { percent: Math.round((done / checks.length) * 100), missing };
}
