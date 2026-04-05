import { UserPlus, FileText, Cpu, Send, MessageSquare, CheckCircle2, ArrowDown, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "User Registration",
    description: "Students and employers register on the platform. Students provide academic details, skills, and career preferences. Employers provide company information and hiring requirements.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    number: "02",
    icon: FileText,
    title: "Profile Creation & Resume Upload",
    description: "Students upload their resumes in PDF/DOCX format. Our NLP parser automatically extracts skills, experience, and education. Employers fill out company profiles and define job requirements.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    number: "03",
    icon: Cpu,
    title: "AI Job Matching Algorithm",
    description: "Our ML algorithm cross-references student skill profiles with employer job requirements. It calculates a compatibility score using cosine similarity on skill vectors, weighting by demand trends.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    number: "04",
    icon: Send,
    title: "Application & Tracking",
    description: "Students apply to recommended or discovered jobs in one click. Both parties can track application status in real-time across stages: Applied → Reviewed → Shortlisted → Interviewed → Offered.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    number: "05",
    icon: MessageSquare,
    title: "Messaging System",
    description: "Employers and students communicate directly through the encrypted in-platform messaging system. Interview scheduling, follow-ups, and offer negotiations all happen within the portal.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    number: "06",
    icon: BarChart3,
    title: "Analytics & Feedback",
    description: "After each placement, both parties provide feedback. Analytics data is fed back into the AI model for continuous improvement. Skill gap reports are generated for unplaced candidates.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
];

const applicationStages = [
  { label: "Applied", desc: "Student submits application", active: true },
  { label: "Reviewed", desc: "Employer screens profile", active: true },
  { label: "Shortlisted", desc: "AI match score verified", active: true },
  { label: "Interviewed", desc: "Interview conducted", active: false },
  { label: "Offered", desc: "Offer letter issued", active: false },
];

export default function Workflow() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium">
            <CheckCircle2 className="h-4 w-4" />
            Platform Workflow
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">How It Works</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A streamlined, AI-powered process that connects the right talent with the right opportunity — efficiently and transparently.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          {/* Step-by-step flow */}
          <div className="max-w-3xl mx-auto mb-20">
            {steps.map((step, i) => (
              <div key={i} data-testid={`step-${i}`}>
                <div className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 ${step.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <step.icon className={`h-6 w-6 ${step.color}`} />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-0.5 bg-border flex-1 my-3" />
                    )}
                  </div>
                  <div className="pb-10">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-muted-foreground">Step {step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Application Tracking Visual */}
          <div className="glass-card rounded-2xl p-8 max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center">Application Status Tracking</h2>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-2 md:gap-0">
              {applicationStages.map((stage, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center" data-testid={`stage-${i}`}>
                  <div className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl ${stage.active ? "bg-primary/10" : "bg-muted/40"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${stage.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {i + 1}
                    </div>
                    <span className={`text-sm font-semibold ${stage.active ? "text-primary" : "text-muted-foreground"}`}>{stage.label}</span>
                    <span className="text-xs text-muted-foreground text-center max-w-24">{stage.desc}</span>
                  </div>
                  {i < applicationStages.length - 1 && (
                    <div className="hidden md:block w-8 h-0.5 bg-border mx-2" />
                  )}
                  {i < applicationStages.length - 1 && (
                    <ArrowDown className="block md:hidden h-5 w-5 text-muted-foreground my-1" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">Current stage highlighted in blue • All parties notified at each stage change</p>
          </div>

          {/* AI Matching Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-6">
              <Cpu className="h-8 w-8 text-indigo-500 mb-4" />
              <h3 className="text-lg font-bold mb-3">AI Matching Algorithm</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Skill vector extraction from resume using NLP",
                  "Cosine similarity scoring between candidate and job",
                  "Industry trend weighting for in-demand skills",
                  "Location preference and experience level filtering",
                  "Continuous learning from placement outcomes",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <MessageSquare className="h-8 w-8 text-pink-500 mb-4" />
              <h3 className="text-lg font-bold mb-3">Communication Flow</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Encrypted in-app messaging between parties",
                  "Automated notifications at every stage change",
                  "Interview scheduling with calendar integration",
                  "Document sharing for offer letters and contracts",
                  "Rating and feedback after placement completion",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {point}
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
