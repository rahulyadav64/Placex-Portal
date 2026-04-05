import { useState, useEffect, useCallback } from "react";
import {
  Shield, Briefcase, CheckCircle2, Clock, XCircle, Trash2,
  RefreshCw, LogOut, MapPin, Users, Calendar, ChevronDown, ChevronUp,
  ShieldCheck, AlertCircle, Building2, Star, Search, Filter,
  TrendingUp, Eye, MessageSquare, X
} from "lucide-react";

interface PortalJob {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  type: string;
  requiredSkills: string[];
  openings: number;
  deadline: string;
  status: string;
  isApproved: boolean;
  applicantCount: number;
  postedAt: string;
  companyName: string;
  companyVerificationStatus: string;
  rejectionReason?: string;
}

interface Stats {
  total: number;
  pending: number;
  approved: number;
}

interface Props {
  adminKey: string;
  onLogout: () => void;
}

type FilterTab = "all" | "pending" | "approved" | "rejected";

function RejectModal({ job, onConfirm, onClose }: { job: PortalJob; onConfirm: (reason: string) => void; onClose: () => void }) {
  const [reason, setReason] = useState("");
  const PRESET_REASONS = [
    "Incomplete or misleading job description",
    "Salary information not disclosed",
    "Company information cannot be verified",
    "Duplicate listing",
    "Does not meet PlaceX quality standards",
    "Spam or suspicious listing",
  ];
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl p-6 w-full max-w-md border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-red-400">Reject Job Listing</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Rejecting: <span className="font-semibold text-foreground">"{job.title}"</span></p>
        <div className="space-y-2 mb-4">
          <p className="text-xs font-medium text-muted-foreground">Quick reasons:</p>
          {PRESET_REASONS.map(r => (
            <button key={r} onClick={() => setReason(r)} className={`w-full text-left text-xs p-2.5 rounded-lg border transition-colors ${reason === r ? "border-red-500/50 bg-red-500/10 text-red-400" : "border-border hover:bg-muted/50"}`}>
              {r}
            </button>
          ))}
        </div>
        <textarea
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder="Or type a custom reason..."
          className="w-full bg-input border border-border rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none min-h-[70px]"
        />
        <div className="flex gap-3 mt-4">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl border border-border text-sm hover:bg-muted/50 transition-colors">Cancel</button>
          <button
            onClick={() => onConfirm(reason || "Does not meet PlaceX quality standards.")}
            className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
          >
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ adminKey, onLogout }: Props) {
  const [jobs, setJobs] = useState<PortalJob[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, approved: 0 });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<FilterTab>("pending");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [rejectingJob, setRejectingJob] = useState<PortalJob | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const authHeaders = { "x-admin-key": adminKey, "Content-Type": "application/json" };

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/jobs", { headers: authHeaders });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json() as { jobs: PortalJob[]; stats: Stats };
      setJobs(data.jobs);
      setStats(data.stats);
    } catch {
      onLogout();
    } finally {
      setLoading(false);
    }
  }, [adminKey]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const approveJob = async (id: string) => {
    setActionLoading(id + "_approve");
    try {
      await fetch(`/api/admin/jobs/${id}/approve`, { method: "POST", headers: authHeaders });
      await fetchJobs();
    } finally { setActionLoading(null); }
  };

  const rejectJob = async (id: string, reason: string) => {
    setActionLoading(id + "_reject");
    try {
      await fetch(`/api/admin/jobs/${id}/reject`, {
        method: "POST", headers: authHeaders,
        body: JSON.stringify({ reason }),
      });
      setRejectingJob(null);
      await fetchJobs();
    } finally { setActionLoading(null); }
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Permanently delete this job listing?")) return;
    setActionLoading(id + "_delete");
    try {
      await fetch(`/api/admin/jobs/${id}`, { method: "DELETE", headers: authHeaders });
      await fetchJobs();
    } finally { setActionLoading(null); }
  };

  const filteredJobs = jobs.filter(j => {
    const matchTab =
      activeTab === "all" ? true :
      activeTab === "pending" ? (!j.isApproved && j.status === "Active") :
      activeTab === "approved" ? j.isApproved :
      activeTab === "rejected" ? j.status === "Closed" : true;
    const matchSearch = !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.companyName.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const statusBadge = (job: PortalJob) => {
    if (job.isApproved) return { label: "Approved", cls: "bg-green-500/15 text-green-400 border-green-500/30", icon: CheckCircle2 };
    if (job.status === "Closed") return { label: "Rejected", cls: "bg-red-500/15 text-red-400 border-red-500/30", icon: XCircle };
    return { label: "Pending Review", cls: "bg-amber-500/15 text-amber-400 border-amber-500/30", icon: Clock };
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="admin-sidebar w-64 shrink-0 flex flex-col p-5 fixed inset-y-0 left-0 z-40">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-purple-500/20 rounded-xl border border-purple-500/30 flex items-center justify-center">
            <Shield className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h1 className="font-bold text-white text-sm">PlaceX Admin</h1>
            <p className="text-xs text-muted-foreground">Control Panel</p>
          </div>
        </div>

        <nav className="space-y-1 flex-1">
          {[
            { label: "Job Moderation", icon: Briefcase, tab: "pending" as FilterTab, count: stats.pending },
            { label: "Approved Jobs", icon: CheckCircle2, tab: "approved" as FilterTab, count: stats.approved },
            { label: "Rejected Jobs", icon: XCircle, tab: "rejected" as FilterTab, count: null },
            { label: "All Listings", icon: Eye, tab: "all" as FilterTab, count: stats.total },
          ].map(item => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.tab
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                {item.label}
              </div>
              {item.count !== null && item.count > 0 && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  item.tab === "pending" ? "bg-amber-500/20 text-amber-400" : "bg-muted text-muted-foreground"
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {activeTab === "pending" ? "Pending Review" :
               activeTab === "approved" ? "Approved Jobs" :
               activeTab === "rejected" ? "Rejected Jobs" : "All Listings"}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {filteredJobs.length} listing{filteredJobs.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={fetchJobs}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm hover:bg-muted/50 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Listings", value: stats.total, icon: Briefcase, color: "text-blue-400" },
            { label: "Pending Review", value: stats.pending, icon: Clock, color: "text-amber-400" },
            { label: "Approved Jobs", value: stats.approved, icon: CheckCircle2, color: "text-green-400" },
          ].map((s, i) => (
            <div key={i} className="glass-card rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-muted/50 rounded-xl flex items-center justify-center shrink-0">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by job title or company..."
            className="w-full bg-input border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Job list */}
        {loading && filteredJobs.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <RefreshCw className="h-8 w-8 mx-auto mb-3 animate-spin opacity-50" />
            <p>Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="font-medium">
              {activeTab === "pending" ? "No jobs pending review" :
               activeTab === "approved" ? "No approved jobs yet" :
               "No listings found"}
            </p>
            {activeTab === "pending" && <p className="text-sm mt-1">When recruiters post jobs on PlaceX, they will appear here for moderation.</p>}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredJobs.map(job => {
              const badge = statusBadge(job);
              const BadgeIcon = badge.icon;
              const isExpanded = expandedId === job.id;
              return (
                <div key={job.id} className="glass-card rounded-2xl overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center shrink-0">
                        <Building2 className="h-5 w-5 text-purple-400" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div>
                            <h3 className="font-bold text-white">{job.title}</h3>
                            <p className="text-sm text-purple-400 font-medium">{job.companyName || "Unknown Company"}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 flex-wrap">
                            <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-medium ${badge.cls}`}>
                              <BadgeIcon className="h-3 w-3" /> {badge.label}
                            </span>
                            {job.companyVerificationStatus === "verified" ? (
                              <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                                <ShieldCheck className="h-3 w-3" /> Verified Company
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30">
                                <AlertCircle className="h-3 w-3" />
                                {job.companyVerificationStatus === "pending" ? "Pending Verify" : "Unverified"}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-2">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                          <span>{job.type}</span>
                          <span>{job.salary}</span>
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{job.openings} opening{job.openings !== 1 ? "s" : ""}</span>
                          <span className="flex items-center gap-1 text-red-400"><Calendar className="h-3 w-3" />Deadline: {new Date(job.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                          <span className="text-muted-foreground/60">Posted {new Date(job.postedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {job.requiredSkills.slice(0, 5).map(s => (
                            <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">{s}</span>
                          ))}
                          {job.requiredSkills.length > 5 && <span className="text-xs text-muted-foreground">+{job.requiredSkills.length - 5}</span>}
                        </div>

                        {job.rejectionReason && (
                          <div className="mt-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                            <span className="font-semibold">Rejection reason: </span>{job.rejectionReason}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 shrink-0">
                        {!job.isApproved && job.status === "Active" && (
                          <>
                            <button
                              onClick={() => approveJob(job.id)}
                              disabled={!!actionLoading}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {actionLoading === job.id + "_approve" ? "..." : "Approve"}
                            </button>
                            <button
                              onClick={() => setRejectingJob(job)}
                              disabled={!!actionLoading}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/80 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors"
                            >
                              <XCircle className="h-3.5 w-3.5" />
                              Reject
                            </button>
                          </>
                        )}
                        {job.isApproved && (
                          <button
                            onClick={() => setRejectingJob(job)}
                            disabled={!!actionLoading}
                            className="flex items-center gap-1.5 px-3 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 disabled:opacity-50 rounded-lg text-xs font-semibold transition-colors"
                          >
                            <XCircle className="h-3.5 w-3.5" /> Revoke
                          </button>
                        )}
                        <button
                          onClick={() => deleteJob(job.id)}
                          disabled={!!actionLoading}
                          className="flex items-center gap-1.5 px-3 py-1.5 border border-border text-muted-foreground hover:text-red-400 hover:border-red-500/30 disabled:opacity-50 rounded-lg text-xs transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          {actionLoading === job.id + "_delete" ? "..." : "Delete"}
                        </button>
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : job.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 border border-border text-muted-foreground hover:text-foreground rounded-lg text-xs transition-colors"
                        >
                          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                          {isExpanded ? "Less" : "More"}
                        </button>
                      </div>
                    </div>

                    {/* Expanded description */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">JOB DESCRIPTION</p>
                        <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{job.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {rejectingJob && (
        <RejectModal
          job={rejectingJob}
          onConfirm={(reason) => rejectJob(rejectingJob.id, reason)}
          onClose={() => setRejectingJob(null)}
        />
      )}
    </div>
  );
}
