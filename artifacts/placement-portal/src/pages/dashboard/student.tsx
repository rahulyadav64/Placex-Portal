import { useState, useRef, useCallback } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase, Bell, TrendingUp, Upload, CheckCircle2, Clock, XCircle,
  CalendarCheck, Star, ChevronRight, User, GraduationCap, Target,
  FileText, MapPin, Phone, Mail, Github, Linkedin, AlertCircle,
  Building2, ExternalLink, Code2, BookOpen, FolderGit2
} from "lucide-react";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { computeMatchScore, getProfileCompletion } from "@/lib/student-profile";
import { jobs as mockJobs } from "@/lib/mock-data";
import EditProfileModal from "@/components/student/EditProfileModal";

const statusConfig: Record<string, { color: string; icon: React.FC<{ className?: string }> }> = {
  "Applied":              { color: "bg-blue-500/10 text-blue-600 border-blue-200",   icon: Clock },
  "Under Review":         { color: "bg-amber-500/10 text-amber-600 border-amber-200", icon: Clock },
  "Interview Scheduled":  { color: "bg-purple-500/10 text-purple-600 border-purple-200", icon: CalendarCheck },
  "Rejected":             { color: "bg-red-500/10 text-red-600 border-red-200",     icon: XCircle },
  "Offered":              { color: "bg-green-500/10 text-green-600 border-green-200", icon: CheckCircle2 },
};

const levelColor: Record<string, string> = {
  Beginner:     "bg-gray-100 text-gray-600",
  Intermediate: "bg-blue-100 text-blue-700",
  Advanced:     "bg-purple-100 text-purple-700",
  Expert:       "bg-green-100 text-green-700",
};

export default function StudentDashboard() {
  const { profile, updateProfile, applications, addApplication, isApplied } = useStudentProfile();
  const [activeTab, setActiveTab] = useState<"applications" | "recommended" | "skills" | "profile">("applications");
  const [editOpen, setEditOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allSkills = [
    ...profile.programmingLanguages.map(l => l.name),
    ...profile.technicalSkills,
  ];

  const recommendedJobs = mockJobs
    .filter(j => j.category === "private")
    .map(j => ({ ...j, matchScore: computeMatchScore(allSkills, j.requiredSkills) }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 8);

  const skillGap = profile.technicalSkills.length > 0
    ? profile.technicalSkills.map(skill => {
        const demand = Math.min(99, 60 + Math.floor(skill.length * 3.7) % 40);
        const level = 50 + Math.floor(skill.charCodeAt(0) % 40);
        return { name: skill, level, demand };
      })
    : [];

  const { percent: profileCompletion, missing } = getProfileCompletion(profile);

  const aiScore = Math.min(99, Math.round(
    profileCompletion * 0.4 +
    Math.min(40, allSkills.length * 3) +
    Math.min(20, profile.projects.length * 7)
  ));

  const stats = [
    { label: "Applications", value: String(applications.length), icon: Briefcase, color: "text-blue-500" },
    { label: "Interviews", value: String(applications.filter(a => a.status === "Interview Scheduled").length), icon: CalendarCheck, color: "text-purple-500" },
    { label: "Offers", value: String(applications.filter(a => a.status === "Offered").length), icon: CheckCircle2, color: "text-green-500" },
    {
      label: "Avg. Match",
      value: applications.length ? `${Math.round(applications.reduce((s, a) => s + a.matchScore, 0) / applications.length)}%` : "—",
      icon: Target,
      color: "text-amber-500",
    },
  ];

  const handleResumeUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      updateProfile({
        resumeName: file.name,
        resumeDataUrl: e.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
  }, [updateProfile]);

  const isProfileEmpty = !profile.name;

  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="container mx-auto px-4">

        {/* Empty profile prompt */}
        {isProfileEmpty && (
          <div className="glass-card rounded-2xl p-6 mb-6 border-2 border-dashed border-primary/30 bg-primary/5 text-center">
            <GraduationCap className="h-10 w-10 text-primary mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-1">Welcome to Your Student Dashboard</h2>
            <p className="text-muted-foreground mb-4 text-sm max-w-md mx-auto">
              Your profile is empty. Fill it in to get real job matches based on your skills, languages, and projects.
            </p>
            <Button className="gap-2" onClick={() => setEditOpen(true)}>
              <User className="h-4 w-4" /> Complete My Profile
            </Button>
          </div>
        )}

        {/* Header Card */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                {profile.photoDataUrl
                  ? <img src={profile.photoDataUrl} alt="Profile" className="w-16 h-16 rounded-2xl object-cover" />
                  : <GraduationCap className="h-8 w-8 text-primary" />
                }
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl font-bold" data-testid="text-student-name">
                  {profile.name || "Your Name"}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {profile.course || "Course"} {profile.year && `— ${profile.year}`}
                  {profile.college && ` • ${profile.college}`}
                </p>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                  {profile.city && (
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {profile.city}</span>
                  )}
                  {profile.email && (
                    <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {profile.email}</span>
                  )}
                  {profile.phone && (
                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {profile.phone}</span>
                  )}
                  {profile.linkedIn && (
                    <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                      <Linkedin className="h-3 w-3" /> LinkedIn
                    </a>
                  )}
                  {profile.github && (
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                      <Github className="h-3 w-3" /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {/* Resume Upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={e => { if (e.target.files?.[0]) handleResumeUpload(e.target.files[0]); }}
                data-testid="input-resume-upload"
              />
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => fileInputRef.current?.click()}
                data-testid="btn-upload-resume"
              >
                <Upload className="h-4 w-4" />
                {profile.resumeName ? "Change Resume" : "Upload Resume"}
              </Button>
              {profile.resumeName && (
                <span className="text-xs text-green-600 flex items-center gap-1 max-w-[120px] truncate">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  {profile.resumeName}
                </span>
              )}
              <Button size="sm" className="gap-2" onClick={() => setEditOpen(true)} data-testid="btn-edit-profile">
                <User className="h-4 w-4" /> Edit Profile
              </Button>
            </div>
          </div>

          {/* Skills preview strip */}
          {allSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
              {profile.programmingLanguages.slice(0, 5).map(l => (
                <span key={l.name} className={`text-xs px-2.5 py-1 rounded-full font-medium ${levelColor[l.level] || "bg-muted text-foreground"}`}>
                  {l.name}
                  <span className="ml-1 opacity-60">· {l.level[0]}</span>
                </span>
              ))}
              {profile.technicalSkills.slice(0, 6).map(s => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-full font-medium bg-primary/10 text-primary">{s}</span>
              ))}
              {allSkills.length > 11 && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">+{allSkills.length - 11} more</span>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="glass-card rounded-2xl p-4 text-center" data-testid={`stat-${i}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="flex border-b border-border overflow-x-auto">
                {([
                  { key: "applications", label: "My Applications" },
                  { key: "recommended",  label: "Recommended Jobs" },
                  { key: "skills",       label: "Skill Gap" },
                  { key: "profile",      label: "Full Profile" },
                ] as const).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex-1 py-3.5 text-sm font-medium whitespace-nowrap transition-colors min-w-[130px] ${
                      activeTab === key
                        ? "bg-primary/5 text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid={`tab-${key}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="p-4 space-y-3">

                {/* Applications */}
                {activeTab === "applications" && (
                  <>
                    {applications.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Briefcase className="h-10 w-10 mx-auto mb-3 opacity-30" />
                        <p className="font-medium">No applications yet</p>
                        <p className="text-sm mt-1">Go to Recommended Jobs and click Apply to track your applications here</p>
                        <Button variant="outline" size="sm" className="mt-4" onClick={() => setActiveTab("recommended")}>
                          Browse Recommended Jobs
                        </Button>
                      </div>
                    ) : (
                      applications.map((app) => {
                        const cfg = statusConfig[app.status] || statusConfig["Applied"];
                        const StatusIcon = cfg.icon;
                        return (
                          <div key={app.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors" data-testid={`application-${app.id}`}>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold truncate">{app.jobTitle}</p>
                              <p className="text-sm text-muted-foreground">{app.company}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Applied {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap justify-end">
                              {app.matchScore > 0 && (
                                <span className="text-xs font-semibold text-primary">{app.matchScore}% match</span>
                              )}
                              <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.color}`}>
                                <StatusIcon className="h-3 w-3" />
                                {app.status}
                              </span>
                              <a href={app.sourceUrl} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="ghost" className="text-xs gap-1 h-7">
                                  View <ExternalLink className="h-3 w-3" />
                                </Button>
                              </a>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </>
                )}

                {/* Recommended Jobs */}
                {activeTab === "recommended" && (
                  <>
                    {allSkills.length === 0 ? (
                      <div className="text-center py-10 text-muted-foreground">
                        <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-40" />
                        <p className="font-medium">Add your skills to see matches</p>
                        <p className="text-sm mt-1">Edit your profile and add programming languages & technical skills</p>
                        <Button variant="outline" size="sm" className="mt-4 gap-2" onClick={() => setEditOpen(true)}>
                          <User className="h-3.5 w-3.5" /> Add Skills
                        </Button>
                      </div>
                    ) : (
                      recommendedJobs.map((job) => (
                        <div key={job.id} className="flex items-start gap-4 p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors" data-testid={`recommended-${job.id}`}>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold">{job.title}</p>
                            <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{job.salary}</p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {job.requiredSkills.slice(0, 4).map(s => {
                                const matched = allSkills.some(ps => ps.toLowerCase() === s.toLowerCase());
                                return (
                                  <span key={s} className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                    matched ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                                  }`}>
                                    {matched && <span className="mr-0.5">✓</span>}{s}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                              job.matchScore >= 70 ? "bg-green-100 text-green-700" :
                              job.matchScore >= 40 ? "bg-amber-100 text-amber-700" :
                              "bg-red-100 text-red-600"
                            }`}>
                              {job.matchScore}% match
                            </span>
                            {isApplied(job.id) ? (
                              <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> Applied
                              </span>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs gap-1 h-7"
                                onClick={() => addApplication({
                                  jobId: job.id,
                                  jobTitle: job.title,
                                  company: job.company,
                                  location: job.location,
                                  salary: job.salary,
                                  matchScore: job.matchScore,
                                  source: job.source,
                                  sourceUrl: job.sourceUrl,
                                  status: "Applied",
                                })}
                                data-testid={`btn-apply-${job.id}`}
                              >
                                Apply <ChevronRight className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}

                {/* Skill Gap */}
                {activeTab === "skills" && (
                  <div className="space-y-4 p-2">
                    {skillGap.length === 0 ? (
                      <div className="text-center py-10 text-muted-foreground">
                        <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-40" />
                        <p className="font-medium">No skills to analyse yet</p>
                        <p className="text-sm mt-1">Add your technical skills in your profile first</p>
                        <Button variant="outline" size="sm" className="mt-4 gap-2" onClick={() => setEditOpen(true)}>
                          <User className="h-3.5 w-3.5" /> Add Skills
                        </Button>
                      </div>
                    ) : (
                      skillGap.map((skill) => (
                        <div key={skill.name} data-testid={`skill-${skill.name}`}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-sm">{skill.name}</span>
                            <div className="flex gap-3 text-xs text-muted-foreground">
                              <span>Your level: <span className="text-primary font-semibold">{skill.level}%</span></span>
                              <span>Market demand: <span className="text-amber-600 font-semibold">{skill.demand}%</span></span>
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground w-20">Your level</span>
                              <Progress value={skill.level} className="flex-1 h-2" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground w-20">Demand</span>
                              <Progress value={skill.demand} className="flex-1 h-2 [&>div]:bg-amber-500" />
                            </div>
                          </div>
                          {skill.demand - skill.level > 15 && (
                            <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" /> Gap of {skill.demand - skill.level}% — consider upskilling
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Full Profile */}
                {activeTab === "profile" && (
                  <div className="space-y-5 p-2">
                    {/* Languages */}
                    {profile.programmingLanguages.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                          <Code2 className="h-4 w-4 text-primary" /> Programming Languages
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.programmingLanguages.map(l => (
                            <span key={l.name} className={`px-3 py-1 rounded-full text-xs font-medium ${levelColor[l.level] || "bg-muted"}`}>
                              {l.name} · {l.level}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technical Skills */}
                    {profile.technicalSkills.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-primary" /> Technical Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.technicalSkills.map(s => (
                            <span key={s} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Soft Skills */}
                    {profile.softSkills.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                          <Star className="h-4 w-4 text-purple-500" /> Soft Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.softSkills.map(s => (
                            <span key={s} className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certifications */}
                    {profile.certifications.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                          <BookOpen className="h-4 w-4 text-amber-500" /> Certifications
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.certifications.map(c => (
                            <span key={c} className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">{c}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {profile.projects.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                          <FolderGit2 className="h-4 w-4 text-green-600" /> Projects
                        </h4>
                        <div className="space-y-3">
                          {profile.projects.map((p, i) => (
                            <div key={i} className="p-3 border rounded-xl bg-muted/20">
                              <div className="flex items-start justify-between">
                                <p className="font-semibold text-sm">{p.name}</p>
                                {p.link && (
                                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-primary">
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </a>
                                )}
                              </div>
                              <p className="text-xs text-primary mt-0.5">{p.techStack}</p>
                              <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Internships */}
                    {profile.internships.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                          <Building2 className="h-4 w-4 text-blue-500" /> Internships
                        </h4>
                        <div className="space-y-3">
                          {profile.internships.map((it, i) => (
                            <div key={i} className="p-3 border rounded-xl bg-muted/20">
                              <p className="font-semibold text-sm">{it.role}</p>
                              <p className="text-xs text-primary">{it.company}</p>
                              <p className="text-xs text-muted-foreground">{it.duration}</p>
                              {it.description && <p className="text-xs text-muted-foreground mt-1">{it.description}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Objective */}
                    {profile.objective && (
                      <div>
                        <h4 className="font-semibold text-sm flex items-center gap-2 mb-1">
                          <FileText className="h-4 w-4 text-muted-foreground" /> Career Objective
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{profile.objective}</p>
                      </div>
                    )}

                    {!profile.name && !profile.technicalSkills.length && !profile.programmingLanguages.length && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="text-sm">Your profile is empty.</p>
                        <Button variant="outline" size="sm" className="mt-3 gap-2" onClick={() => setEditOpen(true)}>
                          <User className="h-3.5 w-3.5" /> Fill in Profile
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Profile Completion
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl font-bold text-primary" data-testid="text-profile-completion">{profileCompletion}%</span>
                <span className="text-sm text-muted-foreground">
                  {profileCompletion === 100 ? "Profile is complete!" : "Complete your profile to improve job matches"}
                </span>
              </div>
              <Progress value={profileCompletion} className="h-2.5 mb-4" />
              <div className="space-y-2">
                {missing.slice(0, 5).map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
                {missing.length > 5 && (
                  <p className="text-xs text-muted-foreground pl-6">+{missing.length - 5} more items</p>
                )}
                {missing.length === 0 && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4" /> All sections complete
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 gap-2" onClick={() => setEditOpen(true)}>
                <User className="h-3.5 w-3.5" /> Edit Profile
              </Button>
            </div>

            {/* Resume */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Resume
              </h3>
              {profile.resumeName ? (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-200">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-800 truncate">{profile.resumeName}</p>
                    <p className="text-xs text-green-600">Resume uploaded</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 border-2 border-dashed rounded-xl">
                  <Upload className="h-6 w-6 mx-auto mb-1 text-muted-foreground opacity-50" />
                  <p className="text-xs text-muted-foreground">No resume uploaded</p>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-3.5 w-3.5" />
                {profile.resumeName ? "Replace Resume" : "Upload Resume"}
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">Accepts PDF, DOC, DOCX</p>
            </div>

            {/* AI Score */}
            <div className="rounded-2xl bg-gradient-primary p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4" />
                <span className="font-semibold text-sm">AI Placement Score</span>
              </div>
              <div className="text-5xl font-extrabold mb-2" data-testid="text-ai-score">{aiScore}</div>
              <p className="text-blue-100 text-sm">
                {aiScore >= 80
                  ? `Strong profile! Top ${100 - aiScore}% among peers.`
                  : aiScore >= 50
                  ? "Good start! Add more skills and projects to boost your score."
                  : "Complete your profile to unlock a better AI placement score."}
              </p>
              {profileCompletion < 100 && (
                <button
                  onClick={() => setEditOpen(true)}
                  className="mt-3 text-xs text-blue-200 hover:text-white underline"
                >
                  Improve my score →
                </button>
              )}
            </div>

            {/* Notifications */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                Notifications
              </h3>
              <div className="space-y-3">
                {applications.length > 0 ? (
                  applications.slice(0, 3).map((app) => (
                    <div key={app.id} className="p-3 rounded-xl bg-muted/50 text-sm">
                      <p className="font-medium mb-0.5">
                        Application submitted to {app.company}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-3">
                    No notifications yet. Apply to jobs to see updates here.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
        onSave={(updated) => {
          updateProfile(updated);
          setEditOpen(false);
        }}
      />

    </div>
  );
}
