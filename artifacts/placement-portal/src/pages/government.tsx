import { Shield, Globe, TrendingUp, Users, CheckCircle2, Award, BookOpen, Wifi } from "lucide-react";

const skillIndiaPoints = [
  "Integrated with NSDC (National Skill Development Corporation) certification framework",
  "Candidates can verify and display NSDC-issued skill certificates on their profiles",
  "Skills aligned with the National Occupational Standards (NOS)",
  "Platform supports Pradhan Mantri Kaushal Vikas Yojana (PMKVY) skill categories",
  "Course recommendations mapped to Sector Skill Councils (SSCs)",
  "Real-time skill demand analytics to guide student upskilling priorities",
];

const digitalIndiaPoints = [
  "Fully cloud-hosted on AWS India region ensuring data sovereignty",
  "Accessible via mobile and low-bandwidth connections for rural reach",
  "Aadhaar-based identity verification integration (optional)",
  "DigiLocker support for storing and sharing educational documents",
  "Supports all 22 official Indian languages (multi-language roadmap)",
  "DPDP Act 2023 compliant — robust data privacy protections",
];

const impactStats = [
  { label: "Students Registered", value: "15,420", icon: Users },
  { label: "Employers Onboarded", value: "842", icon: Award },
  { label: "Placements Made", value: "12,380", icon: CheckCircle2 },
  { label: "States Covered", value: "22", icon: Globe },
];

export default function Government() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium">
            <Shield className="h-4 w-4" />
            Government Alignment
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Supporting India's Digital Mission</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The Online Placement Portal is built in alignment with two of India's flagship government initiatives — Skill India and Digital India.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 space-y-16">
          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {impactStats.map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 text-center" data-testid={`impact-stat-${i}`}>
                <stat.icon className="h-6 w-6 text-primary mx-auto mb-3" />
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Skill India Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Skill India Integration</h2>
                  <p className="text-sm text-muted-foreground">National Skill Development Mission</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Skill India, launched by the Government of India, aims to train over 400 million people in various skills by 2022. Our platform directly supports this vision by bridging the gap between skill development and employment.
              </p>
              <ul className="space-y-3">
                {skillIndiaPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" data-testid={`skill-india-point-${i}`}>
                    <CheckCircle2 className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-amber-500/10 rounded-3xl flex items-center justify-center mx-auto mb-5">
                <BookOpen className="h-10 w-10 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Skill India</h3>
              <p className="text-muted-foreground text-sm mb-4">Kaushal Bharat, Kushal Bharat</p>
              <div className="space-y-2 text-left">
                {[
                  { label: "NSDC Aligned Skills", value: "120+" },
                  { label: "Sector Skill Councils", value: "38" },
                  { label: "Verified Certifications", value: "2,840" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-bold text-amber-600">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Digital India Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 glass-card rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-5">
                <Wifi className="h-10 w-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Digital India</h3>
              <p className="text-muted-foreground text-sm mb-4">Power to Empower</p>
              <div className="space-y-2 text-left">
                {[
                  { label: "Digital Transactions", value: "100%" },
                  { label: "Mobile Accessibility", value: "Full Support" },
                  { label: "Data Centres (India)", value: "3 Regions" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-bold text-blue-600">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Wifi className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Digital India Compliance</h2>
                  <p className="text-sm text-muted-foreground">Digital Transformation Initiative</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Digital India aims to transform India into a digitally empowered society and knowledge economy. Our platform embodies this vision through digital-first design, open APIs, and accessibility for all citizens.
              </p>
              <ul className="space-y-3">
                {digitalIndiaPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" data-testid={`digital-india-point-${i}`}>
                    <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Employment Generation Banner */}
          <div className="rounded-3xl bg-gradient-primary p-10 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_30%,white_0%,transparent_60%)]" />
            <TrendingUp className="h-12 w-12 mx-auto mb-4 relative z-10" />
            <h2 className="text-3xl font-bold mb-4 relative z-10">Contributing to India's Employment Generation</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8 relative z-10">
              By reducing friction in the hiring process and bringing students and employers onto one digital platform, we directly support India's goal of providing quality employment to its growing youth population.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {[
                { value: "35%", label: "Reduction in average time-to-hire" },
                { value: "28%", label: "Lower recruitment cost for employers" },
                { value: "2.4x", label: "More job applications per student" },
              ].map((item, i) => (
                <div key={i} className="text-center" data-testid={`employment-stat-${i}`}>
                  <p className="text-4xl font-extrabold mb-1">{item.value}</p>
                  <p className="text-blue-200 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
