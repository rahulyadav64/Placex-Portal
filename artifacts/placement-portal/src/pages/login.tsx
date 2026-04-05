import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Briefcase, GraduationCap, Building2, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function Login() {
  const [role, setRole] = useState<"student" | "employer">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-primary opacity-5 z-0" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -z-10" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary mb-4">
            <Briefcase className="h-7 w-7" />
            <span className="text-gradient">Placement Portal</span>
          </Link>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-1">Sign in to your account to continue</p>
        </div>

        <div className="glass-card rounded-2xl p-8 shadow-xl">
          {/* Role Selector */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setRole("student")}
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
              onClick={() => setRole("employer")}
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

          <div className="space-y-4">
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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" data-testid="checkbox-remember" />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
            </div>

            <Link href={role === "student" ? "/dashboard/student" : "/dashboard/employer"}>
              <Button className="w-full mt-2" data-testid="btn-login-submit">
                Sign In as {role === "student" ? "Student" : "Employer"}
              </Button>
            </Link>
          </div>

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
