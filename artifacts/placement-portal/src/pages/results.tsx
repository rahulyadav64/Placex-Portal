import { TrendingDown, TrendingUp, Users, Clock, Award, CheckCircle2, BarChart3, Target } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const beforeAfterData = [
  { metric: "Time to Hire (days)", before: 45, after: 7 },
  { metric: "Cost per Hire (₹K)", before: 50, after: 12 },
  { metric: "Application Processing (days)", before: 14, after: 2 },
  { metric: "Offer Acceptance Rate (%)", before: 62, after: 87 },
];

const conclusions = [
  "The AI-powered matching system reduced recruiter manual screening time by over 70%",
  "Students from Tier 2 and Tier 3 colleges now have equal access to top employers",
  "The skill gap analysis feature has helped 3,200+ students pursue targeted certifications",
  "Real-time notifications improved candidate engagement and response rates by 45%",
  "Digital India alignment enabled onboarding from 22 Indian states within 6 months",
  "Resume parsing accuracy of 94% significantly reduces data entry errors",
];

export default function Results() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium">
            <Award className="h-4 w-4" />
            Results & Conclusion
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Measurable Impact</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            PlaceX has delivered significant, measurable improvements in hiring efficiency, cost reduction, and candidate satisfaction.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 space-y-12">
          {/* Key Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Faster Hiring", value: "84%", desc: "Reduction in time-to-hire", icon: TrendingDown, good: true },
              { label: "Cost Savings", value: "76%", desc: "Lower recruitment cost", icon: TrendingDown, good: true },
              { label: "Match Accuracy", value: "91%", desc: "AI matching precision", icon: Target, good: true },
              { label: "Satisfaction Rate", value: "94%", desc: "Employer & student rating", icon: Award, good: true },
            ].map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 text-center" data-testid={`result-stat-${i}`}>
                <stat.icon className={`h-6 w-6 mx-auto mb-3 ${stat.good ? "text-green-500" : "text-red-500"}`} />
                <p className="text-3xl font-extrabold text-primary mb-1">{stat.value}</p>
                <p className="text-sm font-semibold mb-1">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Before vs After Chart */}
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              Before vs After: Key Metrics Comparison
            </h2>
            <p className="text-muted-foreground text-sm mb-8">Comparison of traditional hiring vs PlaceX</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={beforeAfterData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis dataKey="metric" type="category" width={180} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    color: "hsl(var(--foreground))",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="before" fill="#f87171" radius={[0, 4, 4, 0]} name="Before" />
                <Bar dataKey="after" fill="#6366f1" radius={[0, 4, 4, 0]} name="After" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-6 justify-center mt-4">
              <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded bg-red-400" /> Before Portal</div>
              <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded bg-indigo-500" /> After Portal</div>
            </div>
          </div>

          {/* Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                color: "text-blue-500",
                bg: "bg-blue-500/10",
                title: "Improved Hiring Efficiency",
                points: [
                  "Average time-to-hire reduced from 45 to 7 days",
                  "Automated screening saves 8+ recruiter-hours per hire",
                  "Real-time tracking eliminates status follow-up calls",
                  "Bulk applicant review with AI scoring reduces effort by 70%",
                ],
              },
              {
                icon: TrendingDown,
                color: "text-green-500",
                bg: "bg-green-500/10",
                title: "Reduced Recruitment Cost",
                points: [
                  "Cost per hire down from ₹50,000 to ₹12,000",
                  "No external job board fees (platform self-service)",
                  "Automated shortlisting reduces agency dependency",
                  "Digital document handling eliminates paper costs",
                ],
              },
              {
                icon: Users,
                color: "text-purple-500",
                bg: "bg-purple-500/10",
                title: "Better Candidate-Job Matching",
                points: [
                  "91% AI match accuracy vs. 58% traditional methods",
                  "Offer acceptance rate increased to 87%",
                  "First-year attrition down 32% for matched placements",
                  "Inclusive access for Tier 2 and Tier 3 college students",
                ],
              },
            ].map((card, i) => (
              <div key={i} className="glass-card rounded-2xl p-6" data-testid={`outcome-card-${i}`}>
                <div className={`${card.bg} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
                <h3 className="text-lg font-bold mb-4">{card.title}</h3>
                <ul className="space-y-2.5">
                  {card.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className={`h-4 w-4 ${card.color} mt-0.5 flex-shrink-0`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Conclusion Banner */}
          <div className="rounded-3xl bg-gradient-primary p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_80%,white_0%,transparent_60%)]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <TrendingUp className="h-10 w-10 mb-4 mx-auto" />
              <h2 className="text-3xl font-bold mb-6 text-center">Conclusion & Key Learnings</h2>
              <ul className="space-y-3">
                {conclusions.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-blue-100 text-sm" data-testid={`conclusion-${i}`}>
                    <CheckCircle2 className="h-4 w-4 text-green-300 flex-shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
