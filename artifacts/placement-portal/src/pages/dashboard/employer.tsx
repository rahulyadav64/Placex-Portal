import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase, Bell, Users, CheckCircle2, Clock, XCircle,
  Plus, Building2, TrendingUp, ChevronRight, Eye, EyeOff,
  ShieldCheck, ShieldAlert, AlertCircle, MapPin, Calendar,
  Mail, Phone, Globe, Trash2, Pause, Play, Edit3
} from "lucide-react";
import { useEmployerProfile } from "@/hooks/useEmployerProfile";
import { getCompanyCompletion } from "@/lib/employer-profile";
import CompanySetupModal from "@/components/employer/CompanySetupModal";
import PostJobModal from "@/components/employer/PostJobModal";

const VERIFICATION_CONFIG = {
  verified:   { icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50 border-green-200",  label: "Verified Company",      badge: "bg-green-100 text-green-700 border-green-300" },
  pending:    { icon: Clock,       color: "text-amber-600", bg: "bg-amber-50 border-amber-200",  label: "Pending Verification",  badge: "bg-amber-100 text-amber-700 border-amber-300" },
  unverified: { icon: ShieldAlert, color: "text-red-500",   bg: "bg-red-50 border-red-200",     label: "Not Verified",          badge: "bg-red-100 text-red-600 border-red-300" },
  rejected:   { icon: XCircle,     color: "text-red-600",   bg: "bg-red-50 border-red-200",     label: "Verification Rejected", badge: "bg-red-100 text-red-700 border-red-300" },
};

export default function EmployerDashboard() {
  const {
    company, updateCompany, verifyCompany, verifying, verificationResult,
    postedJobs, postJob, updateJob, deleteJob,
  } = useEmployerProfile();

  const [activeTab, setActiveTab] = useState<"jobs" | "company" | "applicants">("jobs");
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [postJobModalOpen, setPostJobModalOpen] = useState(false);

  const verCfg = VERIFICATION_CONFIG[company.verificationStatus];
  const VerIcon = verCfg.icon;
  const isProfileEmpty = !company.name;
  const completion = getCompanyCompletion(company);

  const activeJobs = postedJobs.filter(j => j.status === "Active");
  const totalApplicants = postedJobs.reduce((s, j) => s + j.applicantCount, 0);
  const approvedJobs = postedJobs.filter(j => j.isApproved);

  const stats = [
    { label: "Active Jobs",       value: String(activeJobs.length),    icon: Briefcase,    color: "text-blue-500" },
    { label: "Total Applicants",  value: String(totalApplicants),       icon: Users,        color: "text-purple-500" },
    { label: "Approved Listings", value: String(approvedJobs.length),   icon: ShieldCheck,  color: "text-green-500" },
    { label: "Total Posted",      value: String(postedJobs.length),     icon: TrendingUp,   color: "text-amber-500" },
  ];

  const notifs = postedJobs.slice(0, 3).map(j => ({
    id: j.id,
    message: j.isApproved
      ? `"${j.title}" is live with an Approved Job badge`
      : `"${j.title}" posted — ${company.verificationStatus === "pending" ? "awaiting verification approval" : "verify your company for approval"}`,
    time: new Date(j.postedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
  }));

  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="container mx-auto px-4">

        {/* Empty state prompt */}
        {isProfileEmpty && (
          <div className="glass-card rounded-2xl p-8 mb-6 border-2 border-dashed border-primary/30 bg-primary/5 text-center">
            <Building2 className="h-12 w-12 text-primary mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-1">Welcome, Recruiter!</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
              Set up your company profile and get verified to post jobs with an <span className="text-green-700 font-semibold">Approved Job</span> badge.
            </p>
            <Button className="gap-2" onClick={() => setCompanyModalOpen(true)}>
              <Building2 className="h-4 w-4" /> Set Up Company Profile
            </Button>
          </div>
        )}

        {/* Header */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                {company.logoDataUrl
                  ? <img src={company.logoDataUrl} alt="Logo" className="w-16 h-16 rounded-2xl object-contain" />
                  : <Building2 className="h-8 w-8 text-primary" />
                }
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold" data-testid="text-company-name">
                    {company.name || "Your Company"}
                  </h1>
                  {/* Verification badge */}
                  <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${verCfg.badge}`}>
                    <VerIcon className="h-3 w-3" />
                    {verCfg.label}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mt-0.5">
                  {company.industry && <span>{company.industry}</span>}
                  {company.city && <span> • {company.city}{company.state ? `, ${company.state}` : ""}</span>}
                  {company.hrName && <span> • HR: {company.hrName}</span>}
                </p>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                  {company.hrEmail && (
                    <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {company.hrEmail}</span>
                  )}
                  {company.hrPhone && (
                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {company.hrPhone}</span>
                  )}
                  {company.website && (
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                      <Globe className="h-3 w-3" /> Website
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Button variant="outline" size="sm" className="gap-2" onClick={() => setCompanyModalOpen(true)} data-testid="btn-company-profile">
                <Building2 className="h-4 w-4" />
                {company.verificationStatus === "unverified" ? "Verify Company" : "Company Profile"}
              </Button>
              <Button
                size="sm"
                className="gap-2"
                onClick={() => setPostJobModalOpen(true)}
                data-testid="btn-post-job"
              >
                <Plus className="h-4 w-4" /> Post a Job
              </Button>
            </div>
          </div>

          {/* Verification prompt if unverified */}
          {company.name && company.verificationStatus !== "verified" && (
            <div className={`mt-4 flex items-center gap-3 p-3 rounded-xl border text-sm ${verCfg.bg}`}>
              <VerIcon className={`h-4 w-4 shrink-0 ${verCfg.color}`} />
              <div className="flex-1">
                <span className={`font-medium ${verCfg.color}`}>{verCfg.label}: </span>
                <span className="text-muted-foreground text-xs">
                  {company.verificationStatus === "pending"
                    ? "Your CIN has been submitted. Manual review takes up to 2 business days. Jobs will be marked 'Under Review' until verified."
                    : "Verify your company's CIN to get the Approved Job badge on all your listings."}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 gap-1 text-xs"
                onClick={() => { setCompanyModalOpen(true); }}
              >
                <ShieldCheck className="h-3 w-3" />
                {company.verificationStatus === "pending" ? "View Status" : "Verify Now"}
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="glass-card rounded-2xl p-4 text-center" data-testid={`employer-stat-${i}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="flex border-b border-border">
                {(["jobs", "applicants", "company"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3.5 text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                      activeTab === tab
                        ? "bg-primary/5 text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid={`tab-employer-${tab}`}
                  >
                    {tab === "jobs" ? `Posted Jobs${postedJobs.length > 0 ? ` (${postedJobs.length})` : ""}` :
                     tab === "applicants" ? "Applicants" : "Company Details"}
                  </button>
                ))}
              </div>

              <div className="p-4 space-y-3">

                {/* Posted Jobs */}
                {activeTab === "jobs" && (
                  <>
                    {postedJobs.length === 0 ? (
                      <div className="text-center py-14 text-muted-foreground">
                        <Briefcase className="h-10 w-10 mx-auto mb-3 opacity-30" />
                        <p className="font-medium">No jobs posted yet</p>
                        <p className="text-sm mt-1">
                          {company.name
                            ? "Click 'Post a Job' to publish your first listing"
                            : "Complete your company profile first, then post jobs"}
                        </p>
                        <Button
                          className="mt-4 gap-2"
                          size="sm"
                          onClick={() => company.name ? setPostJobModalOpen(true) : setCompanyModalOpen(true)}
                        >
                          <Plus className="h-4 w-4" />
                          {company.name ? "Post First Job" : "Set Up Company"}
                        </Button>
                      </div>
                    ) : (
                      postedJobs.map(job => (
                        <div key={job.id} className="p-4 rounded-xl border border-border hover:bg-muted/20 transition-colors" data-testid={`posted-job-${job.id}`}>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-semibold">{job.title}</p>
                                {/* Approval badge */}
                                {job.isApproved ? (
                                  <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-300">
                                    <ShieldCheck className="h-3 w-3" /> Approved Job
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-300">
                                    <Clock className="h-3 w-3" /> Under Review
                                  </span>
                                )}
                                <Badge variant={job.status === "Active" ? "default" : "secondary"} className="text-xs">
                                  {job.status}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-1">
                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                                <span>{job.type}</span>
                                <span>{job.salary}</span>
                                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{job.openings} opening{job.openings !== 1 ? "s" : ""}</span>
                                <span className="flex items-center gap-1 text-red-500"><Calendar className="h-3 w-3" />Deadline: {new Date(job.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {job.status === "Active" ? (
                                <Button size="sm" variant="ghost" className="h-8 gap-1 text-xs" onClick={() => updateJob(job.id, { status: "Paused" })}>
                                  <Pause className="h-3 w-3" /> Pause
                                </Button>
                              ) : job.status === "Paused" ? (
                                <Button size="sm" variant="ghost" className="h-8 gap-1 text-xs" onClick={() => updateJob(job.id, { status: "Active" })}>
                                  <Play className="h-3 w-3" /> Resume
                                </Button>
                              ) : null}
                              <Button size="sm" variant="ghost" className="h-8 gap-1 text-xs text-red-500 hover:text-red-600" onClick={() => deleteJob(job.id)}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {job.requiredSkills.slice(0, 5).map(s => (
                              <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{s}</span>
                            ))}
                            {job.requiredSkills.length > 5 && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">+{job.requiredSkills.length - 5}</span>
                            )}
                          </div>

                          {/* Applicant progress */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{job.applicantCount} applicants</span>
                              <span>Posted {new Date(job.postedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                            </div>
                            <Progress value={Math.min(100, job.applicantCount * 2)} className="h-1.5" />
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}

                {/* Applicants (placeholder — real data comes from students applying) */}
                {activeTab === "applicants" && (
                  <div className="text-center py-14 text-muted-foreground">
                    <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No applicants yet</p>
                    <p className="text-sm mt-1">When students apply to your job listings, they will appear here.</p>
                  </div>
                )}

                {/* Company Details */}
                {activeTab === "company" && (
                  <div className="space-y-5 p-2">
                    {company.name ? (
                      <>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {[
                            { label: "Company Name", value: company.name },
                            { label: "Industry", value: company.industry },
                            { label: "Size", value: company.size },
                            { label: "Location", value: `${company.city}${company.state ? `, ${company.state}` : ""}` },
                            { label: "CIN", value: company.cin || "Not provided" },
                            { label: "GSTIN", value: company.gstin || "Not provided" },
                          ].map(({ label, value }) => value ? (
                            <div key={label}>
                              <p className="text-xs text-muted-foreground">{label}</p>
                              <p className="font-medium mt-0.5">{value}</p>
                            </div>
                          ) : null)}
                        </div>
                        {company.description && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">About</p>
                            <p className="text-sm leading-relaxed">{company.description}</p>
                          </div>
                        )}
                        <div className={`flex items-start gap-3 p-3 rounded-xl border text-sm ${verCfg.bg}`}>
                          <VerIcon className={`h-4 w-4 shrink-0 mt-0.5 ${verCfg.color}`} />
                          <div>
                            <p className={`font-semibold ${verCfg.color}`}>{verCfg.label}</p>
                            {company.verificationNote && <p className="text-xs text-muted-foreground mt-0.5">{company.verificationNote}</p>}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => setCompanyModalOpen(true)}>
                          <Edit3 className="h-3.5 w-3.5" /> Edit Company Profile
                        </Button>
                      </>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Building2 className="h-8 w-8 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">No company details yet.</p>
                        <Button variant="outline" size="sm" className="mt-3 gap-2" onClick={() => setCompanyModalOpen(true)}>
                          <Building2 className="h-3.5 w-3.5" /> Set Up Company
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

            {/* Company Completion */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Company Profile
              </h3>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-primary">{completion}%</span>
                <span className="text-sm text-muted-foreground">
                  {completion === 100 ? "Complete!" : "Fill in to get better reach"}
                </span>
              </div>
              <Progress value={completion} className="h-2.5 mb-4" />
              <div className={`flex items-center gap-2 p-3 rounded-xl border text-xs ${verCfg.bg} mb-3`}>
                <VerIcon className={`h-3.5 w-3.5 ${verCfg.color}`} />
                <span className={verCfg.color + " font-medium"}>{verCfg.label}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={() => setCompanyModalOpen(true)}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                {company.verificationStatus === "unverified" ? "Verify & Complete Profile" : "Manage Profile"}
              </Button>
            </div>

            {/* Hiring Funnel */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Hiring Funnel
              </h3>
              {[
                { stage: "Applications",  count: totalApplicants,                       percent: 100 },
                { stage: "Reviewed",      count: Math.floor(totalApplicants * 0.6),      percent: 60 },
                { stage: "Shortlisted",   count: Math.floor(totalApplicants * 0.25),     percent: 25 },
                { stage: "Interviews",    count: Math.floor(totalApplicants * 0.10),     percent: 10 },
                { stage: "Offered",       count: Math.floor(totalApplicants * 0.04),     percent: 4 },
              ].map((row, i) => (
                <div key={i} className="mb-3" data-testid={`funnel-${i}`}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{row.stage}</span>
                    <span className="font-semibold text-primary">{row.count}</span>
                  </div>
                  <Progress value={row.percent} className="h-1.5" />
                </div>
              ))}
            </div>

            {/* Notifications */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                Notifications
              </h3>
              <div className="space-y-3">
                {notifs.length > 0 ? notifs.map(n => (
                  <div key={n.id} className="p-3 rounded-xl bg-muted/50 text-sm" data-testid={`employer-notification-${n.id}`}>
                    <p className="font-medium mb-0.5 text-xs leading-relaxed">{n.message}</p>
                    <p className="text-xs text-muted-foreground">{n.time}</p>
                  </div>
                )) : (
                  <p className="text-sm text-muted-foreground text-center py-3">Post a job to see notifications here.</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "Post a New Job", icon: Plus, action: () => setPostJobModalOpen(true) },
                  { label: "Verify Company", icon: ShieldCheck, action: () => setCompanyModalOpen(true) },
                  { label: "Edit Company Profile", icon: Building2, action: () => setCompanyModalOpen(true) },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium hover:bg-muted/60 transition-colors text-left"
                    data-testid={`quick-action-${i}`}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-primary" />
                      {item.label}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CompanySetupModal
        open={companyModalOpen}
        onClose={() => setCompanyModalOpen(false)}
        company={company}
        onSave={updateCompany}
        onVerify={verifyCompany}
        verifying={verifying}
        verificationResult={verificationResult}
      />

      <PostJobModal
        open={postJobModalOpen}
        onClose={() => setPostJobModalOpen(false)}
        companyName={company.name}
        verificationStatus={company.verificationStatus}
        onPost={postJob}
      />
    </div>
  );
}
