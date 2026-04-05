import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Briefcase, IndianRupee, Clock, ChevronRight, Filter, Building2 } from "lucide-react";
import { jobs } from "@/lib/mock-data";

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const locations = ["all", "Bangalore", "Hyderabad", "Mumbai", "Pune", "Delhi", "Remote"];
  const types = ["all", "Full-time", "Internship", "Part-time"];

  const filtered = jobs.filter((j) => {
    const matchSearch =
      !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.requiredSkills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchLocation = locationFilter === "all" || j.location === locationFilter;
    const matchType = typeFilter === "all" || j.type === typeFilter;
    return matchSearch && matchLocation && matchType;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Find Your Dream Job</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Browse thousands of opportunities across India from top employers</p>
          </div>
          <div className="max-w-3xl mx-auto glass-card rounded-2xl p-4 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Job title, company, or skill..."
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
                {locations.map((l) => (
                  <SelectItem key={l} value={l}>{l === "all" ? "All Locations" : l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="md:w-40" data-testid="select-type">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((t) => (
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
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground" data-testid="text-job-count">Showing <span className="font-semibold text-foreground">{filtered.length}</span> jobs</p>
            <Select defaultValue="newest">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="salary">Highest Salary</SelectItem>
                <SelectItem value="relevance">Most Relevant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filtered.map((job) => (
              <div
                key={job.id}
                className="glass-card rounded-2xl p-6 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg group"
                data-testid={`card-job-${job.id}`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors" data-testid={`text-job-title-${job.id}`}>{job.title}</h3>
                      <Badge
                        variant={job.type === "Internship" ? "secondary" : "default"}
                        className="w-fit"
                        data-testid={`badge-job-type-${job.id}`}
                      >
                        {job.type}
                      </Badge>
                    </div>
                    <p className="text-primary font-medium mb-3" data-testid={`text-company-${job.id}`}>{job.company}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <IndianRupee className="h-3.5 w-3.5" /> {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> Posted 3 days ago
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requiredSkills.map((skill) => (
                        <span key={skill} className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{job.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Link href="/register">
                      <Button variant="outline" size="sm" className="gap-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors" data-testid={`btn-apply-${job.id}`}>
                        Apply Now <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No jobs found</p>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
