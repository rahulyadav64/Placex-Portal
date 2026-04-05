import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Rocket, Lightbulb } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">About the Project</h1>
        <p className="text-xl text-muted-foreground">A BCA final-year project designed to revolutionize the campus placement ecosystem.</p>
      </div>

      <div className="space-y-16">
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Target className="h-8 w-8 text-primary" />
            Problem Statement
          </h2>
          <Card className="glass-card">
            <CardContent className="pt-6 text-lg text-muted-foreground leading-relaxed">
              Traditional recruitment processes in educational institutions are often manual, fragmented, and inefficient. Students struggle to find relevant opportunities that match their specific skill sets, while employers spend excessive time screening mismatched resumes. The lack of a centralized, intelligent platform leads to missed opportunities and suboptimal placement rates.
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Lightbulb className="h-8 w-8 text-primary" />
            The Solution
          </h2>
          <Card className="glass-card border-primary/20">
            <CardContent className="pt-6 text-lg text-muted-foreground leading-relaxed">
              PlaceX is a comprehensive, AI-enhanced platform that automates and optimizes the placement workflow. By leveraging intelligent matching algorithms, we connect students with the right employers based on skills, academic performance, and career interests. The platform serves as a single source of truth for placement cells, students, and recruiters.
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Rocket className="h-8 w-8 text-primary" />
            Platform Objectives
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Streamline the registration and resume building process",
              "Provide AI-driven job recommendations",
              "Enable seamless application tracking for students",
              "Offer comprehensive analytics for placement cells",
              "Align with Skill India initiatives for skill mapping",
              "Reduce time-to-hire for employer partners"
            ].map((obj, i) => (
              <Card key={i} className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">
                      {i + 1}
                    </span>
                    Objective {i + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{obj}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Project Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Sharma", role: "Full Stack Developer", reg: "BCA2024-001" },
              { name: "Priya Patel", role: "UI/UX & Frontend", reg: "BCA2024-002" },
              { name: "Amit Kumar", role: "Database & Backend", reg: "BCA2024-003" }
            ].map((member, i) => (
              <Card key={i} className="text-center glass-card hover:-translate-y-1 transition-transform duration-300">
                <CardHeader>
                  <div className="mx-auto w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Reg No: {member.reg}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
