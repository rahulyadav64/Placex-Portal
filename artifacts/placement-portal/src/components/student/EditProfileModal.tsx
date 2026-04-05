import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, CheckCircle2 } from "lucide-react";
import type { StudentProfile, ProgrammingLanguage, SkillLevel, Internship, Project } from "@/lib/student-profile";

const SKILL_LEVELS: SkillLevel[] = ["Beginner", "Intermediate", "Advanced", "Expert"];

const COMMON_LANGUAGES = [
  "C", "C++", "C#", "Java", "Python", "JavaScript", "TypeScript",
  "PHP", "Ruby", "Go", "Rust", "Kotlin", "Swift", "R", "MATLAB",
  "SQL", "Dart", "Scala", "Perl", "Haskell", "Elixir", "Erlang",
  "Lua", "Julia", "Assembly", "COBOL", "Fortran", "Groovy",
  "Shell/Bash", "PowerShell", "Visual Basic", "Objective-C",
  "F#", "Clojure", "Prolog", "Solidity", "VHDL", "Verilog",
];

const COMMON_SKILLS = [
  // Frontend
  "React", "Angular", "Vue.js", "Next.js", "Nuxt.js", "Svelte",
  "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Material UI",
  "Ant Design", "Chakra UI", "SASS/SCSS", "jQuery", "Redux",
  "Zustand", "GraphQL", "REST API", "WebSocket", "Webpack", "Vite",
  // Backend
  "Node.js", "Express.js", "Django", "Flask", "FastAPI",
  "Spring Boot", "Laravel", "Ruby on Rails", "ASP.NET", "NestJS",
  "Hapi.js", "Koa.js", "Gin", "Fiber", "Echo", "Symfony",
  // Mobile
  "Android Development", "iOS Development", "Flutter", "React Native",
  "Ionic", "Xamarin", "Kotlin Multiplatform", "SwiftUI",
  // Database
  "MongoDB", "PostgreSQL", "MySQL", "SQLite", "Redis", "Cassandra",
  "Oracle DB", "MS SQL Server", "Firebase", "DynamoDB", "Elasticsearch",
  "Neo4j", "CouchDB", "MariaDB", "Supabase", "PlanetScale",
  // Cloud & DevOps
  "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform",
  "Ansible", "Jenkins", "GitHub Actions", "GitLab CI/CD",
  "CircleCI", "Nginx", "Apache", "Linux", "Shell Scripting",
  "Prometheus", "Grafana", "Helm", "Istio",
  // AI / ML / Data
  "Machine Learning", "Deep Learning", "NLP", "Computer Vision",
  "TensorFlow", "PyTorch", "Keras", "Scikit-learn", "OpenCV",
  "Pandas", "NumPy", "Matplotlib", "Seaborn", "Hugging Face",
  "Data Analysis", "Data Science", "LangChain", "OpenAI API",
  "Spark", "Hadoop", "Power BI", "Tableau",
  // Version Control & Tools
  "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Confluence",
  "Figma", "Adobe XD", "Postman", "Swagger", "Vim", "VS Code",
  // Security & Networking
  "Cybersecurity", "Ethical Hacking", "Penetration Testing",
  "Network Security", "OAuth", "JWT", "SSL/TLS", "Burp Suite",
  "Wireshark", "OWASP",
  // Testing
  "Unit Testing", "Jest", "Selenium", "Cypress", "Playwright",
  "JUnit", "Mocha", "Pytest", "Postman Testing",
  // Blockchain
  "Solidity", "Web3.js", "Ethereum", "Blockchain Development",
  "Smart Contracts", "IPFS",
  // Other
  "Microservices", "Serverless", "WebRTC", "gRPC", "RabbitMQ",
  "Apache Kafka", "IoT", "Raspberry Pi", "Arduino",
];

const SOFT_SKILLS = [
  "Communication", "Teamwork", "Problem Solving", "Leadership",
  "Time Management", "Critical Thinking", "Adaptability",
  "Creativity", "Attention to Detail", "Project Management",
  "Conflict Resolution", "Emotional Intelligence", "Negotiation",
  "Public Speaking", "Decision Making", "Mentoring", "Work Ethic",
];

const COURSES = ["BCA", "BCS", "B.Tech CS", "B.Tech IT", "B.Sc CS", "B.Sc IT", "MCA", "M.Tech", "MBA IT", "Other"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "Final Year", "Graduated"];

const TABS = ["Personal", "Academic", "Skills", "Languages", "Experience", "Projects"] as const;
type Tab = typeof TABS[number];

interface Props {
  open: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSave: (profile: StudentProfile) => void;
}

export default function EditProfileModal({ open, onClose, profile, onSave }: Props) {
  const [draft, setDraft] = useState<StudentProfile>({ ...profile });
  const [activeTab, setActiveTab] = useState<Tab>("Personal");
  const [saved, setSaved] = useState(false);

  const set = (key: keyof StudentProfile, value: unknown) => {
    setDraft(prev => ({ ...prev, [key]: value }));
  };

  const addLanguage = () => {
    set("programmingLanguages", [
      ...draft.programmingLanguages,
      { name: "", level: "Beginner" as SkillLevel },
    ]);
  };

  const updateLanguage = (i: number, updates: Partial<ProgrammingLanguage>) => {
    const next = draft.programmingLanguages.map((l, idx) =>
      idx === i ? { ...l, ...updates } : l
    );
    set("programmingLanguages", next);
  };

  const removeLanguage = (i: number) => {
    set("programmingLanguages", draft.programmingLanguages.filter((_, idx) => idx !== i));
  };

  const toggleSkill = (skill: string, listKey: "technicalSkills" | "softSkills") => {
    const current = draft[listKey] as string[];
    set(listKey, current.includes(skill) ? current.filter(s => s !== skill) : [...current, skill]);
  };

  const toggleCert = (cert: string) => {
    const certs = draft.certifications;
    set("certifications", certs.includes(cert) ? certs.filter(c => c !== cert) : [...certs, cert]);
  };

  const addInternship = () => {
    set("internships", [...draft.internships, { company: "", role: "", duration: "", description: "" }]);
  };

  const updateInternship = (i: number, updates: Partial<Internship>) => {
    set("internships", draft.internships.map((it, idx) => idx === i ? { ...it, ...updates } : it));
  };

  const removeInternship = (i: number) => {
    set("internships", draft.internships.filter((_, idx) => idx !== i));
  };

  const addProject = () => {
    set("projects", [...draft.projects, { name: "", techStack: "", description: "", link: "" }]);
  };

  const updateProject = (i: number, updates: Partial<Project>) => {
    set("projects", draft.projects.map((p, idx) => idx === i ? { ...p, ...updates } : p));
  };

  const removeProject = (i: number) => {
    set("projects", draft.projects.filter((_, idx) => idx !== i));
  };

  const handleSave = () => {
    onSave(draft);
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 900);
  };

  const inputClass = "w-full";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-0 shrink-0">
          <DialogTitle className="text-xl font-bold">Edit Student Profile</DialogTitle>
          <p className="text-sm text-muted-foreground mt-0.5">Complete your profile to get better job matches</p>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex border-b border-border px-6 mt-4 gap-1 overflow-x-auto shrink-0">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {/* Personal Tab */}
          {activeTab === "Personal" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Full Name *</Label>
                  <Input className={inputClass} placeholder="e.g. Rahul Sharma" value={draft.name} onChange={e => set("name", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Email Address *</Label>
                  <Input className={inputClass} type="email" placeholder="e.g. rahul@email.com" value={draft.email} onChange={e => set("email", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone Number *</Label>
                  <Input className={inputClass} placeholder="e.g. +91 9876543210" value={draft.phone} onChange={e => set("phone", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>City / Location *</Label>
                  <Input className={inputClass} placeholder="e.g. Delhi, Bangalore" value={draft.city} onChange={e => set("city", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>LinkedIn URL</Label>
                  <Input className={inputClass} placeholder="https://linkedin.com/in/yourname" value={draft.linkedIn} onChange={e => set("linkedIn", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>GitHub URL</Label>
                  <Input className={inputClass} placeholder="https://github.com/yourname" value={draft.github} onChange={e => set("github", e.target.value)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Career Objective / About You *</Label>
                <Textarea
                  className="min-h-[90px]"
                  placeholder="Briefly describe your goals and what kind of roles you're looking for..."
                  value={draft.objective}
                  onChange={e => set("objective", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Academic Tab */}
          {activeTab === "Academic" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>College / University *</Label>
                  <Input className={inputClass} placeholder="e.g. Delhi University" value={draft.college} onChange={e => set("college", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Course / Degree *</Label>
                  <Select value={draft.course} onValueChange={v => set("course", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {COURSES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Current Year *</Label>
                  <Select value={draft.year} onValueChange={v => set("year", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>CGPA / Percentage *</Label>
                  <Input className={inputClass} placeholder="e.g. 8.5 CGPA or 85%" value={draft.cgpa} onChange={e => set("cgpa", e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Certifications (click to add)</Label>
                <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-muted/30">
                  {["AWS Cloud Practitioner", "Google Data Analytics", "Meta Frontend Developer",
                    "Microsoft Azure Fundamentals", "Python for Data Science (Coursera)",
                    "Full Stack Web Dev (Udemy)", "Oracle Java SE", "Cisco CCNA",
                    "Ethical Hacking (EC-Council)", "UI/UX Design (Google)"].map(cert => (
                    <button
                      key={cert}
                      onClick={() => toggleCert(cert)}
                      className={`px-3 py-1 text-xs rounded-full border font-medium transition-colors ${
                        draft.certifications.includes(cert)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background hover:bg-muted border-border"
                      }`}
                    >
                      {cert}
                    </button>
                  ))}
                </div>
                {draft.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {draft.certifications.map(c => (
                      <Badge key={c} variant="secondary" className="gap-1 pr-1">
                        {c}
                        <button onClick={() => toggleCert(c)}><X className="h-3 w-3" /></button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === "Skills" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-base font-semibold">Technical Skills *</Label>
                <p className="text-xs text-muted-foreground">Select all the technologies and tools you know</p>
                <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-muted/30 max-h-48 overflow-y-auto">
                  {COMMON_SKILLS.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill, "technicalSkills")}
                      className={`px-3 py-1 text-xs rounded-full border font-medium transition-colors ${
                        draft.technicalSkills.includes(skill)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background hover:bg-muted border-border"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                {draft.technicalSkills.length > 0 && (
                  <p className="text-xs text-primary font-medium">{draft.technicalSkills.length} skills selected</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold">Soft Skills</Label>
                <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-muted/30">
                  {SOFT_SKILLS.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill, "softSkills")}
                      className={`px-3 py-1 text-xs rounded-full border font-medium transition-colors ${
                        draft.softSkills.includes(skill)
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-background hover:bg-muted border-border"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Languages Tab */}
          {activeTab === "Languages" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold">Programming Languages *</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Add each language you know and your proficiency level</p>
                </div>
                <Button size="sm" variant="outline" className="gap-1.5" onClick={addLanguage}>
                  <Plus className="h-3.5 w-3.5" /> Add Language
                </Button>
              </div>

              {draft.programmingLanguages.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed rounded-xl text-muted-foreground">
                  <p className="text-sm">No languages added yet.</p>
                  <p className="text-xs mt-1">Click "Add Language" to get started.</p>
                </div>
              )}

              <div className="space-y-3">
                {draft.programmingLanguages.map((lang, i) => (
                  <div key={i} className="flex gap-3 items-start p-3 border rounded-xl bg-muted/20">
                    <div className="flex-1 space-y-1.5">
                      <Label className="text-xs">Language</Label>
                      <Select value={lang.name} onValueChange={v => updateLanguage(i, { name: v })}>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {COMMON_LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {lang.name === "Other" && (
                        <Input placeholder="Type language name" onChange={e => updateLanguage(i, { name: e.target.value })} />
                      )}
                    </div>
                    <div className="w-44 space-y-1.5">
                      <Label className="text-xs">Proficiency Level</Label>
                      <Select value={lang.level} onValueChange={v => updateLanguage(i, { level: v as SkillLevel })}>
                        <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {SKILL_LEVELS.map(l => (
                            <SelectItem key={l} value={l}>
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${
                                  l === "Beginner" ? "bg-gray-400" :
                                  l === "Intermediate" ? "bg-blue-500" :
                                  l === "Advanced" ? "bg-purple-500" : "bg-green-500"
                                }`} />
                                {l}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <button
                      onClick={() => removeLanguage(i)}
                      className="mt-6 p-1.5 text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "Experience" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold">Internship / Work Experience</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Add any internships or part-time work</p>
                </div>
                <Button size="sm" variant="outline" className="gap-1.5" onClick={addInternship}>
                  <Plus className="h-3.5 w-3.5" /> Add Internship
                </Button>
              </div>

              {draft.internships.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed rounded-xl text-muted-foreground">
                  <p className="text-sm">No internships added.</p>
                  <p className="text-xs mt-1">Fresh graduates can leave this empty.</p>
                </div>
              )}

              <div className="space-y-4">
                {draft.internships.map((it, i) => (
                  <div key={i} className="p-4 border rounded-xl bg-muted/20 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Internship {i + 1}</span>
                      <button onClick={() => removeInternship(i)} className="text-muted-foreground hover:text-red-500">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs">Company Name</Label>
                        <Input placeholder="e.g. TCS, Startup Name" value={it.company} onChange={e => updateInternship(i, { company: e.target.value })} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs">Your Role</Label>
                        <Input placeholder="e.g. Frontend Intern" value={it.role} onChange={e => updateInternship(i, { role: e.target.value })} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs">Duration</Label>
                        <Input placeholder="e.g. Jun 2024 – Aug 2024 (3 months)" value={it.duration} onChange={e => updateInternship(i, { duration: e.target.value })} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">What did you work on?</Label>
                      <Textarea placeholder="Briefly describe your responsibilities and achievements..." value={it.description} onChange={e => updateInternship(i, { description: e.target.value })} className="min-h-[70px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "Projects" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold">Projects *</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Add your academic or personal projects</p>
                </div>
                <Button size="sm" variant="outline" className="gap-1.5" onClick={addProject}>
                  <Plus className="h-3.5 w-3.5" /> Add Project
                </Button>
              </div>

              {draft.projects.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed rounded-xl text-muted-foreground">
                  <p className="text-sm">No projects added yet.</p>
                  <p className="text-xs mt-1">Projects greatly improve your profile score.</p>
                </div>
              )}

              <div className="space-y-4">
                {draft.projects.map((p, i) => (
                  <div key={i} className="p-4 border rounded-xl bg-muted/20 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Project {i + 1}</span>
                      <button onClick={() => removeProject(i)} className="text-muted-foreground hover:text-red-500">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs">Project Name</Label>
                        <Input placeholder="e.g. Online Placement Portal" value={p.name} onChange={e => updateProject(i, { name: e.target.value })} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs">Tech Stack Used</Label>
                        <Input placeholder="e.g. React, Node.js, MongoDB" value={p.techStack} onChange={e => updateProject(i, { techStack: e.target.value })} />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <Label className="text-xs">GitHub / Live Link (optional)</Label>
                        <Input placeholder="https://github.com/..." value={p.link || ""} onChange={e => updateProject(i, { link: e.target.value })} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Description</Label>
                      <Textarea placeholder="What does this project do? What problem does it solve?" value={p.description} onChange={e => updateProject(i, { description: e.target.value })} className="min-h-[70px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <DialogFooter className="px-6 py-4 border-t border-border shrink-0 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Changes are saved to your browser</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} className="gap-2 min-w-[120px]">
              {saved ? (
                <><CheckCircle2 className="h-4 w-4" /> Saved!</>
              ) : (
                "Save Profile"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
