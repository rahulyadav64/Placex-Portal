import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { mockAnalytics } from "@/lib/mock-data";
import { TrendingUp, Users, Briefcase, Clock, Award, Target } from "lucide-react";

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

const hiringMetrics = [
  { metric: "Time to Hire", value: "7 Days", change: "-35%", good: true },
  { metric: "Offer Acceptance Rate", value: "87%", change: "+12%", good: true },
  { metric: "Conversion Rate", value: "23%", change: "+8%", good: true },
  { metric: "Cost per Hire", value: "₹12,000", change: "-28%", good: true },
];

const matchScoreData = [
  { range: "90-100%", candidates: 320 },
  { range: "75-89%", candidates: 850 },
  { range: "60-74%", candidates: 1200 },
  { range: "45-59%", candidates: 780 },
  { range: "Below 45%", candidates: 450 },
];

export default function Analytics() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            Data & Analytics
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Platform Insights</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-time analytics powering smarter decisions for students and employers across India.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 space-y-12">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hiringMetrics.map((m, i) => (
              <div key={i} className="glass-card rounded-2xl p-5" data-testid={`card-metric-${i}`}>
                <p className="text-xs text-muted-foreground mb-2">{m.metric}</p>
                <p className="text-2xl font-bold mb-1">{m.value}</p>
                <span className={`text-xs font-semibold ${m.good ? "text-green-500" : "text-red-500"}`}>
                  {m.change} vs last quarter
                </span>
              </div>
            ))}
          </div>

          {/* Placements by Month */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Monthly Placements
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockAnalytics.placementsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    color: "hsl(var(--foreground))",
                  }}
                />
                <Bar dataKey="placements" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Row: Industry distribution + Skill demand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Top Industries
              </h2>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={mockAnalytics.topIndustries}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                    labelLine={true}
                  >
                    {mockAnalytics.topIndustries.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Skill Demand Index
              </h2>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={mockAnalytics.skillDemand} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis dataKey="skill" type="category" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} width={60} />
                  <Tooltip />
                  <Bar dataKey="demand" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Matching Score Distribution */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              AI Match Score Distribution
            </h2>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={matchScoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="range" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    color: "hsl(var(--foreground))",
                  }}
                />
                <Line type="monotone" dataKey="candidates" stroke="#ec4899" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Distribution of AI match scores across all registered candidates
            </p>
          </div>

          {/* Hiring Funnel Table */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Hiring Funnel Overview
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Stage</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Candidates</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Conversion Rate</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Avg. Days</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { stage: "Applications Received", count: "15,420", rate: "100%", days: "—" },
                    { stage: "Profile Screened", count: "8,240", rate: "53%", days: "1.2" },
                    { stage: "Interview Scheduled", count: "3,110", rate: "38%", days: "2.8" },
                    { stage: "Interview Completed", count: "2,540", rate: "82%", days: "3.5" },
                    { stage: "Offer Extended", count: "980", rate: "39%", days: "5.2" },
                    { stage: "Offer Accepted", count: "852", rate: "87%", days: "7.0" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium">{row.stage}</td>
                      <td className="py-3 px-4 text-right text-primary font-semibold">{row.count}</td>
                      <td className="py-3 px-4 text-right text-muted-foreground">{row.rate}</td>
                      <td className="py-3 px-4 text-right text-muted-foreground">{row.days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
