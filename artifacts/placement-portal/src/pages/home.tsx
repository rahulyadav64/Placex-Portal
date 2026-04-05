import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Search, Briefcase, Users, Building, ShieldCheck } from "lucide-react";

export default function Home() {
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
            <span className="text-gradient">Online Placement Portal</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            Connecting Talent with Opportunity. An AI-powered platform bridging the gap between skilled students and leading employers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
            <Link href="/jobs">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-lg h-14 px-8" data-testid="btn-find-jobs">
                <Search className="h-5 w-5" />
                Find Jobs
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-lg h-14 px-8 bg-background/50 backdrop-blur-sm" data-testid="btn-post-jobs">
                <Briefcase className="h-5 w-5" />
                Post Jobs
              </Button>
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

      {/* Featured Categories */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Opportunities by Category</h2>
            <p className="text-muted-foreground text-lg">Find the perfect role that matches your skills and career aspirations.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Software Development", count: "1,200+ Jobs", icon: <Briefcase className="h-8 w-8 mb-4 text-blue-500" /> },
              { title: "Data Science & AI", count: "800+ Jobs", icon: <CheckCircle2 className="h-8 w-8 mb-4 text-purple-500" /> },
              { title: "Design & UX", count: "450+ Jobs", icon: <Users className="h-8 w-8 mb-4 text-pink-500" /> },
              { title: "Marketing", count: "600+ Jobs", icon: <Building className="h-8 w-8 mb-4 text-orange-500" /> },
              { title: "Finance", count: "300+ Jobs", icon: <ShieldCheck className="h-8 w-8 mb-4 text-green-500" /> },
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
