import { Router, type Request, type Response, type NextFunction, type IRouter } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { jobStore, saveStore, type PortalJob } from "./portal-jobs";

const router: IRouter = Router();

const __dir = path.dirname(fileURLToPath(import.meta.url));
const KEY_FILE = path.resolve(__dir, "../../.admin-key");

function loadAdminKey(): string {
  try {
    const saved = fs.readFileSync(KEY_FILE, "utf-8").trim();
    if (saved) return saved;
  } catch {}
  return process.env["ADMIN_KEY"] ?? "";
}

function saveAdminKey(key: string) {
  try { fs.writeFileSync(KEY_FILE, key, "utf-8"); } catch {}
}

const ENV_KEY: string = process.env["ADMIN_KEY"] ?? "";
let currentAdminKey: string = loadAdminKey();

function isValidKey(key: string | undefined): boolean {
  if (!key) return false;
  // ENV_KEY always works as permanent master key
  if (ENV_KEY && key === ENV_KEY) return true;
  return !!currentAdminKey && key === currentAdminKey;
}

function requireAdminKey(req: Request, res: Response, next: NextFunction): void {
  const key = req.headers["x-admin-key"] as string | undefined;
  if (!isValidKey(key)) {
    res.status(401).json({ error: "Unauthorized: invalid or missing admin key" });
    return;
  }
  next();
}

router.post("/admin/verify-key", (req, res) => {
  const { key } = req.body as { key?: string };
  res.json({ valid: isValidKey(key) });
});

router.post("/admin/generate-key", (req, res) => {
  const key = req.headers["x-admin-key"] as string | undefined;
  if (!isValidKey(key)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ23456789";
  const segment = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const newKey = `PLACEX-ADMIN-${segment(4)}-${segment(4)}-${segment(4)}`;
  currentAdminKey = newKey;
  saveAdminKey(newKey);
  res.json({ newKey });
});

router.use("/admin", requireAdminKey);

router.get("/admin/jobs", (_req, res) => {
  const all = Array.from(jobStore.values()).sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );
  const pending = all.filter(j => !j.isApproved && j.status === "Active");
  const approved = all.filter(j => j.isApproved);
  const total = all.length;
  res.json({ jobs: all, stats: { total, pending: pending.length, approved: approved.length } });
});

router.post("/admin/jobs/:id/approve", (req, res) => {
  const job = jobStore.get(req.params.id);
  if (!job) { res.status(404).json({ error: "Job not found" }); return; }
  const updated: PortalJob = { ...job, isApproved: true, rejectionReason: undefined, updatedAt: new Date().toISOString() };
  jobStore.set(job.id, updated);
  saveStore(jobStore);
  res.json({ success: true, job: updated });
});

router.post("/admin/jobs/:id/reject", (req, res) => {
  const job = jobStore.get(req.params.id);
  if (!job) { res.status(404).json({ error: "Job not found" }); return; }
  const { reason } = req.body as { reason?: string };
  const updated: PortalJob = {
    ...job,
    isApproved: false,
    status: "Closed",
    rejectionReason: reason || "Does not meet PlaceX quality standards.",
    updatedAt: new Date().toISOString(),
  };
  jobStore.set(job.id, updated);
  saveStore(jobStore);
  res.json({ success: true, job: updated });
});

router.post("/admin/jobs/:id/revoke", (req, res) => {
  const job = jobStore.get(req.params.id);
  if (!job) { res.status(404).json({ error: "Job not found" }); return; }
  const updated: PortalJob = { ...job, isApproved: false, rejectionReason: undefined, updatedAt: new Date().toISOString() };
  jobStore.set(job.id, updated);
  saveStore(jobStore);
  res.json({ success: true, job: updated });
});

router.delete("/admin/jobs/:id", (req, res) => {
  if (!jobStore.has(req.params.id)) { res.status(404).json({ error: "Job not found" }); return; }
  jobStore.delete(req.params.id);
  saveStore(jobStore);
  res.json({ success: true });
});

export default router;
