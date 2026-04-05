import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase, Bell, TrendingUp, Upload, CheckCircle2, Clock, XCircle,
  CalendarCheck, Star, ChevronRight, User, GraduationCap, Target
} from "lucide-react";
import { jobs } from "@/lib/mock-data";

const applications = [
  { id: "a1", jobTitle: "Frontend Developer", company: "TechNova Solutions", status: "Interview Scheduled", date: "2024-01-15", matchScore: 92 },
  { id: "a2", jobTitle: "Data Scientist", company: "Innovate AI", status: "Under Review", date: "2024-01-12", matchScore: 78 },
  { id: "a3", jobTitle: "UI/UX Designer", company: "EduTech India", status: "Applied", date: "2024-01-10", matchScore: 85 },
  { id: "a4", jobTitle: "Backend Engineer", company: "Global Finance Corp", status: "Rejected", date: "2024-01-05", matchScore: 55 },
  { id: "a5", jobTitle: "Cloud Architect", company: "HealthCare Systems", status: "Offered", date: "2024-01-01", matchScore: 96 },
];

const notifications = [
  { id: "n1", message: "Interview scheduled with TechNova Solutions on Jan 20", time: "2 hours ago", type: "info" },
  { id: "n2", message: "New job match: Product Manager at Innovate AI (92% match)", time: "1 day ago", type: "success" },
  { id: "n3", message: "Your application at EduTech India is under review", time: "2 days ago", type: "info" },
];

const skills = [
  { name: "React", level: 85, demand: 95 },
  { name: "TypeScript", level: 70, demand: 88 },
  { name: "Node.js", level: 60, demand: 75 },
  { name: "Python", level: 50, demand: 90 },
  { name: "AWS", level: 30, demand: 80 },
];

const statusConfig: Record<string, { color: string; icon: React.FC<{ className?: string }> }> = {
  "Applied": { color: "bg-blue-500/10 text-blue-600 border-blue-200", icon: Clock },
  "Under Review": { color: "bg-amber-500/10 text-amber-600 border-amber-200", icon: Clock },
  "Interview Scheduled": { color: "bg-purple-500/10 text-purple-600 border-purple-200", icon: CalendarCheck },
  "Rejected": { color: "bg-red-500/10 text-red-600 border-red-200", icon: XCircle },
  "Offered": { color: "bg-green-500/10 text-green-600 border-green-200", icon: CheckCircle2 },
};

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<"applications" | "recommended" | "skills">("applications");

  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="glass-card rounded-2xl p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-student-name">Welcome, Rahul Sharma</h1>
              <p className="text-muted-foreground text-sm">BCA Final Year — Delhi University</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="h-4 w-4" /> Upload Resume
            </Button>
            <Button size="sm" className="gap-2">
              <User className="h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Applications", value: "5", icon: Briefcase, color: "text-blue-500" },
                { label: "Interviews", value: "2", icon: CalendarCheck, color: "text-purple-500" },
                { label: "Offers", value: "1", icon: CheckCircle2, color: "text-green-500" },
                { label: "Avg. Match", value: "81%", icon: Target, color: "text-amber-500" },
              ].map((stat, i) => (
                <div key={i} className="glass-card rounded-2xl p-4 text-center" data-testid={`stat-${i}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="flex border-b border-border">
                {(["applications", "recommended", "skills"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3.5 text-sm font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? "bg-primary/5 text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid={`tab-${tab}`}
                  >
                    {tab === "applications" ? "My Applications" : tab === "recommended" ? "Recommended Jobs" : "Skill Gap"}
                  </button>
                ))}
              </div>

              <div className="p-4 space-y-3">
                {activeTab === "applications" && applications.map((app) => {
                  const cfg = statusConfig[app.status];
                  const StatusIcon = cfg.icon;
                  return (
                    <div key={app.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors" data-testid={`application-${app.id}`}>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{app.jobTitle}</p>
                        <p className="text-sm text-muted-foreground">{app.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-primary">{app.matchScore}% match</span>
                        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {app.status}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {activeTab === "recommended" && jobs.slice(0, 5).map((job) => (
                  <div key={job.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors" data-testid={`recommended-${job.id}`}>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{job.title}</p>
                      <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                      <div className="flex gap-1.5 mt-1.5">
                        {job.requiredSkills.slice(0, 2).map(s => (
                          <span key={s} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{Math.floor(Math.random() * 20) + 75}% match</span>
                      <Link href="/jobs">
                        <Button size="sm" variant="outline" className="text-xs gap-1">
                          Apply <ChevronRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}

                {activeTab === "skills" && (
                  <div className="space-y-4 p-2">
                    {skills.map((skill) => (
                      <div key={skill.name} data-testid={`skill-${skill.name}`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">{skill.name}</span>
                          <div className="flex gap-3 text-xs text-muted-foreground">
                            <span>Your level: <span className="text-primary font-semibold">{skill.level}%</span></span>
                            <span>Market demand: <span className="text-amber-600 font-semibold">{skill.demand}%</span></span>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-20">Your level</span>
                            <Progress value={skill.level} className="flex-1 h-2" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-20">Demand</span>
                            <Progress value={skill.demand} className="flex-1 h-2 [&>div]:bg-amber-500" />
                          </div>
                        </div>
                        {skill.demand - skill.level > 15 && (
                          <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> Gap of {skill.demand - skill.level}% — consider upskilling
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Profile Completion
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl font-bold text-primary" data-testid="text-profile-completion">72%</span>
                <span className="text-sm text-muted-foreground">Complete your profile to improve job matches</span>
              </div>
              <Progress value={72} className="h-2.5 mb-4" />
              <div className="space-y-2">
                {[
                  { task: "Add profile photo", done: true },
                  { task: "Upload resume", done: true },
                  { task: "Add work experience", done: false },
                  { task: "Add certifications", done: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className={`h-4 w-4 ${item.done ? "text-green-500" : "text-muted-foreground/30"}`} />
                    <span className={item.done ? "line-through text-muted-foreground" : ""}>{item.task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                Notifications
              </h3>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl bg-muted/50 text-sm" data-testid={`notification-${n.id}`}>
                    <p className="font-medium mb-0.5">{n.message}</p>
                    <p className="text-xs text-muted-foreground">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Score Widget */}
            <div className="rounded-2xl bg-gradient-primary p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4" />
                <span className="font-semibold text-sm">AI Placement Score</span>
              </div>
              <div className="text-5xl font-extrabold mb-2" data-testid="text-ai-score">84</div>
              <p className="text-blue-100 text-sm">Your profile is strong! Top 15% among peers. Add AWS certification to boost score to 91.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
