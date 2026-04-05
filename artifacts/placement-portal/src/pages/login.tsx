import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, GraduationCap, Building2, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";
import { login } from "@/lib/auth";

export default function Login() {
  const [, navigate] = useLocation();
  const [role, setRole] = useState<"student" | "employer">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!password) { setError("Please enter your password."); return; }

    setLoading(true);
    const result = login(email.trim(), password);
    setLoading(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }

    if (result.session.role !== role) {
      setError(`This account is registered as a ${result.session.role}. Please select the correct role.`);
      return;
    }

    navigate(role === "student" ? "/dashboard/student" : "/dashboard/employer");
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-primary opacity-5 z-0" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -z-10" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary mb-4">
            <Briefcase className="h-7 w-7" />
            <span className="text-gradient">PlaceX</span>
          </Link>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-1">Sign in to your account to continue</p>
        </div>

        <div className="glass-card rounded-2xl p-8 shadow-xl">
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => { setRole("student"); setError(""); }}
              className={`flex-1 flex items-center gap-2 justify-center p-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 ${
                role === "student"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
              data-testid="btn-role-student"
            >
              <GraduationCap className="h-4 w-4" />
              Student
            </button>
            <button
              type="button"
              onClick={() => { setRole("employer"); setError(""); }}
              className={`flex-1 flex items-center gap-2 justify-center p-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 ${
                role === "employer"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
              data-testid="btn-role-employer"
            >
              <Building2 className="h-4 w-4" />
              Employer
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder={role === "student" ? "student@college.edu" : "hr@company.com"}
                className="mt-1.5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="input-email"
                autoComplete="email"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="input-password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  data-testid="btn-toggle-password"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-2"
              disabled={loading}
              data-testid="btn-login-submit"
            >
              {loading ? "Signing in..." : `Sign In as ${role === "student" ? "Student" : "Employer"}`}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary font-medium hover:underline">Create account</Link>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
          Secured with 256-bit encryption. Aligned with Digital India standards.
        </div>
      </div>
    </div>
  );
}
