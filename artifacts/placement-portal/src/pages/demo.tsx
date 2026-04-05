import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase, Users, GraduationCap, Building2, Bell, Star, MapPin,
  CheckCircle2, Clock, Search, Filter, User, BarChart2, Shield
} from "lucide-react";
import { jobs, students, employers } from "@/lib/mock-data";
import { Link } from "wouter";

type View = "student" | "employer" | "admin";

export default function Demo() {
  const [activeView, setActiveView] = useState<View>("student");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium">
            <BarChart2 className="h-4 w-4" />
            Interactive Demo
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">See It in Action</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Explore how PlaceX looks and works for each type of user. Switch between views to see the different experiences.
          </p>
          {/* View Switcher */}
          <div className="inline-flex bg-muted rounded-xl p-1 gap-1">
            {(["student", "employer", "admin"] as View[]).map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all duration-200 ${
                  activeView === view ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`tab-view-${view}`}
              >
                {view === "student" ? "Student View" : view === "employer" ? "Employer View" : "Admin View"}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          {/* Browser Chrome Mockup */}
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
              {/* Browser Bar */}
              <div className="bg-muted/60 px-4 py-3 flex items-center gap-3 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-background rounded-lg px-4 py-1.5 text-xs text-muted-foreground text-center">
                  https://placementportal.in/{activeView === "admin" ? "dashboard/admin" : activeView === "employer" ? "dashboard/employer" : "dashboard/student"}
                </div>
              </div>

              {/* Page Content Mockup */}
              <div className="bg-background min-h-[520px] p-6">
                {activeView === "student" && <StudentViewDemo />}
                {activeView === "employer" && <EmployerViewDemo />}
                {activeView === "admin" && <AdminViewDemo />}
              </div>
            </div>
          </div>

          {/* Job Listings Preview */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Job Listings Interface</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {jobs.slice(0, 4).map((job) => (
                <div key={job.id} className="glass-card rounded-xl p-5 hover:-translate-y-0.5 transition-transform" data-testid={`demo-job-${job.id}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{job.title}</p>
                      <p className="text-sm text-primary">{job.company}</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto text-xs">{job.type}</Badge>
                  </div>
                  <div className="flex gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {job.requiredSkills.slice(0, 2).map(s => (
                      <span key={s} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/jobs">
                <Button className="gap-2" data-testid="btn-view-all-jobs">
                  <Search className="h-4 w-4" /> Browse All Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StudentViewDemo() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-bold">Rahul Sharma</p>
            <p className="text-xs text-muted-foreground">Delhi University • BCA</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">R</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[{ label: "Applied", val: "5" }, { label: "Interviews", val: "2" }, { label: "AI Score", val: "84" }].map((s, i) => (
          <div key={i} className="bg-muted/40 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-primary">{s.val}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold mb-2">Recent Applications</p>
        {[
          { role: "Frontend Developer", company: "TechNova", status: "Interview Scheduled", score: 92 },
          { role: "Data Scientist", company: "Innovate AI", status: "Under Review", score: 78 },
        ].map((app, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl text-sm">
            <div>
              <p className="font-medium">{app.role}</p>
              <p className="text-xs text-muted-foreground">{app.company}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary">{app.score}%</span>
              <Badge variant="secondary" className="text-xs">{app.status}</Badge>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-primary/10 rounded-xl flex items-center gap-3">
        <Star className="h-5 w-5 text-amber-500" />
        <div>
          <p className="text-sm font-semibold">New Match Found!</p>
          <p className="text-xs text-muted-foreground">Cloud Architect at HealthCare — 96% match</p>
        </div>
      </div>
    </div>
  );
}

function EmployerViewDemo() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
            <Building2 className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <p className="font-bold">TechNova Solutions</p>
            <p className="text-xs text-muted-foreground">Anita Verma — HR Manager</p>
          </div>
        </div>
        <Button size="sm" className="gap-1 text-xs">
          <Briefcase className="h-3 w-3" /> Post Job
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[{ label: "Active Jobs", val: "2" }, { label: "Applicants", val: "77" }, { label: "Shortlisted", val: "12" }].map((s, i) => (
          <div key={i} className="bg-muted/40 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-purple-500">{s.val}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold mb-2">Recent Applicants</p>
        {students.slice(0, 3).map((student, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl text-sm">
            <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{student.name}</p>
              <p className="text-xs text-muted-foreground">{student.college}</p>
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{Math.floor(Math.random() * 20) + 75}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminViewDemo() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
            <Shield className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <p className="font-bold">Admin Dashboard</p>
            <p className="text-xs text-muted-foreground">Platform Management — Super Admin</p>
          </div>
        </div>
        <Badge className="bg-green-500/10 text-green-600 border-green-200 border text-xs">All Systems Normal</Badge>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: "Students", val: "15.4K" },
          { label: "Employers", val: "842" },
          { label: "Jobs", val: "5.2K" },
          { label: "Placements", val: "12.4K" },
        ].map((s, i) => (
          <div key={i} className="bg-muted/40 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-primary">{s.val}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">System Health</p>
        {[
          { name: "API Server", val: 99 },
          { name: "Database", val: 98 },
          { name: "AI Matching", val: 97 },
        ].map((svc, i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            <span className="text-xs text-muted-foreground w-28">{svc.name}</span>
            <Progress value={svc.val} className="flex-1 h-2" />
            <span className="text-xs font-semibold text-green-600">{svc.val}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
