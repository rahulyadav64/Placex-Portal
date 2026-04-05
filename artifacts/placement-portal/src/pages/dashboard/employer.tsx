import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase, Bell, Users, CheckCircle2, Clock, XCircle,
  Plus, Building2, TrendingUp, ChevronRight, Eye, Mail
} from "lucide-react";
import { Link } from "wouter";

const postedJobs = [
  { id: "j1", title: "Frontend Developer", applicants: 45, reviewed: 18, status: "Active" },
  { id: "j2", title: "DevOps Engineer", applicants: 32, reviewed: 12, status: "Active" },
  { id: "j3", title: "Product Manager", applicants: 67, reviewed: 40, status: "Closed" },
];

const recentApplicants = [
  { id: "a1", name: "Rahul Sharma", role: "Frontend Developer", college: "Delhi University", matchScore: 92, status: "Interview Scheduled" },
  { id: "a2", name: "Priya Patel", role: "Frontend Developer", college: "IIT Bombay", matchScore: 88, status: "Under Review" },
  { id: "a3", name: "Vikram Singh", role: "DevOps Engineer", college: "BITS Pilani", matchScore: 95, status: "Shortlisted" },
  { id: "a4", name: "Sneha Reddy", role: "DevOps Engineer", college: "NID Bangalore", matchScore: 71, status: "Applied" },
];

const notifications = [
  { id: "n1", message: "45 new applications for Frontend Developer role", time: "1 hour ago" },
  { id: "n2", message: "Interview with Rahul Sharma confirmed for Jan 20", time: "3 hours ago" },
  { id: "n3", message: "Product Manager job posting reached 100+ views", time: "1 day ago" },
];

const statusConfig: Record<string, string> = {
  "Applied": "bg-blue-500/10 text-blue-600 border-blue-200",
  "Under Review": "bg-amber-500/10 text-amber-600 border-amber-200",
  "Shortlisted": "bg-purple-500/10 text-purple-600 border-purple-200",
  "Interview Scheduled": "bg-indigo-500/10 text-indigo-600 border-indigo-200",
  "Rejected": "bg-red-500/10 text-red-600 border-red-200",
  "Offered": "bg-green-500/10 text-green-600 border-green-200",
};

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState<"jobs" | "applicants">("jobs");

  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="glass-card rounded-2xl p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Building2 className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-company-name">TechNova Solutions</h1>
              <p className="text-muted-foreground text-sm">IT Services • Bangalore • HR: Anita Verma</p>
            </div>
          </div>
          <Link href="/jobs">
            <Button className="gap-2" data-testid="btn-post-job">
              <Plus className="h-4 w-4" /> Post a New Job
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Active Jobs", value: "2", icon: Briefcase, color: "text-blue-500" },
                { label: "Total Applicants", value: "144", icon: Users, color: "text-purple-500" },
                { label: "Shortlisted", value: "30", icon: CheckCircle2, color: "text-green-500" },
                { label: "Avg. Match Score", value: "87%", icon: TrendingUp, color: "text-amber-500" },
              ].map((stat, i) => (
                <div key={i} className="glass-card rounded-2xl p-4 text-center" data-testid={`employer-stat-${i}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="flex border-b border-border">
                {(["jobs", "applicants"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3.5 text-sm font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? "bg-primary/5 text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid={`tab-employer-${tab}`}
                  >
                    {tab === "jobs" ? "Posted Jobs" : "Recent Applicants"}
                  </button>
                ))}
              </div>

              <div className="p-4 space-y-3">
                {activeTab === "jobs" && postedJobs.map((job) => (
                  <div key={job.id} className="p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors" data-testid={`posted-job-${job.id}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold">{job.title}</p>
                        <p className="text-sm text-muted-foreground">{job.applicants} applicants • {job.reviewed} reviewed</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={job.status === "Active" ? "default" : "secondary"}>{job.status}</Badge>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Eye className="h-3.5 w-3.5" /> View
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Review progress</span>
                        <span>{Math.round((job.reviewed / job.applicants) * 100)}%</span>
                      </div>
                      <Progress value={(job.reviewed / job.applicants) * 100} className="h-1.5" />
                    </div>
                  </div>
                ))}

                {activeTab === "applicants" && recentApplicants.map((app) => (
                  <div key={app.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors" data-testid={`applicant-${app.id}`}>
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{app.name}</p>
                      <p className="text-sm text-muted-foreground">{app.role} • {app.college}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-bold text-primary">{app.matchScore}%</span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[app.status] || ""}`}>
                        {app.status}
                      </span>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Mail className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Hiring Funnel */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Hiring Funnel
              </h3>
              {[
                { stage: "Applications", count: 144, percent: 100 },
                { stage: "Reviewed", count: 70, percent: 49 },
                { stage: "Shortlisted", count: 30, percent: 21 },
                { stage: "Interviews", count: 12, percent: 8 },
                { stage: "Offered", count: 4, percent: 3 },
              ].map((row, i) => (
                <div key={i} className="mb-3" data-testid={`funnel-${i}`}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{row.stage}</span>
                    <span className="font-semibold text-primary">{row.count}</span>
                  </div>
                  <Progress value={row.percent} className="h-2" />
                </div>
              ))}
            </div>

            {/* Notifications */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                Notifications
              </h3>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl bg-muted/50 text-sm" data-testid={`employer-notification-${n.id}`}>
                    <p className="font-medium mb-0.5">{n.message}</p>
                    <p className="text-xs text-muted-foreground">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "Post a New Job", icon: Plus },
                  { label: "View All Applicants", icon: Users },
                  { label: "Company Profile", icon: Building2 },
                  { label: "Scheduled Interviews", icon: Clock },
                ].map((action, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium hover:bg-muted/60 transition-colors text-left" data-testid={`quick-action-${i}`}>
                    <div className="flex items-center gap-2">
                      <action.icon className="h-4 w-4 text-primary" />
                      {action.label}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
