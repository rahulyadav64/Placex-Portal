import { Code2, Database, Server, GitBranch, Shield, Cpu, CheckCircle2, Layers } from "lucide-react";

const techStack = [
  {
    category: "Frontend",
    icon: Code2,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    items: [
      { name: "HTML5 / CSS3", purpose: "Semantic markup and responsive styling" },
      { name: "JavaScript (ES2022+)", purpose: "Dynamic behavior and interactivity" },
      { name: "React.js", purpose: "Component-based SPA architecture" },
      { name: "Tailwind CSS", purpose: "Utility-first CSS framework" },
      { name: "Lucide React", purpose: "Icon library" },
      { name: "Recharts", purpose: "Data visualization charts" },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    items: [
      { name: "Python 3.11+", purpose: "Core backend language" },
      { name: "Flask 3.x", purpose: "Lightweight web framework" },
      { name: "SQLAlchemy ORM", purpose: "Database abstraction layer" },
      { name: "Flask-JWT-Extended", purpose: "Token-based authentication" },
      { name: "scikit-learn", purpose: "AI/ML job matching algorithm" },
      { name: "spaCy NLP", purpose: "Resume parsing and skill extraction" },
    ],
  },
  {
    category: "Database",
    icon: Database,
    color: "text-green-500",
    bg: "bg-green-500/10",
    items: [
      { name: "MySQL 8.x", purpose: "Primary relational database" },
      { name: "Redis", purpose: "Session caching and queues" },
      { name: "Elasticsearch", purpose: "Full-text job search engine" },
    ],
  },
  {
    category: "DevOps & CI/CD",
    icon: GitBranch,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    items: [
      { name: "GitHub Actions", purpose: "Automated CI/CD pipeline" },
      { name: "Docker", purpose: "Containerization of services" },
      { name: "AWS EC2 + S3", purpose: "Cloud hosting and storage" },
      { name: "Nginx", purpose: "Reverse proxy and load balancer" },
    ],
  },
];

const dbSchema = [
  { table: "users", columns: ["id", "name", "email", "password_hash", "role", "created_at"] },
  { table: "students", columns: ["id", "user_id", "college", "course", "gpa", "skills_json", "resume_url"] },
  { table: "employers", columns: ["id", "user_id", "company_name", "industry", "location", "size"] },
  { table: "jobs", columns: ["id", "employer_id", "title", "description", "required_skills", "salary_range", "type", "status"] },
  { table: "applications", columns: ["id", "student_id", "job_id", "status", "match_score", "applied_at"] },
  { table: "messages", columns: ["id", "sender_id", "receiver_id", "content", "sent_at"] },
];

export default function Technical() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium">
            <Code2 className="h-4 w-4" />
            Technical Implementation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Under the Hood</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A deep dive into the technologies, architecture decisions, and implementation details powering PlaceX.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 space-y-12">
          {/* Tech Stack Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techStack.map((stack, i) => (
              <div key={i} className="glass-card rounded-2xl p-6" data-testid={`tech-stack-${i}`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`${stack.bg} w-10 h-10 rounded-xl flex items-center justify-center`}>
                    <stack.icon className={`h-5 w-5 ${stack.color}`} />
                  </div>
                  <h3 className="text-lg font-bold">{stack.category}</h3>
                </div>
                <div className="space-y-3">
                  {stack.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className={`h-4 w-4 ${stack.color} mt-0.5 flex-shrink-0`} />
                      <div>
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-muted-foreground"> — {item.purpose}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CI/CD Pipeline */}
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <GitBranch className="h-6 w-6 text-primary" />
              CI/CD Pipeline
            </h2>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 overflow-x-auto pb-2">
              {[
                { label: "Code Push", sub: "GitHub", color: "bg-slate-500" },
                { label: "Run Tests", sub: "pytest", color: "bg-blue-500" },
                { label: "Build Docker", sub: "Docker", color: "bg-cyan-500" },
                { label: "Security Scan", sub: "Bandit", color: "bg-amber-500" },
                { label: "Deploy Staging", sub: "AWS EC2", color: "bg-purple-500" },
                { label: "Smoke Tests", sub: "Playwright", color: "bg-pink-500" },
                { label: "Deploy Prod", sub: "AWS EC2", color: "bg-green-500" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center gap-2 md:gap-0">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`${step.color} text-white px-4 py-2 rounded-xl text-sm font-semibold min-w-28 text-center`}>
                      {step.label}
                    </div>
                    <span className="text-xs text-muted-foreground">{step.sub}</span>
                  </div>
                  {i < 6 && <div className="hidden md:block w-8 h-0.5 bg-border mx-2 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* Database Schema */}
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Database className="h-6 w-6 text-primary" />
              MySQL Database Schema
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dbSchema.map((table, i) => (
                <div key={i} className="border border-border rounded-xl overflow-hidden" data-testid={`db-table-${i}`}>
                  <div className="bg-primary/10 text-primary font-bold text-sm px-4 py-2.5 flex items-center gap-2">
                    <Database className="h-3.5 w-3.5" />
                    {table.table}
                  </div>
                  <div className="divide-y divide-border">
                    {table.columns.map((col, j) => (
                      <div key={j} className="px-4 py-2 text-sm font-mono text-muted-foreground hover:bg-muted/30 transition-colors">
                        {col}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Security Measures
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Authentication", desc: "JWT-based stateless authentication with refresh token rotation and secure HttpOnly cookies." },
                { title: "Data Encryption", desc: "AES-256 encryption for data at rest. TLS 1.3 for all data in transit between client and server." },
                { title: "Input Validation", desc: "All API inputs validated with Pydantic schemas. SQL injection prevented via parameterized queries and ORM." },
                { title: "GDPR Compliance", desc: "User data export and deletion APIs, consent management, data retention policies enforced at DB level." },
                { title: "Rate Limiting", desc: "Redis-backed rate limiting prevents abuse. Login attempts limited to 5/min per IP address." },
                { title: "RBAC", desc: "Role-Based Access Control ensures students, employers, and admins only access authorized resources." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-muted/30" data-testid={`security-item-${i}`}>
                  <Layers className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
