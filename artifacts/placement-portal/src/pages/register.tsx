import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Briefcase, GraduationCap, Building2, ShieldCheck } from "lucide-react";

export default function Register() {
  const [role, setRole] = useState<"student" | "employer">("student");

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-primary opacity-5 z-0" />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10" />

      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary mb-4">
            <Briefcase className="h-7 w-7" />
            <span className="text-gradient">Placement Portal</span>
          </Link>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground mt-1">Join thousands of students and employers on the platform</p>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fname">First Name</Label>
                <Input id="fname" placeholder="Rahul" className="mt-1.5" data-testid="input-first-name" />
              </div>
              <div>
                <Label htmlFor="lname">Last Name</Label>
                <Input id="lname" placeholder="Sharma" className="mt-1.5" data-testid="input-last-name" />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@email.com" className="mt-1.5" data-testid="input-email" />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create a strong password" className="mt-1.5" data-testid="input-password" />
            </div>

            {role === "student" && (
              <>
                <div>
                  <Label htmlFor="college">College / University</Label>
                  <Input id="college" placeholder="e.g. Delhi University" className="mt-1.5" data-testid="input-college" />
                </div>
                <div>
                  <Label htmlFor="course">Course / Degree</Label>
                  <Input id="course" placeholder="e.g. BCA, B.Tech" className="mt-1.5" data-testid="input-course" />
                </div>
              </>
            )}

            {role === "employer" && (
              <>
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="e.g. TechNova Solutions" className="mt-1.5" data-testid="input-company" />
                </div>
                <div>
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" placeholder="e.g. HR Manager" className="mt-1.5" data-testid="input-designation" />
                </div>
              </>
            )}

            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="mt-0.5" data-testid="checkbox-terms" />
              <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </Label>
            </div>

            <Link href={role === "student" ? "/dashboard/student" : "/dashboard/employer"}>
              <Button className="w-full" data-testid="btn-register-submit">
                Create {role === "student" ? "Student" : "Employer"} Account
              </Button>
            </Link>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
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
