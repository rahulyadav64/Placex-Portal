import { useState, useCallback, useEffect } from "react";
import {
  type CompanyProfile,
  type PostedJob,
  type VerificationResult,
  loadCompany,
  saveCompany,
  loadPostedJobs,
  savePostedJobs,
} from "@/lib/employer-profile";

async function syncJobToServer(job: PostedJob, company: CompanyProfile) {
  try {
    await fetch("/api/jobs/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...job,
        companyName: company.name,
        companyVerificationStatus: company.verificationStatus,
        hrEmail: company.hrEmail,
      }),
    });
  } catch {
    // silently ignore — server might be unavailable
  }
}

export function useEmployerProfile() {
  const [company, setCompanyState] = useState<CompanyProfile>(loadCompany);
  const [postedJobs, setPostedJobsState] = useState<PostedJob[]>(loadPostedJobs);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  // Sync all local jobs to the API server on mount (handles server restarts & first load)
  useEffect(() => {
    const jobs = loadPostedJobs();
    const comp = loadCompany();
    if (jobs.length === 0) return;
    jobs.forEach(job => syncJobToServer(job, comp));
  }, []);

  // Listen for approval status changes synced from the API server
  useEffect(() => {
    const onSynced = () => {
      setPostedJobsState(loadPostedJobs());
    };
    window.addEventListener("employer-jobs-synced", onSynced);
    return () => window.removeEventListener("employer-jobs-synced", onSynced);
  }, []);

  const updateCompany = useCallback((updates: Partial<CompanyProfile>) => {
    setCompanyState(prev => {
      const next = { ...prev, ...updates, updatedAt: new Date().toISOString() };
      saveCompany(next);
      return next;
    });
  }, []);

  const verifyCompany = useCallback(async (name: string, cin: string, gstin: string) => {
    setVerifying(true);
    setVerificationResult(null);
    try {
      const res = await fetch("/api/verify-company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName: name, cin, gstin }),
      });
      const data = await res.json() as VerificationResult & { registeredState?: string; registeredYear?: string };
      setVerificationResult(data);
      setCompanyState(prev => {
        const next = {
          ...prev,
          verificationStatus: data.status,
          verificationNote: data.note,
          verifiedAt: data.status === "verified" ? new Date().toISOString() : prev.verifiedAt,
        };
        saveCompany(next);
        return next;
      });
      return data;
    } catch {
      const fallback: VerificationResult = {
        status: "unverified",
        note: "Verification service unavailable. Please try again later.",
      };
      setVerificationResult(fallback);
      return fallback;
    } finally {
      setVerifying(false);
    }
  }, []);

  const postJob = useCallback((job: Omit<PostedJob, "id" | "postedAt" | "updatedAt" | "applicantCount" | "isApproved">) => {
    const isApproved = company.verificationStatus === "verified";
    const newJob: PostedJob = {
      ...job,
      id: `job_${Date.now()}`,
      applicantCount: 0,
      isApproved,
      postedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPostedJobsState(prev => {
      const next = [newJob, ...prev];
      savePostedJobs(next);
      return next;
    });
    fetch("/api/jobs/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newJob,
        companyName: company.name,
        companyVerificationStatus: company.verificationStatus,
        hrEmail: company.hrEmail,
      }),
    }).catch(() => {});
    return newJob;
  }, [company.verificationStatus, company.name, company.hrEmail]);

  const updateJob = useCallback((id: string, updates: Partial<PostedJob>) => {
    setPostedJobsState(prev => {
      const next = prev.map(j => j.id === id ? { ...j, ...updates, updatedAt: new Date().toISOString() } : j);
      savePostedJobs(next);
      return next;
    });
  }, []);

  const deleteJob = useCallback((id: string) => {
    setPostedJobsState(prev => {
      const next = prev.filter(j => j.id !== id);
      savePostedJobs(next);
      return next;
    });
  }, []);

  return {
    company, updateCompany, verifyCompany, verifying, verificationResult,
    postedJobs, postJob, updateJob, deleteJob,
  };
}
