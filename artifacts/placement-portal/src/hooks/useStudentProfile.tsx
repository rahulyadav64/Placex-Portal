import { useState, useEffect, useCallback } from "react";
import {
  type StudentProfile,
  type Application,
  loadProfile,
  saveProfile,
  loadApplications,
  saveApplications,
} from "@/lib/student-profile";

export function useStudentProfile() {
  const [profile, setProfileState] = useState<StudentProfile>(loadProfile);
  const [applications, setApplicationsState] = useState<Application[]>(loadApplications);

  const updateProfile = useCallback((updates: Partial<StudentProfile>) => {
    setProfileState(prev => {
      const next = { ...prev, ...updates, updatedAt: new Date().toISOString() };
      saveProfile(next);
      return next;
    });
  }, []);

  const addApplication = useCallback((app: Omit<Application, "id" | "appliedAt">) => {
    setApplicationsState(prev => {
      if (prev.find(a => a.jobId === app.jobId)) return prev;
      const next = [
        { ...app, id: `app_${Date.now()}`, appliedAt: new Date().toISOString(), status: "Applied" as const },
        ...prev,
      ];
      saveApplications(next);
      return next;
    });
  }, []);

  const updateApplicationStatus = useCallback((id: string, status: Application["status"]) => {
    setApplicationsState(prev => {
      const next = prev.map(a => a.id === id ? { ...a, status } : a);
      saveApplications(next);
      return next;
    });
  }, []);

  const isApplied = useCallback((jobId: string) => {
    return applications.some(a => a.jobId === jobId);
  }, [applications]);

  useEffect(() => {
    const handleStorage = () => {
      setProfileState(loadProfile());
      setApplicationsState(loadApplications());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return { profile, updateProfile, applications, addApplication, updateApplicationStatus, isApplied };
}
