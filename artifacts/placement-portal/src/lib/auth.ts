export interface User {
  email: string;
  passwordHash: string;
  role: "student" | "employer";
  firstName: string;
  lastName: string;
  college?: string;
  course?: string;
  company?: string;
  designation?: string;
  createdAt: string;
}

export interface Session {
  email: string;
  role: "student" | "employer";
  firstName: string;
  lastName: string;
}

const USERS_KEY = "placex_users_v1";
const SESSION_KEY = "placex_session_v1";

function simpleHash(password: string): string {
  let h = 5381;
  for (let i = 0; i < password.length; i++) {
    h = ((h << 5) + h) ^ password.charCodeAt(i);
  }
  return (h >>> 0).toString(36);
}

export function getUsers(): Record<string, User> {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "{}") as Record<string, User>; }
  catch { return {}; }
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) as Session : null;
  } catch { return null; }
}

export function setSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function userStorageKey(base: string, email: string): string {
  const safe = email.toLowerCase().replace(/[^a-z0-9]/g, "_");
  return `${base}_u_${safe}`;
}

export function currentUserKey(base: string): string {
  const session = getSession();
  if (!session) return base;
  return userStorageKey(base, session.email);
}

export function login(
  email: string,
  password: string
): { session: Session } | { error: string } {
  const users = getUsers();
  const key = email.trim().toLowerCase();
  const user = users[key];
  if (!user) return { error: "No account found with this email. Please register first." };
  if (user.passwordHash !== simpleHash(password)) return { error: "Incorrect password. Please try again." };
  const session: Session = { email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName };
  setSession(session);
  return { session };
}

export function register(data: {
  email: string;
  password: string;
  role: "student" | "employer";
  firstName: string;
  lastName: string;
  college?: string;
  course?: string;
  company?: string;
  designation?: string;
}): { session: Session } | { error: string } {
  const users = getUsers();
  const key = data.email.trim().toLowerCase();
  if (users[key]) {
    return { error: "An account with this email already exists. Please sign in instead." };
  }
  const user: User = {
    email: data.email.trim(),
    passwordHash: simpleHash(data.password),
    role: data.role,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    college: data.college?.trim(),
    course: data.course?.trim(),
    company: data.company?.trim(),
    designation: data.designation?.trim(),
    createdAt: new Date().toISOString(),
  };
  users[key] = user;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  const session: Session = { email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName };
  setSession(session);
  return { session };
}
