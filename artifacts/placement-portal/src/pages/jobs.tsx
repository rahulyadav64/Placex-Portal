import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search, MapPin, IndianRupee, ChevronRight, Filter,
  Building2, ShieldCheck, Briefcase, ExternalLink, Users, Calendar,
  Loader2, RefreshCw, Clock, Star, AlertCircle
} from "lucide-react";
import { governmentJobs as fallbackGovtJobs, type Job } from "@/lib/mock-data";
import type { PostedJob } from "@/lib/employer-profile";

type Category = "private" | "government" | "portal";

async function fetchPortalJobsFromAPI(): Promise<PostedJob[]> {
  try {
    const res = await fetch("/api/jobs/portal");
    if (!res.ok) throw new Error("fetch failed");
    const data = await res.json() as { jobs: PostedJob[] };
    return data.jobs || [];
  } catch {
    try {
      const raw = localStorage.getItem("employer_jobs_v1");
      return raw ? (JSON.parse(raw) as PostedJob[]).filter(j => j.status === "Active") : [];
    } catch {
      return [];
    }
  }
}

const API_BASE = "/api";
const CACHE_KEY_PRIVATE = "jobs_private_cache";
const CACHE_KEY_GOVT = "jobs_govt_cache";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

interface CachedData {
  jobs: Job[];
  fetchedAt: number;
}

function readCache(key: string): CachedData | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const data: CachedData = JSON.parse(raw);
    if (Date.now() - data.fetchedAt > CACHE_TTL_MS) {
      sessionStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function writeCache(key: string, jobs: Job[]) {
  try {
    const data: CachedData = { jobs, fetchedAt: Date.now() };
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch {
  }
}

function formatTimeAgo(ts: number): string {
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
}

export default function Jobs() {
  const [category, setCategory] = useState<Category>("private");
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [privateJobs, setPrivateJobs] = useState<Job[]>([]);
  const [govtJobs, setGovtJobs] = useState<Job[]>(fallbackGovtJobs);
  const [portalJobs, setPortalJobs] = useState<PostedJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [nextRefreshIn, setNextRefreshIn] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat === "government" || cat === "private" || cat === "portal") {
      setCategory(cat);
    }
  }, []);

  useEffect(() => {
    if (category === "portal") {
      fetchPortalJobsFromAPI().then(jobs => setPortalJobs(jobs));
    }
  }, [category]);

  const fetchPrivateJobs = useCallback(async (force = false) => {
    if (!force) {
      const cached = readCache(CACHE_KEY_PRIVATE);
      if (cached) {
        setPrivateJobs(cached.jobs);
        setFetchedAt(cached.fetchedAt);
        return;
      }
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/jobs/private`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      const jobs: Job[] = data.jobs || [];
      setPrivateJobs(jobs);
      setFetchedAt(data.fetchedAt || Date.now());
      writeCache(CACHE_KEY_PRIVATE, jobs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchGovtJobs = useCallback(async () => {
    const cached = readCache(CACHE_KEY_GOVT);
    if (cached) {
      setGovtJobs(cached.jobs);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/jobs/government`);
      if (!res.ok) return;
      const data = await res.json();
      const jobs: Job[] = data.jobs || [];
      setGovtJobs(jobs);
      writeCache(CACHE_KEY_GOVT, jobs);
    } catch {
    }
  }, []);

  useEffect(() => {
    fetchPrivateJobs();
    fetchGovtJobs();
  }, [fetchPrivateJobs, fetchGovtJobs]);

  useEffect(() => {
    if (!fetchedAt) return;
    const update = () => {
      const remaining = CACHE_TTL_MS - (Date.now() - fetchedAt);
      if (remaining <= 0) {
        fetchPrivateJobs(true);
        return;
      }
      const hrs = Math.floor(remaining / 3600000);
      const mins = Math.floor((remaining % 3600000) / 60000);
      setNextRefreshIn(hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [fetchedAt, fetchPrivateJobs]);

  const currentJobs: Job[] = category === "private" ? privateJobs : category === "government" ? govtJobs : [];
  const allLocations = ["all", ...Array.from(new Set(currentJobs.flatMap(j => j.location.split(" / "))))].slice(0, 20);
  const allTypes = ["all", ...Array.from(new Set(currentJobs.map(j => j.type)))];

  const filtered = currentJobs.filter((j) => {
    const matchSearch =
      !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.requiredSkills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchLocation = locationFilter === "all" || j.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchType = typeFilter === "all" || j.type === typeFilter;
    return matchSearch && matchLocation && matchType;
  });

  const filteredPortal = portalJobs.filter(j => {
    const matchSearch =
      !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.requiredSkills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchLocation = locationFilter === "all" || j.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchType = typeFilter === "all" || j.type === typeFilter;
    return matchSearch && matchLocation && matchType;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 z-0" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/15 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gradient">Find Your Dream Job</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Browse real opportunities from LinkedIn, Indeed, Glassdoor and official Indian government portals
          </p>

          {/* Category Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-muted rounded-2xl p-1.5 gap-1 shadow-inner">
              <button
                onClick={() => { setCategory("private"); setLocationFilter("all"); setTypeFilter("all"); }}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-250 ${
                  category === "private"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="tab-private"
              >
                <Briefcase className="h-4 w-4" />
                Private Jobs
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${category === "private" ? "bg-white/20" : "bg-muted-foreground/15"}`}>
                  {loading && category === "private" ? "..." : privateJobs.length}
                </span>
              </button>
              <button
                onClick={() => { setCategory("government"); setLocationFilter("all"); setTypeFilter("all"); }}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-250 ${
                  category === "government"
                    ? "bg-amber-500 text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="tab-government"
              >
                <ShieldCheck className="h-4 w-4" />
                Government Jobs
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${category === "government" ? "bg-white/20" : "bg-muted-foreground/15"}`}>
                  {govtJobs.length}
                </span>
              </button>
              <button
                onClick={() => { setCategory("portal"); setLocationFilter("all"); setTypeFilter("all"); fetchPortalJobsFromAPI().then(jobs => setPortalJobs(jobs)); }}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-250 ${
                  category === "portal"
                    ? "bg-violet-600 text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="tab-portal"
              >
                <Star className="h-4 w-4" />
                PlaceX Jobs
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${category === "portal" ? "bg-white/20" : "bg-muted-foreground/15"}`}>
                  {portalJobs.length}
                </span>
              </button>
            </div>
          </div>

          {/* Category info banner */}
          {category === "government" ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-700 text-sm font-medium mb-6 border border-amber-200">
              <ShieldCheck className="h-4 w-4" />
              Sourced from official Indian Government portals — SSC, UPSC, IBPS, ISRO, DRDO & more
            </div>
          ) : category === "portal" ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-700 text-sm font-medium mb-6 border border-violet-200">
              <Star className="h-4 w-4" />
              Jobs posted directly by recruiters registered on PlaceX
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                <Briefcase className="h-4 w-4" />
                Live jobs from LinkedIn, Indeed, Glassdoor — updated every 12 hours
              </div>
              {fetchedAt && (
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Fetched {formatTimeAgo(fetchedAt)}
                  </span>
                  {nextRefreshIn && (
                    <span className="flex items-center gap-1">
                      <RefreshCw className="h-3 w-3" />
                      Next refresh in {nextRefreshIn}
                    </span>
                  )}
                  <button
                    onClick={() => fetchPrivateJobs(true)}
                    className="flex items-center gap-1 text-primary hover:underline font-medium"
                    disabled={loading}
                  >
                    <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
                    Refresh now
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Search & Filters */}
          <div className="max-w-3xl mx-auto glass-card rounded-2xl p-4 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={category === "government" ? "Search by role, department, or skill..." : "Search by role, company, or skill..."}
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="input-job-search"
              />
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="md:w-44" data-testid="select-location">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {allLocations.slice(1).map((l) => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="md:w-40" data-testid="select-type">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                {allTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t === "all" ? "All Types" : t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="gap-2" data-testid="btn-search-jobs">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="pb-20">
        <div className="container mx-auto px-4">

          {/* Loading state */}
          {loading && category === "private" && (
            <div className="text-center py-16">
              <Loader2 className="h-10 w-10 mx-auto mb-4 animate-spin text-primary" />
              <p className="text-lg font-medium text-foreground">Fetching live jobs from LinkedIn, Indeed & more...</p>
              <p className="text-sm text-muted-foreground mt-1">This may take a moment</p>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="text-center py-12 glass-card rounded-2xl mb-6 border border-red-200">
              <p className="text-red-500 font-medium mb-2">Could not load live jobs</p>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => fetchPrivateJobs(true)} variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" /> Try Again
              </Button>
            </div>
          )}

          {/* Job count */}
          {!loading && category !== "portal" && (
            <div className="flex justify-between items-center mb-5">
              <p className="text-muted-foreground" data-testid="text-job-count">
                Showing <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                {category === "government" ? "Government" : "Private"} jobs
                {search && ` matching "${search}"`}
              </p>
              {category === "private" && privateJobs.length > 0 && (
                <p className="text-xs text-muted-foreground">{privateJobs.length} total live listings</p>
              )}
            </div>
          )}

          {/* Portal jobs count */}
          {category === "portal" && (
            <div className="flex justify-between items-center mb-5">
              <p className="text-muted-foreground" data-testid="text-job-count">
                Showing <span className="font-semibold text-foreground">{filteredPortal.length}</span> PlaceX recruiter jobs
                {search && ` matching "${search}"`}
              </p>
              <Link href="/dashboard/employer">
                <Button size="sm" variant="outline" className="gap-1.5 text-xs border-violet-300 text-violet-700 hover:bg-violet-50">
                  <Star className="h-3 w-3" /> Post a Job
                </Button>
              </Link>
            </div>
          )}

          {/* Job cards (private + government only) */}
          {!loading && category !== "portal" && (
            <div className="grid gap-4">
              {filtered.map((job) => (
                <div
                  key={job.id}
                  className={`glass-card rounded-2xl p-6 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg group border-l-4 ${
                    job.category === "government" ? "border-l-amber-400" : "border-l-primary"
                  }`}
                  data-testid={`card-job-${job.id}`}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Logo / Icon */}
                    <div className="flex-shrink-0">
                      {(job as Job & { logo?: string }).logo ? (
                        <img
                          src={(job as Job & { logo?: string }).logo}
                          alt={job.company}
                          className="w-12 h-12 rounded-xl object-contain bg-white border border-gray-100 p-1"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      ) : (
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          job.category === "government" ? "bg-amber-500/10" : "bg-primary/10"
                        }`}>
                          {job.category === "government"
                            ? <ShieldCheck className="h-6 w-6 text-amber-600" />
                            : <Building2 className="h-6 w-6 text-primary" />
                          }
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1.5">
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug" data-testid={`text-job-title-${job.id}`}>
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge
                            variant={job.type === "Internship" ? "secondary" : "default"}
                            className={job.category === "government" ? "bg-amber-500/15 text-amber-700 border border-amber-200" : ""}
                          >
                            {job.type}
                          </Badge>
                          {job.category === "government" && (
                            <Badge className="bg-green-500/10 text-green-700 border border-green-200">
                              Govt.
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className={`font-semibold mb-3 ${job.category === "government" ? "text-amber-700" : "text-primary"}`} data-testid={`text-company-${job.id}`}>
                        {job.company}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-3.5 w-3.5" /> {job.salary}
                        </span>
                        {(job as Job & { vacancies?: number }).vacancies && (
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" /> {(job as Job & { vacancies?: number }).vacancies!.toLocaleString()} vacancies
                          </span>
                        )}
                        {(job as Job & { lastDate?: string }).lastDate && (
                          <span className="flex items-center gap-1 text-red-500 font-medium">
                            <Calendar className="h-3.5 w-3.5" /> Last date: {(job as Job & { lastDate?: string }).lastDate}
                          </span>
                        )}
                        {(job as Job & { postedAt?: string }).postedAt && (
                          <span className="flex items-center gap-1 text-green-600 font-medium text-xs">
                            <Clock className="h-3 w-3" /> Live listing
                          </span>
                        )}
                      </div>

                      {job.requiredSkills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.requiredSkills.map((skill) => (
                            <span key={skill} className={`px-2.5 py-0.5 text-xs rounded-full font-medium ${
                              job.category === "government"
                                ? "bg-amber-500/10 text-amber-700"
                                : "bg-primary/10 text-primary"
                            }`}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{job.description}</p>

                      {/* Source */}
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <ExternalLink className="h-3 w-3" />
                        <span>Source:</span>
                        <a
                          href={job.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`font-semibold hover:underline ${job.category === "government" ? "text-amber-600" : "text-primary"}`}
                          data-testid={`link-source-${job.id}`}
                        >
                          {job.source}
                        </a>
                      </div>
                    </div>

                    {/* Apply CTA */}
                    <div className="flex-shrink-0 flex flex-col gap-2">
                      <a
                        href={job.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className={`gap-1.5 w-full ${
                            job.category === "government"
                              ? "border-amber-400 text-amber-700 hover:bg-amber-500 hover:text-white"
                              : "hover:bg-primary hover:text-primary-foreground"
                          } transition-colors`}
                          data-testid={`btn-apply-${job.id}`}
                        >
                          {job.category === "government" ? "Apply on Official Site" : "Apply Now"}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      </a>
                      <Link href="/register">
                        <Button size="sm" variant="ghost" className="gap-1 w-full text-xs">
                          Save Job <ChevronRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && category !== "portal" && (
            <div className="text-center py-20 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No jobs found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}

          {/* Portal Jobs */}
          {category === "portal" && (
            <>
              {filteredPortal.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <Star className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No PlaceX jobs yet</p>
                  <p className="text-sm mt-1 mb-5">Jobs posted by recruiters on this portal will appear here.</p>
                  <Link href="/dashboard/employer">
                    <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                      <Star className="h-4 w-4" /> Register as Recruiter & Post Jobs
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredPortal.map(job => (
                    <div
                      key={job.id}
                      className="glass-card rounded-2xl p-6 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg group border-l-4 border-l-violet-500"
                      data-testid={`card-portal-job-${job.id}`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-violet-500/10">
                            <Building2 className="h-6 w-6 text-violet-600" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1.5">
                            <h3 className="text-lg font-bold group-hover:text-violet-600 transition-colors leading-snug">
                              {job.title}
                            </h3>
                            <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                              <Badge variant="secondary">{job.type}</Badge>
                              {job.isApproved ? (
                                <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 border border-green-300">
                                  <ShieldCheck className="h-3 w-3" /> Approved Job
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-300">
                                  <AlertCircle className="h-3 w-3" /> Unverified
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="font-semibold mb-3 text-violet-600">Posted via PlaceX</p>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" /> {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <IndianRupee className="h-3.5 w-3.5" /> {job.salary}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" /> {job.openings} opening{job.openings !== 1 ? "s" : ""}
                            </span>
                            <span className="flex items-center gap-1 text-red-500 font-medium">
                              <Calendar className="h-3.5 w-3.5" /> Deadline: {new Date(job.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                          </div>

                          {job.requiredSkills.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {job.requiredSkills.map(skill => (
                                <span key={skill} className="px-2.5 py-0.5 text-xs rounded-full font-medium bg-violet-500/10 text-violet-700">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}

                          <p className="text-sm text-muted-foreground mb-2 leading-relaxed line-clamp-2">{job.description}</p>

                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Star className="h-3 w-3 text-violet-500" />
                            <span>Posted on PlaceX · {new Date(job.postedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                          </div>
                        </div>

                        <div className="flex-shrink-0 flex flex-col gap-2">
                          <Link href="/dashboard/student">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1.5 w-full border-violet-400 text-violet-700 hover:bg-violet-600 hover:text-white transition-colors"
                            >
                              Apply Now <ChevronRight className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                          <Link href="/register">
                            <Button size="sm" variant="ghost" className="gap-1 w-full text-xs">
                              Save Job <ChevronRight className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
