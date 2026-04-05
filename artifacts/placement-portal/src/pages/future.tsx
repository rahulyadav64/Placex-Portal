import { Globe, Languages, Brain, Video, Smartphone, BarChart2, Shield, Zap, CheckCircle2, ArrowRight, Clock } from "lucide-react";

const roadmapItems = [
  {
    phase: "Phase 2",
    period: "Q3 2024 — Q4 2024",
    color: "border-blue-500 bg-blue-500/5",
    badge: "bg-blue-500/10 text-blue-600",
    items: [
      { title: "Multi-language Support", icon: Languages, desc: "Full support for Hindi, Tamil, Telugu, Bengali, and 18 other Indian official languages." },
      { title: "Mobile App (Android & iOS)", icon: Smartphone, desc: "Native mobile applications for both students and employers with offline support." },
    ],
  },
  {
    phase: "Phase 3",
    period: "Q1 2025 — Q2 2025",
    color: "border-purple-500 bg-purple-500/5",
    badge: "bg-purple-500/10 text-purple-600",
    items: [
      { title: "Virtual Interview Platform", icon: Video, desc: "Integrated video interview scheduling with AI proctoring and instant feedback." },
      { title: "Advanced AI Model V2", icon: Brain, desc: "Transformer-based candidate-job matching with improved context understanding and bias reduction." },
    ],
  },
  {
    phase: "Phase 4",
    period: "Q3 2025 — Q4 2025",
    color: "border-green-500 bg-green-500/5",
    badge: "bg-green-500/10 text-green-600",
    items: [
      { title: "Global Expansion", icon: Globe, desc: "Extend platform to Southeast Asia (Singapore, Malaysia, UAE) — serving Indian diaspora employers." },
      { title: "Predictive Career Analytics", icon: BarChart2, desc: "5-year career trajectory predictions, salary forecasting, and industry demand modeling." },
    ],
  },
  {
    phase: "Phase 5",
    period: "2026 and beyond",
    color: "border-amber-500 bg-amber-500/5",
    badge: "bg-amber-500/10 text-amber-600",
    items: [
      { title: "Blockchain Credentials", icon: Shield, desc: "Tamper-proof, blockchain-verified academic certificates and work history." },
      { title: "AI Career Coach", icon: Zap, desc: "Personalized AI chatbot coach for resume building, interview prep, and career advice." },
    ],
  },
];

export default function Future() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium">
            <ArrowRight className="h-4 w-4" />
            Future Scope
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">What's Coming Next</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our product roadmap for the next 24 months — expanding reach, enhancing intelligence, and deepening impact.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 space-y-10">
          {/* Roadmap Timeline */}
          {roadmapItems.map((phase, pi) => (
            <div key={pi} className={`rounded-2xl border-l-4 p-6 ${phase.color}`} data-testid={`phase-${pi}`}>
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold w-fit ${phase.badge}`}>
                  <Clock className="h-3.5 w-3.5" />
                  {phase.phase}
                </span>
                <span className="text-sm text-muted-foreground">{phase.period}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phase.items.map((item, ii) => (
                  <div key={ii} className="glass-card rounded-xl p-5" data-testid={`roadmap-item-${pi}-${ii}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-bold">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* AI Improvements Detail */}
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              AI Improvement Roadmap
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "LLM Resume Parser", desc: "Replace rule-based NLP with LLM-powered extraction for 98%+ accuracy." },
                { title: "Bias Detection Layer", desc: "Monitor and mitigate gender, college-tier, and location bias in AI scoring." },
                { title: "Contextual Matching", desc: "Understand context beyond keywords — project experience, soft skills, culture fit." },
                { title: "Salary Prediction", desc: "Real-time salary range predictions based on skills, location, and industry demand." },
                { title: "Interview Prep Bot", desc: "AI chatbot simulates technical and HR interviews based on applied job descriptions." },
                { title: "Continuous Learning", desc: "Model retrains monthly on actual placement outcomes for ongoing accuracy improvement." },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors" data-testid={`ai-improvement-${i}`}>
                  <p className="font-semibold text-sm mb-2">{item.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Global Vision Banner */}
          <div className="rounded-3xl bg-gradient-primary p-10 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_20%,white_0%,transparent_60%)]" />
            <Globe className="h-12 w-12 mx-auto mb-4 relative z-10" />
            <h2 className="text-3xl font-bold mb-4 relative z-10">Vision 2030: Global Placement Hub</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8 relative z-10">
              By 2030, we aim to be the largest AI-powered placement platform in South Asia — serving 1 million students and 50,000 employers across 10 countries, while remaining deeply aligned with India's national employment mission.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              {[
                { value: "1M+", label: "Students" },
                { value: "50K+", label: "Employers" },
                { value: "10", label: "Countries" },
                { value: "22", label: "Languages" },
              ].map((stat, i) => (
                <div key={i} data-testid={`vision-stat-${i}`}>
                  <p className="text-3xl font-extrabold">{stat.value}</p>
                  <p className="text-blue-200 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
