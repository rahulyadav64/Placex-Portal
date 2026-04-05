import {
  Users, Briefcase, CheckCircle2, TrendingUp, Shield, Activity,
  Building2, GraduationCap, AlertCircle, Settings, BarChart2
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const recentActivity = [
  { id: "act1", event: "New employer registered: HealthTech Pvt Ltd", time: "5 min ago", type: "employer" },
  { id: "act2", event: "500th placement milestone reached!", time: "1 hour ago", type: "milestone" },
  { id: "act3", event: "Student Rahul Sharma accepted offer from TechNova", time: "2 hours ago", type: "placement" },
  { id: "act4", event: "System health check passed — all services nominal", time: "3 hours ago", type: "system" },
  { id: "act5", event: "New job posted: Cloud Architect at HealthCare Systems", time: "4 hours ago", type: "job" },
];

const topEmployers = [
  { name: "TechNova Solutions", hires: 45, industry: "IT" },
  { name: "Innovate AI", hires: 38, industry: "AI" },
  { name: "Global Finance Corp", hires: 32, industry: "Fintech" },
  { name: "EduTech India", hires: 28, industry: "EdTech" },
  { name: "HealthCare Systems", hires: 22, industry: "HealthTech" },
];

const systemServices = [
  { name: "API Server", status: "Operational", uptime: "99.9%" },
  { name: "Database", status: "Operational", uptime: "99.8%" },
  { name: "Job Matching Engine", status: "Operational", uptime: "99.7%" },
  { name: "Notification Service", status: "Degraded", uptime: "97.2%" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="glass-card rounded-2xl p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center">
              <Shield className="h-7 w-7 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-admin-title">Admin Dashboard</h1>
              <p className="text-muted-foreground text-sm">Platform Management • Online Placement Portal</p>
            </div>
          </div>
          <Badge className="bg-green-500/10 text-green-600 border-green-200 border">All Systems Normal</Badge>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Students", value: "15,420", icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-500/10", change: "+8.3%" },
            { label: "Total Employers", value: "842", icon: Building2, color: "text-purple-500", bg: "bg-purple-500/10", change: "+5.1%" },
            { label: "Active Jobs", value: "5,210", icon: Briefcase, color: "text-indigo-500", bg: "bg-indigo-500/10", change: "+12.4%" },
            { label: "Placements", value: "12,380", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10", change: "+18.7%" },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-5" data-testid={`admin-stat-${i}`}>
              <div className={`${stat.bg} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold mb-0.5">{stat.value}</p>
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-xs text-green-600 font-semibold">{stat.change} this month</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Top Employers */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-primary" />
                Top Performing Employers
              </h2>
              <div className="space-y-4">
                {topEmployers.map((emp, i) => (
                  <div key={i} data-testid={`employer-ranking-${i}`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}.</span>
                        <span className="font-medium text-sm">{emp.name}</span>
                        <Badge variant="secondary" className="text-xs">{emp.industry}</Badge>
                      </div>
                      <span className="text-sm font-bold text-primary">{emp.hires} hires</span>
                    </div>
                    <Progress value={(emp.hires / 45) * 100} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Platform Activity
              </h2>
              <div className="space-y-3">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors" data-testid={`activity-${item.id}`}>
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      item.type === "milestone" ? "bg-amber-500" :
                      item.type === "placement" ? "bg-green-500" :
                      item.type === "system" ? "bg-blue-500" :
                      item.type === "employer" ? "bg-purple-500" : "bg-muted-foreground"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.event}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* System Health */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Settings className="h-4 w-4 text-primary" />
                System Health
              </h3>
              <div className="space-y-3">
                {systemServices.map((svc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30" data-testid={`system-service-${i}`}>
                    <div>
                      <p className="text-sm font-medium">{svc.name}</p>
                      <p className="text-xs text-muted-foreground">Uptime: {svc.uptime}</p>
                    </div>
                    <Badge
                      variant={svc.status === "Operational" ? "default" : "secondary"}
                      className={svc.status === "Operational" ? "bg-green-500/10 text-green-600 border-green-200 border" : "bg-amber-500/10 text-amber-600 border-amber-200 border"}
                    >
                      {svc.status === "Operational" ? (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      {svc.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                This Week
              </h3>
              <div className="space-y-3">
                {[
                  { label: "New Registrations", value: "248" },
                  { label: "Jobs Posted", value: "127" },
                  { label: "Applications", value: "1,840" },
                  { label: "Placements Made", value: "89" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0" data-testid={`week-stat-${i}`}>
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="font-bold text-primary">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Govt Compliance */}
            <div className="rounded-2xl bg-gradient-primary p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4" />
                <span className="font-semibold text-sm">Govt. Compliance</span>
              </div>
              <div className="space-y-2 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-300" />
                  Skill India NSDC Aligned
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-300" />
                  Digital India Compliant
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-300" />
                  GDPR Data Protection
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
