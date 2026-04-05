import { Link, useLocation } from "wouter";
import { ReactNode, useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession, clearSession } from "@/lib/auth";

export default function MainLayout({ children }: { children: ReactNode }) {
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const session = getSession();

  function handleLogout() {
    clearSession();
    navigate("/login");
  }

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Jobs", path: "/jobs" },
    { label: "Features", path: "/features" },
    { label: "Analytics", path: "/analytics" },
    { label: "About", path: "/about" }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <img src="/logo.png" alt="PlaceX" className="h-8 w-8 object-contain" />
            <span className="text-gradient">PlaceX</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${location === link.path ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Link href={session.role === "student" ? "/dashboard/student" : "/dashboard/employer"}>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="max-w-[120px] truncate">{session.firstName} {session.lastName}</span>
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2" data-testid="btn-logout">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>

          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t p-4 bg-background flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className="text-sm font-medium p-2 hover:bg-muted rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t">
              {session ? (
                <>
                  <Link href={session.role === "student" ? "/dashboard/student" : "/dashboard/employer"}>
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setMobileMenuOpen(false)}>
                      <User className="h-4 w-4" />
                      {session.firstName} {session.lastName}
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                    onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                    data-testid="btn-logout-mobile"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-muted/40 py-12 mt-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-primary mb-4">
              <img src="/logo.png" alt="PlaceX" className="h-7 w-7 object-contain" />
              <span>PlaceX</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting Talent with Opportunity. Aligned with Skill India & Digital India initiatives.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/jobs" className="hover:text-primary">Find Jobs</Link></li>
              <li><Link href="/features" className="hover:text-primary">Features</Link></li>
              <li><Link href="/analytics" className="hover:text-primary">Analytics</Link></li>
              <li><Link href="/government" className="hover:text-primary">Gov Alignment</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Project</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/architecture" className="hover:text-primary">Architecture</Link></li>
              <li><Link href="/technical" className="hover:text-primary">Technical Stack</Link></li>
              <li><Link href="/workflow" className="hover:text-primary">Workflow</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Other</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/demo" className="hover:text-primary">Demo UI</Link></li>
              <li><Link href="/results" className="hover:text-primary">Results</Link></li>
              <li><Link href="/future" className="hover:text-primary">Future Scope</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>© 2024 PlaceX — BCA Final Year Project. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0 font-semibold text-primary">
            <span>Skill India</span>
            <span>Digital India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
