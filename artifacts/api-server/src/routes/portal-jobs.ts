import { Router, type IRouter } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router: IRouter = Router();

const __dir = path.dirname(fileURLToPath(import.meta.url));
const STORE_FILE = path.resolve(__dir, "../../.job-store.json");

export interface PortalJob {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  type: string;
  requiredSkills: string[];
  openings: number;
  deadline: string;
  status: "Active" | "Paused" | "Closed";
  isApproved: boolean;
  applicantCount: number;
  postedAt: string;
  updatedAt: string;
  companyName: string;
  companyVerificationStatus: string;
  hrEmail?: string;
  rejectionReason?: string;
}

function loadStore(): Map<string, PortalJob> {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, "utf8");
      const arr = JSON.parse(raw) as PortalJob[];
      return new Map(arr.map(j => [j.id, j]));
    }
  } catch { /* ignore */ }
  return new Map();
}

function saveStore(store: Map<string, PortalJob>): void {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(Array.from(store.values()), null, 2), "utf8");
  } catch { /* ignore */ }
}

const jobStore = loadStore();

router.post("/jobs/submit", (req, res) => {
  const body = req.body as PortalJob;
  if (!body?.id || !body?.title) {
    res.status(400).json({ error: "id and title are required" });
    return;
  }

  const existing = jobStore.get(body.id);
  let stored: PortalJob;

  if (existing) {
    // Preserve admin-set fields — never let re-sync overwrite approval/rejection
    stored = {
      ...body,
      isApproved: existing.isApproved,
      rejectionReason: existing.rejectionReason,
      status: existing.status === "Closed" ? "Closed" : body.status,
      updatedAt: existing.updatedAt,
    };
  } else {
    stored = { ...body, updatedAt: new Date().toISOString() };
  }

  jobStore.set(stored.id, stored);
  saveStore(jobStore);
  res.json({ success: true, job: stored });
});

router.get("/jobs/portal", (_req, res) => {
  const activeJobs = Array.from(jobStore.values()).filter(j => j.status === "Active");
  res.json({ jobs: activeJobs, total: activeJobs.length });
});

export { jobStore, saveStore };
export default router;
