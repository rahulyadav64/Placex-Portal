import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, X, ShieldCheck, Clock, AlertCircle } from "lucide-react";
import type { PostedJob } from "@/lib/employer-profile";
import type { VerificationStatus } from "@/lib/employer-profile";

const COMMON_SKILLS = [
  // Languages
  "JavaScript", "TypeScript", "Python", "Java", "C", "C++", "C#", "Go",
  "Rust", "PHP", "Ruby", "Kotlin", "Swift", "Dart", "R", "Scala",
  "Shell/Bash", "MATLAB",
  // Frontend
  "React", "Angular", "Vue.js", "Next.js", "Nuxt.js", "Svelte",
  "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Material UI",
  "SASS/SCSS", "jQuery", "Redux", "REST API", "GraphQL", "WebSocket",
  // Backend
  "Node.js", "Express.js", "Django", "Flask", "FastAPI", "Spring Boot",
  "Laravel", "Ruby on Rails", "ASP.NET", "NestJS", ".NET", "Gin",
  // Mobile
  "Android Development", "iOS Development", "Flutter", "React Native",
  "Ionic", "SwiftUI", "Kotlin Multiplatform",
  // Database
  "MongoDB", "PostgreSQL", "MySQL", "SQLite", "Redis", "Oracle DB",
  "MS SQL Server", "Firebase", "DynamoDB", "Elasticsearch", "Cassandra",
  "Supabase", "MariaDB",
  // Cloud & DevOps
  "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Ansible",
  "Jenkins", "GitHub Actions", "GitLab CI/CD", "Linux", "Nginx",
  "Prometheus", "Grafana", "Shell Scripting",
  // AI / ML / Data
  "Machine Learning", "Deep Learning", "NLP", "Computer Vision",
  "TensorFlow", "PyTorch", "Keras", "Scikit-learn", "OpenCV",
  "Pandas", "NumPy", "Data Science", "Data Analysis",
  "LangChain", "OpenAI API", "Power BI", "Tableau", "Spark",
  // Tools
  "Git", "GitHub", "GitLab", "Figma", "Adobe XD", "Postman",
  "Jira", "Swagger", "VS Code",
  // Security & Testing
  "Cybersecurity", "Ethical Hacking", "Jest", "Selenium", "Cypress",
  "Playwright", "OAuth", "JWT",
  // Other
  "Microservices", "Serverless", "WebRTC", "gRPC", "RabbitMQ",
  "Apache Kafka", "Blockchain Development", "Smart Contracts",
  "IoT", "Arduino",
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const;

const CITIES = [
  "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai",
  "Kolkata", "Ahmedabad", "Noida", "Gurugram", "Chandigarh", "Jaipur",
  "Kochi", "Indore", "Bhubaneswar", "Remote", "Pan India",
];

interface Props {
  open: boolean;
  onClose: () => void;
  companyName: string;
  verificationStatus: VerificationStatus;
  onPost: (job: Omit<PostedJob, "id" | "postedAt" | "updatedAt" | "applicantCount" | "isApproved">) => void;
}

const emptyForm = {
  title: "",
  description: "",
  location: "",
  salaryMin: "",
  salaryMax: "",
  salaryUnit: "LPA",
  type: "Full-time" as PostedJob["type"],
  requiredSkills: [] as string[],
  openings: 1,
  deadline: "",
  status: "Active" as PostedJob["status"],
};

export default function PostJobModal({ open, onClose, companyName, verificationStatus, onPost }: Props) {
  const [form, setForm] = useState({ ...emptyForm });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof emptyForm, string>>>({});
  const [posted, setPosted] = useState(false);

  const set = <K extends keyof typeof emptyForm>(k: K, v: typeof emptyForm[K]) =>
    setForm(prev => ({ ...prev, [k]: v }));

  const toggleSkill = (skill: string) => {
    setForm(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.includes(skill)
        ? prev.requiredSkills.filter(s => s !== skill)
        : [...prev.requiredSkills, skill],
    }));
  };

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = "Job title is required";
    if (!form.description.trim() || form.description.length < 50) e.description = "Description must be at least 50 characters";
    if (!form.location) e.location = "Location is required";
    if (!form.deadline) e.deadline = "Application deadline is required";
    if (form.requiredSkills.length === 0) e.requiredSkills = "Add at least one required skill";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePost = () => {
    if (!validate()) return;
    const salary = form.salaryMin && form.salaryMax
      ? `₹${form.salaryMin}–₹${form.salaryMax} ${form.salaryUnit}`
      : form.salaryMin
      ? `₹${form.salaryMin}+ ${form.salaryUnit}`
      : "Salary not disclosed";
    onPost({
      title: form.title.trim(),
      description: form.description.trim(),
      location: form.location,
      salary,
      type: form.type,
      requiredSkills: form.requiredSkills,
      openings: form.openings,
      deadline: form.deadline,
      status: "Active",
    });
    setPosted(true);
    setTimeout(() => {
      setPosted(false);
      setForm({ ...emptyForm });
      onClose();
    }, 1000);
  };

  const approvalBanner = {
    verified: {
      icon: ShieldCheck,
      bg: "bg-green-50 border-green-200",
      text: "text-green-800",
      label: "This job will be published with an Approved Job badge immediately.",
    },
    pending: {
      icon: Clock,
      bg: "bg-amber-50 border-amber-200",
      text: "text-amber-800",
      label: "Your company is pending verification. The job will be published but marked as 'Under Review'.",
    },
    unverified: {
      icon: AlertCircle,
      bg: "bg-orange-50 border-orange-200",
      text: "text-orange-800",
      label: "Your job will be posted with an Unverified badge. Verify your company CIN to upgrade to an Approved Job badge.",
    },
    rejected: {
      icon: AlertCircle,
      bg: "bg-red-50 border-red-200",
      text: "text-red-800",
      label: "Company verification was rejected. Contact support.",
    },
  }[verificationStatus];

  const BannerIcon = approvalBanner.icon;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0 border-b border-border">
          <DialogTitle className="text-xl font-bold">Post a New Job</DialogTitle>
          <p className="text-sm text-muted-foreground">Posting as: <span className="font-semibold text-foreground">{companyName || "Your Company"}</span></p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Approval banner */}
          <div className={`flex items-start gap-3 p-3 rounded-xl border text-sm ${approvalBanner.bg}`}>
            <BannerIcon className={`h-4 w-4 mt-0.5 shrink-0 ${approvalBanner.text}`} />
            <p className={approvalBanner.text}>{approvalBanner.label}</p>
          </div>

          {/* Title & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2 md:col-span-1">
              <Label>Job Title *</Label>
              <Input
                placeholder="e.g. Frontend Developer"
                value={form.title}
                onChange={e => set("title", e.target.value)}
                className={errors.title ? "border-red-400" : ""}
              />
              {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Job Type *</Label>
              <Select value={form.type} onValueChange={v => set("type", v as PostedJob["type"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{JOB_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          {/* Location & Openings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Location *</Label>
              <Select value={form.location} onValueChange={v => set("location", v)}>
                <SelectTrigger className={errors.location ? "border-red-400" : ""}>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>{CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
              {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Number of Openings</Label>
              <Input
                type="number"
                min={1}
                value={form.openings}
                onChange={e => set("openings", parseInt(e.target.value) || 1)}
              />
            </div>
          </div>

          {/* Salary */}
          <div className="space-y-1.5">
            <Label>Salary Range (optional)</Label>
            <div className="flex gap-2 items-center">
              <span className="text-sm text-muted-foreground">₹</span>
              <Input placeholder="Min (e.g. 5)" value={form.salaryMin} onChange={e => set("salaryMin", e.target.value)} className="flex-1" />
              <span className="text-sm text-muted-foreground">–</span>
              <Input placeholder="Max (e.g. 10)" value={form.salaryMax} onChange={e => set("salaryMax", e.target.value)} className="flex-1" />
              <Select value={form.salaryUnit} onValueChange={v => set("salaryUnit", v)}>
                <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="LPA">LPA</SelectItem>
                  <SelectItem value="per month">per month</SelectItem>
                  <SelectItem value="per day">per day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-1.5">
            <Label>Application Deadline *</Label>
            <Input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={form.deadline}
              onChange={e => set("deadline", e.target.value)}
              className={errors.deadline ? "border-red-400" : ""}
            />
            {errors.deadline && <p className="text-xs text-red-500">{errors.deadline}</p>}
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>Required Skills * <span className="text-xs font-normal text-muted-foreground">(click to select)</span></Label>
            {errors.requiredSkills && <p className="text-xs text-red-500">{errors.requiredSkills}</p>}
            <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-muted/30 max-h-40 overflow-y-auto">
              {COMMON_SKILLS.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1 text-xs rounded-full border font-medium transition-colors ${
                    form.requiredSkills.includes(skill)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-muted border-border"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
            {form.requiredSkills.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.requiredSkills.map(s => (
                  <Badge key={s} variant="secondary" className="gap-1 text-xs pr-1">
                    {s}
                    <button onClick={() => toggleSkill(s)}><X className="h-2.5 w-2.5" /></button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label>Job Description * <span className="text-xs font-normal text-muted-foreground">(min 50 characters)</span></Label>
            <Textarea
              className={`min-h-[110px] ${errors.description ? "border-red-400" : ""}`}
              placeholder="Describe the role, responsibilities, what you're looking for in candidates, and any perks/benefits..."
              value={form.description}
              onChange={e => set("description", e.target.value)}
            />
            <div className="flex justify-between">
              {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
              <span className="text-xs text-muted-foreground ml-auto">{form.description.length} chars</span>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t shrink-0 gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            onClick={handlePost}
            disabled={verificationStatus === "rejected"}
            className="gap-2 min-w-[130px]"
          >
            {posted
              ? <><CheckCircle2 className="h-4 w-4" /> Posted!</>
              : verificationStatus === "verified"
              ? <><ShieldCheck className="h-4 w-4" /> Post Approved Job</>
              : "Post Job"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
