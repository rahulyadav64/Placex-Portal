import { Brain, FileText, LayoutDashboard, Bell, TrendingUp, Users, Zap, Shield, Globe, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Based Job Recommendations",
    description:
      "Our machine learning algorithm analyzes your skills, experience, and preferences to suggest the most relevant job openings, improving match accuracy by 85%.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: FileText,
    title: "Resume Upload & Parsing",
    description:
      "Upload your resume in PDF or DOCX format. Our NLP engine extracts key information automatically and creates a structured digital profile.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: LayoutDashboard,
    title: "Employer Dashboard",
    description:
      "Comprehensive hiring control panel for employers — post jobs, review applications, shortlist candidates, and track hiring funnel metrics in real-time.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Users,
    title: "Candidate Dashboard",
    description:
      "Students get a personalized workspace to manage applications, track interview status, view AI match scores, and discover skill gaps.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    description:
      "Instant alerts for application updates, interview invitations, job matches, and messages from employers via in-app and email notifications.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: TrendingUp,
    title: "Skill Gap Analysis",
    description:
      "Compare your current skills against industry demand. Get actionable recommendations on certifications and courses to close your skill gaps.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Zap,
    title: "Predictive Analytics",
    description:
      "Data-driven insights on hiring trends, salary benchmarks, and demand forecasting to help students make smarter career decisions.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: Shield,
    title: "Secure Data Management",
    description:
      "End-to-end encryption, GDPR-compliant data handling, and role-based access control ensure your personal data is always protected.",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
  {
    icon: Globe,
    title: "Government Portal Integration",
    description:
      "Seamlessly integrated with Skill India NSDC and Digital India frameworks for verified certifications and government-backed job listings.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium">
            <Zap className="h-4 w-4" />
            Platform Features
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Powerful Features for Everyone</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Designed to make placement efficient, transparent, and AI-driven for students, employers, and administrators alike.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 group"
                data-testid={`card-feature-${i}`}
              >
                <div className={`${f.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-5`}>
                  <f.icon className={`h-6 w-6 ${f.color}`} />
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>

          {/* Summary Banner */}
          <div className="mt-16 rounded-3xl bg-gradient-primary p-10 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,white_0%,transparent_60%)]" />
            <h2 className="text-3xl font-bold mb-4 relative z-10">Built for India's Digital Future</h2>
            <p className="text-blue-100 max-w-xl mx-auto mb-8 relative z-10">
              Every feature is designed to align with the vision of Skill India and Digital India — empowering students and transforming hiring.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-8 relative z-10">
              {[
                { label: "AI Match Accuracy", value: "85%" },
                { label: "Avg. Time to Hire", value: "7 Days" },
                { label: "Student Satisfaction", value: "94%" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-extrabold mb-1">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Checklist */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Mobile-first responsive design",
              "Multi-language support (coming soon)",
              "Employer verification and trust badges",
              "Resume score and improvement tips",
              "Campus placement integration",
              "Bulk application tracking",
              "Interview scheduling system",
              "Direct messaging with employers",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 glass-card rounded-xl" data-testid={`item-feature-check-${i}`}>
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
