import { currentUserKey } from "./auth";

export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";

export interface CompanyProfile {
  name: string;
  cin: string;
  gstin: string;
  website: string;
  industry: string;
  size: string;
  city: string;
  state: string;
  description: string;
  hrName: string;
  hrEmail: string;
  hrPhone: string;
  linkedIn: string;
  logoDataUrl: string | null;
  verificationStatus: VerificationStatus;
  verificationNote: string;
  verifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PostedJob {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  requiredSkills: string[];
  openings: number;
  deadline: string;
  status: "Active" | "Paused" | "Closed";
  isApproved: boolean;
  applicantCount: number;
  postedAt: string;
  updatedAt: string;
}

export interface VerificationResult {
  status: VerificationStatus;
  note: string;
  companyName?: string;
  registeredState?: string;
  registeredYear?: string;
  companyType?: string;
}

const COMPANY_KEY_BASE = "employer_company_v1";
const JOBS_KEY_BASE = "employer_jobs_v1";

function companyKey() { return currentUserKey(COMPANY_KEY_BASE); }
function jobsKey() { return currentUserKey(JOBS_KEY_BASE); }

export const DEFAULT_COMPANY: CompanyProfile = {
  name: "",
  cin: "",
  gstin: "",
  website: "",
  industry: "",
  size: "",
  city: "",
  state: "",
  description: "",
  hrName: "",
  hrEmail: "",
  hrPhone: "",
  linkedIn: "",
  logoDataUrl: null,
  verificationStatus: "unverified",
  verificationNote: "",
  verifiedAt: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function loadCompany(): CompanyProfile {
  try {
    const raw = localStorage.getItem(companyKey());
    if (!raw) return { ...DEFAULT_COMPANY };
    return { ...DEFAULT_COMPANY, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_COMPANY };
  }
}

export function saveCompany(c: CompanyProfile): void {
  localStorage.setItem(companyKey(), JSON.stringify({ ...c, updatedAt: new Date().toISOString() }));
}

export function loadPostedJobs(): PostedJob[] {
  try {
    const raw = localStorage.getItem(jobsKey());
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePostedJobs(jobs: PostedJob[]): void {
  localStorage.setItem(jobsKey(), JSON.stringify(jobs));
}

export function validateCIN(cin: string): { valid: boolean; reason?: string; parsed?: Record<string, string> } {
  const trimmed = cin.trim().toUpperCase();
  if (!trimmed) return { valid: false, reason: "CIN is required" };
  const regex = /^([LU])(\d{5})([A-Z]{2})(\d{4})(PTC|PLC|LLC|OPC|NPL|GOI|GAP|FTC|FLC|GAT|ULL|ULP|ULT|FPN|FGN|PNF|PNN)(\d{6})$/;
  const match = trimmed.match(regex);
  if (!match) return { valid: false, reason: "Invalid CIN format. Expected: L/U + 5 digits + State (2 letters) + Year (4 digits) + Company Type + 6 digits (e.g. U74899DL2000PTC123456)" };
  return {
    valid: true,
    parsed: {
      listingStatus: match[1] === "L" ? "Listed" : "Unlisted",
      nicCode: match[2],
      state: match[3],
      year: match[4],
      entityType: match[5],
      serialNo: match[6],
    },
  };
}

export function validateGSTIN(gstin: string): boolean {
  const trimmed = gstin.trim().toUpperCase();
  const regex = /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return regex.test(trimmed);
}

const INDIA_STATE_CODES: Record<string, string> = {
  MH: "Maharashtra", DL: "Delhi", KA: "Karnataka", TN: "Tamil Nadu",
  GJ: "Gujarat", WB: "West Bengal", RJ: "Rajasthan", UP: "Uttar Pradesh",
  TG: "Telangana", AP: "Andhra Pradesh", KL: "Kerala", PB: "Punjab",
  HR: "Haryana", MP: "Madhya Pradesh", OR: "Odisha", BR: "Bihar",
  CH: "Chandigarh", GA: "Goa", AS: "Assam", HP: "Himachal Pradesh",
};

export function parseStateFromCIN(cin: string): string {
  const code = cin.trim().toUpperCase().substring(4, 6);
  return INDIA_STATE_CODES[code] || code;
}

export function getCompanyCompletion(c: CompanyProfile): number {
  const checks = [
    !!c.name, !!c.cin, !!c.gstin, !!c.industry, !!c.city,
    !!c.hrName, !!c.hrEmail, !!c.description, !!c.website,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}
