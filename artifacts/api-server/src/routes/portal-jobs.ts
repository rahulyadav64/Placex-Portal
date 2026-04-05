import { Router, type IRouter } from "express";

const router: IRouter = Router();

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

const jobStore = new Map<string, PortalJob>();

router.post("/jobs/submit", (req, res) => {
  const body = req.body as PortalJob;
  if (!body?.id || !body?.title) {
    res.status(400).json({ error: "id and title are required" });
    return;
  }
  jobStore.set(body.id, { ...body, updatedAt: new Date().toISOString() });
  res.json({ success: true, job: jobStore.get(body.id) });
});

router.get("/jobs/portal", (_req, res) => {
  const activeJobs = Array.from(jobStore.values()).filter(j => j.status === "Active");
  res.json({ jobs: activeJobs, total: activeJobs.length });
});

export { jobStore };
export default router;
