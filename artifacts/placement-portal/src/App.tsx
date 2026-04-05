import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { loadPostedJobs, loadCompany, savePostedJobs, type PostedJob } from "@/lib/employer-profile";
import { getSession } from "@/lib/auth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Architecture from "@/pages/architecture";
import Technical from "@/pages/technical";
import Workflow from "@/pages/workflow";
import Features from "@/pages/features";
import Analytics from "@/pages/analytics";
import Government from "@/pages/government";
import Demo from "@/pages/demo";
import Results from "@/pages/results";
import Future from "@/pages/future";
import Contact from "@/pages/contact";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Jobs from "@/pages/jobs";
import StudentDashboard from "@/pages/dashboard/student";
import EmployerDashboard from "@/pages/dashboard/employer";
import AdminDashboard from "@/pages/dashboard/admin";
import MainLayout from "@/components/layout/MainLayout";

const queryClient = new QueryClient();

function useStartupJobSync() {
  useEffect(() => {
    const jobs = loadPostedJobs();
    const company = loadCompany();
    if (jobs.length === 0) return;

    Promise.all(
      jobs.map(async (job) => {
        try {
          const res = await fetch("/api/jobs/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...job,
              companyName: company.name,
              companyVerificationStatus: company.verificationStatus,
              hrEmail: company.hrEmail,
            }),
          });
          if (!res.ok) return job;
          const data = await res.json() as { job?: PostedJob };
          if (!data.job) return job;
          // Return the server version — it has the admin-updated isApproved / rejectionReason
          return { ...job, isApproved: data.job.isApproved, status: data.job.status } as PostedJob;
        } catch {
          return job;
        }
      })
    ).then((synced) => {
      // Check if anything changed and persist back to localStorage
      const changed = synced.some((s, i) => s.isApproved !== jobs[i].isApproved || s.status !== jobs[i].status);
      if (changed) {
        savePostedJobs(synced);
        window.dispatchEvent(new CustomEvent("employer-jobs-synced"));
      }
    });
  }, []);
}

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/architecture" component={Architecture} />
        <Route path="/technical" component={Technical} />
        <Route path="/workflow" component={Workflow} />
        <Route path="/features" component={Features} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/government" component={Government} />
        <Route path="/demo" component={Demo} />
        <Route path="/results" component={Results} />
        <Route path="/future" component={Future} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/jobs" component={Jobs} />
        <Route path="/dashboard/student">
          {() => {
            const s = getSession();
            if (!s) return <Redirect to="/login" />;
            if (s.role !== "student") return <Redirect to="/dashboard/employer" />;
            return <StudentDashboard />;
          }}
        </Route>
        <Route path="/dashboard/employer">
          {() => {
            const s = getSession();
            if (!s) return <Redirect to="/login" />;
            if (s.role !== "employer") return <Redirect to="/dashboard/student" />;
            return <EmployerDashboard />;
          }}
        </Route>
        <Route path="/dashboard/admin" component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  useStartupJobSync();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
