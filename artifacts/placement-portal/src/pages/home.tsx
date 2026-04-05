import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Search, Briefcase, Users, Building, ShieldCheck } from "lucide-react";

export default function Home() {
  const [showJobDropdown, setShowJobDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowJobDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden flex items-center justify-center min-h-[90vh]">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 z-0" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -z-10" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-sm font-medium">Aligned with Skill India & Digital India</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            <span className="text-gradient">PlaceX</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            Connecting Talent with Opportunity. An AI-powered platform bridging the gap between skilled students and leading employers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
            {/* Find Jobs with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 text-lg h-14 px-8"
                data-testid="btn-find-jobs"
                onClick={() => setShowJobDropdown((prev) => !prev)}
              >
                <Search className="h-5 w-5" />
                Find Jobs
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${showJobDropdown ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Button>

              {showJobDropdown && (
                <div
                  className="absolute top-full left-0 sm:left-1/2 sm:-translate-x-1/2 mt-3 w-72 glass-card rounded-2xl shadow-2xl border border-border z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                  data-testid="dropdown-job-type"
                >
                  <p className="px-4 pt-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    Choose Job Type
                  </p>

                  <Link
                    href="/jobs?category=private"
                    onClick={() => setShowJobDropdown(false)}
                  >
                    <div
                      className="flex items-start gap-3 px-4 py-3 hover:bg-primary/5 transition-colors cursor-pointer group"
                      data-testid="option-private-jobs"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm group-hover:text-primary transition-colors">Private Jobs</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">From LinkedIn & official company career pages — TCS, Google, Amazon, Flipkart & more</p>
                      </div>
                    </div>
                  </Link>

                  <div className="mx-4 border-t border-border/50" />

                  <Link
                    href="/jobs?category=government"
                    onClick={() => setShowJobDropdown(false)}
                  >
                    <div
                      className="flex items-start gap-3 px-4 py-3 hover:bg-amber-50 transition-colors cursor-pointer group"
                      data-testid="option-government-jobs"
                    >
                      <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-amber-500/20 transition-colors">
                        <ShieldCheck className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm group-hover:text-amber-700 transition-colors">Government Jobs</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">From official Indian Govt. portals — SSC, UPSC, IBPS, ISRO, DRDO, Railway & more</p>
                      </div>
                    </div>
                  </Link>

                  <div className="p-3 pt-2">
                    <Link href="/jobs" onClick={() => setShowJobDropdown(false)}>
                      <button className="w-full text-xs text-muted-foreground hover:text-primary py-2 transition-colors">
                        Browse all jobs →
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-lg h-14 px-8 bg-background/50 backdrop-blur-sm" data-testid="btn-post-jobs">
                <Briefcase className="h-5 w-5" />
                Post Jobs
              </Button>
            </Link>
          </div>

          {/* Quick category links below the CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5 animate-in fade-in duration-700 delay-700">
            <Link href="/jobs?category=private">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Briefcase className="h-3.5 w-3.5" /> 12 Private Jobs from top companies
              </span>
            </Link>
            <span className="hidden sm:block text-muted-foreground/40">|</span>
            <Link href="/jobs?category=government">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-amber-600 transition-colors cursor-pointer">
                <ShieldCheck className="h-3.5 w-3.5" /> 10 Govt. Jobs from official portals
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">5,000+</h3>
              <p className="text-muted-foreground font-medium">Active Jobs</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">15,000+</h3>
              <p className="text-muted-foreground font-medium">Registered Students</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">800+</h3>
              <p className="text-muted-foreground font-medium">Employer Partners</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">12,000+</h3>
              <p className="text-muted-foreground font-medium">Placements Made</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Type Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Two Pathways to Your Career</h2>
            <p className="text-muted-foreground text-lg">Whether you're aiming for a fast-paced private sector career or the security of a government job, we've got you covered.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Private Jobs Card */}
            <Link href="/jobs?category=private">
              <div className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-primary/30">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Private Jobs</h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Opportunities from India's top tech companies, startups, and MNCs — curated from LinkedIn and official company career portals.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["TCS", "Google", "Amazon", "Infosys", "Flipkart", "Wipro"].map(c => (
                    <span key={c} className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">{c}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  Browse Private Jobs <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Government Jobs Card */}
            <Link href="/jobs?category=government">
              <div className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-amber-400/50">
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-amber-500/20 transition-colors">
                  <ShieldCheck className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-700 transition-colors">Government Jobs</h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Official vacancies from India's premier government organisations — sourced directly from SSC, UPSC, IBPS, ISRO, DRDO, and Railway portals.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["SSC", "UPSC", "IBPS", "ISRO", "DRDO", "Railways"].map(c => (
                    <span key={c} className="text-xs px-2.5 py-1 bg-amber-500/10 text-amber-700 rounded-full font-medium">{c}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm">
                  Browse Govt. Jobs <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
            <p className="text-muted-foreground text-lg">Find the perfect role that matches your skills and career aspirations.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Software Development", count: "1,200+ Jobs", icon: <Briefcase className="h-8 w-8 mb-4 text-blue-500" /> },
              { title: "Data Science & AI", count: "800+ Jobs", icon: <CheckCircle2 className="h-8 w-8 mb-4 text-purple-500" /> },
              { title: "Design & UX", count: "450+ Jobs", icon: <Users className="h-8 w-8 mb-4 text-pink-500" /> },
              { title: "Marketing", count: "600+ Jobs", icon: <Building className="h-8 w-8 mb-4 text-orange-500" /> },
              { title: "Finance & Banking", count: "300+ Jobs", icon: <ShieldCheck className="h-8 w-8 mb-4 text-green-500" /> },
              { title: "Operations", count: "550+ Jobs", icon: <ArrowRight className="h-8 w-8 mb-4 text-indigo-500" /> },
            ].map((cat, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
                {cat.icon}
                <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
                <p className="text-muted-foreground">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to shape your future?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-blue-100">Join thousands of students and employers already using our platform to connect, grow, and succeed.</p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="gap-2 text-lg h-14 px-8" data-testid="btn-get-started-cta">
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
