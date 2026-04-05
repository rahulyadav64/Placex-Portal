import { Router, type IRouter } from "express";

const router: IRouter = Router();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";
const JSEARCH_HOST = "jsearch.p.rapidapi.com";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

interface CacheEntry {
  data: unknown;
  fetchedAt: number;
}

const cache = new Map<string, CacheEntry>();

async function fetchJSearch(query: string, numPages = 3): Promise<unknown[]> {
  const cacheKey = `${query}:${numPages}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.data as unknown[];
  }

  const results: unknown[] = [];
  for (let page = 1; page <= numPages; page++) {
    const url = new URL(`https://${JSEARCH_HOST}/search`);
    url.searchParams.set("query", query);
    url.searchParams.set("page", String(page));
    url.searchParams.set("num_pages", "1");
    url.searchParams.set("country", "in");
    url.searchParams.set("date_posted", "month");

    const res = await fetch(url.toString(), {
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": JSEARCH_HOST,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`JSearch error ${res.status}: ${text}`);
    }

    const json = (await res.json()) as { data?: unknown[] };
    if (json.data && Array.isArray(json.data)) {
      results.push(...json.data);
    }
  }

  cache.set(cacheKey, { data: results, fetchedAt: Date.now() });
  return results;
}

interface JSearchJob {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
  job_employment_type?: string;
  job_description?: string;
  job_required_skills?: string[];
  job_min_salary?: number;
  job_max_salary?: number;
  job_salary_currency?: string;
  job_salary_period?: string;
  job_apply_link?: string;
  job_publisher?: string;
  job_posted_at_datetime_utc?: string;
}

function formatSalary(job: JSearchJob): string {
  if (job.job_min_salary && job.job_max_salary) {
    const currency = job.job_salary_currency === "INR" ? "₹" : (job.job_salary_currency || "");
    const period = job.job_salary_period === "YEAR" ? "/yr" : (job.job_salary_period === "MONTH" ? "/mo" : "");
    const fmt = (n: number) => n >= 100000 ? `${(n / 100000).toFixed(1)}L` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : String(n);
    return `${currency}${fmt(job.job_min_salary)} – ${currency}${fmt(job.job_max_salary)}${period}`;
  }
  return "Salary not disclosed";
}

function formatLocation(job: JSearchJob): string {
  const parts = [job.job_city, job.job_state].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : (job.job_country || "India");
}

function normalizeJobType(type?: string): string {
  if (!type) return "Full-time";
  const t = type.toUpperCase();
  if (t === "FULLTIME") return "Full-time";
  if (t === "PARTTIME") return "Part-time";
  if (t === "INTERN") return "Internship";
  if (t === "CONTRACTOR") return "Contract";
  return type;
}

function extractSkills(job: JSearchJob): string[] {
  if (job.job_required_skills && job.job_required_skills.length > 0) {
    return job.job_required_skills.slice(0, 6);
  }
  const desc = (job.job_description || "").toLowerCase();
  const candidates = [
    "React", "Angular", "Vue", "JavaScript", "TypeScript", "Node.js",
    "Python", "Java", "Go", "C++", "C#", ".NET", "Spring Boot",
    "AWS", "Azure", "GCP", "Docker", "Kubernetes", "SQL", "MongoDB",
    "PostgreSQL", "REST API", "GraphQL", "Machine Learning", "AI",
    "Data Science", "TensorFlow", "PyTorch", "Figma", "Flutter", "Kotlin",
  ];
  return candidates.filter(skill => desc.includes(skill.toLowerCase())).slice(0, 5);
}

router.get("/jobs/private", async (_req, res) => {
  if (!RAPIDAPI_KEY) {
    res.status(503).json({ error: "RAPIDAPI_KEY not configured" });
    return;
  }

  try {
    const queries = [
      "software engineer India",
      "web developer India",
      "data scientist India",
      "frontend developer India",
      "backend developer India",
    ];

    const allRaw = await Promise.all(queries.map(q => fetchJSearch(q, 2)));
    const flat = allRaw.flat() as JSearchJob[];

    const seen = new Set<string>();
    const jobs = flat
      .filter(j => {
        if (!j.job_id || seen.has(j.job_id)) return false;
        seen.add(j.job_id);
        return true;
      })
      .map(j => ({
        id: j.job_id,
        title: j.job_title,
        company: j.employer_name,
        logo: j.employer_logo || null,
        location: formatLocation(j),
        salary: formatSalary(j),
        type: normalizeJobType(j.job_employment_type),
        description: (j.job_description || "").substring(0, 400).replace(/\n+/g, " ").trim(),
        requiredSkills: extractSkills(j),
        category: "private",
        source: j.job_publisher || "LinkedIn",
        sourceUrl: j.job_apply_link || "https://linkedin.com/jobs",
        postedAt: j.job_posted_at_datetime_utc || null,
      }));

    res.json({ jobs, total: jobs.length, fetchedAt: Date.now() });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

router.get("/jobs/government", (_req, res) => {
  const governmentJobs = [
    {
      id: "g1",
      title: "Combined Graduate Level (CGL) – Assistant Section Officer",
      company: "Staff Selection Commission (SSC)",
      location: "All India",
      salary: "₹44,900 – ₹1,42,400 (Level 8)",
      type: "Full-time",
      description: "SSC CGL 2024 notification for Group B & C posts in various Ministries, Departments and Organisations of the Government of India.",
      requiredSkills: ["General Intelligence", "English", "Quantitative Aptitude", "General Awareness"],
      category: "government",
      source: "SSC Official Portal",
      sourceUrl: "https://ssc.nic.in/",
      lastDate: "31 Mar 2025",
      vacancies: 17727,
    },
    {
      id: "g2",
      title: "Civil Services Examination – IAS / IPS / IFS",
      company: "Union Public Service Commission (UPSC)",
      location: "All India",
      salary: "₹56,100 – ₹2,50,000 (Level 10 and above)",
      type: "Full-time",
      description: "UPSC Civil Services Exam 2024 for recruitment to IAS, IPS, IFS and other Group A & B Central Services.",
      requiredSkills: ["General Studies", "Optional Subject", "Essay", "Current Affairs"],
      category: "government",
      source: "UPSC Official Website",
      sourceUrl: "https://upsc.gov.in/",
      lastDate: "20 Feb 2025",
      vacancies: 1056,
    },
    {
      id: "g3",
      title: "RRB NTPC – Junior Clerk cum Typist / Station Master",
      company: "Railway Recruitment Boards (RRB) – Indian Railways",
      location: "Pan India (Zonal Railways)",
      salary: "₹19,900 – ₹63,200",
      type: "Full-time",
      description: "RRB NTPC 2024 recruitment for Non-Technical Popular Category posts across Indian Railways zones.",
      requiredSkills: ["General Awareness", "Mathematics", "General Intelligence", "Typing"],
      category: "government",
      source: "Indian Railways – RRB Portal",
      sourceUrl: "https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,304,366,554",
      lastDate: "31 Jan 2025",
      vacancies: 11558,
    },
    {
      id: "g4",
      title: "Probationary Officer (PO)",
      company: "State Bank of India (SBI)",
      location: "All India",
      salary: "₹41,960 – ₹63,840 (with perks)",
      type: "Full-time",
      description: "SBI PO 2024 recruitment for Probationary Officers. One of the most prestigious banking jobs in India.",
      requiredSkills: ["Reasoning", "Quantitative Aptitude", "English Language", "Banking Awareness"],
      category: "government",
      source: "SBI Careers Portal",
      sourceUrl: "https://bank.sbi/web/careers",
      lastDate: "07 Dec 2024",
      vacancies: 600,
    },
    {
      id: "g5",
      title: "IBPS PO – Probationary Officer",
      company: "Institute of Banking Personnel Selection (IBPS)",
      location: "All India (Participating Banks)",
      salary: "₹36,000 – ₹63,840",
      type: "Full-time",
      description: "IBPS PO CRP-XIV recruitment for Probationary Officers in various public sector banks across India.",
      requiredSkills: ["Reasoning & Computer Aptitude", "English Language", "Data Analysis", "General Economy/Banking"],
      category: "government",
      source: "IBPS Official Website",
      sourceUrl: "https://www.ibps.in/",
      lastDate: "27 Oct 2024",
      vacancies: 4455,
    },
    {
      id: "g6",
      title: "Scientist / Engineer 'SC'",
      company: "Defence Research and Development Organisation (DRDO)",
      location: "New Delhi / Hyderabad / Pune / Bangalore",
      salary: "₹56,100 – ₹1,77,500 (Level 10)",
      type: "Full-time",
      description: "DRDO recruitment for Scientist posts in Computer Science, Electronics, and Mechanical Engineering disciplines.",
      requiredSkills: ["B.E./B.Tech (CS/EC/ME)", "Research Aptitude", "GATE Score", "Technical Knowledge"],
      category: "government",
      source: "DRDO Official Website",
      sourceUrl: "https://www.drdo.gov.in/careers",
      lastDate: "15 Jan 2025",
      vacancies: 228,
    },
    {
      id: "g7",
      title: "Scientist / Engineer (Computer Science)",
      company: "Indian Space Research Organisation (ISRO)",
      location: "Bangalore / Thiruvananthapuram / Ahmedabad",
      salary: "₹56,100 – ₹1,77,500",
      type: "Full-time",
      description: "ISRO ICRB Recruitment 2024 for Scientist/Engineer SC posts. Work on India's space missions and satellite systems.",
      requiredSkills: ["B.E./B.Tech (CS/IT)", "Embedded Systems", "C/C++", "GATE Score preferred"],
      category: "government",
      source: "ISRO Official Website",
      sourceUrl: "https://www.isro.gov.in/Careers.html",
      lastDate: "28 Feb 2025",
      vacancies: 303,
    },
    {
      id: "g8",
      title: "Junior Engineer (Civil/Electrical/Mechanical)",
      company: "Central Public Works Department (CPWD)",
      location: "All India",
      salary: "₹35,400 – ₹1,12,400 (Level 6)",
      type: "Full-time",
      description: "CPWD Junior Engineer Recruitment 2024 via SSC JE exam for engineering roles in India's premier public works body.",
      requiredSkills: ["Civil/Electrical/Mechanical Engineering", "Technical Drawing", "Estimation & Costing"],
      category: "government",
      source: "SSC JE Portal",
      sourceUrl: "https://ssc.nic.in/",
      lastDate: "28 Mar 2025",
      vacancies: 1765,
    },
    {
      id: "g9",
      title: "Development Officer (IT / Computer Applications)",
      company: "National Informatics Centre (NIC)",
      location: "New Delhi / All India",
      salary: "₹47,600 – ₹1,51,100 (Level 8)",
      type: "Full-time",
      description: "NIC recruitment for IT professionals to design, develop, and manage critical e-governance infrastructure of India.",
      requiredSkills: ["B.E./B.Tech (CS/IT) or MCA", "Software Development", "Networking", "Databases"],
      category: "government",
      source: "NCS – National Career Service Portal",
      sourceUrl: "https://www.ncs.gov.in/",
      lastDate: "12 Apr 2025",
      vacancies: 127,
    },
    {
      id: "g10",
      title: "Assistant Manager (IT) – Grade A",
      company: "National Bank for Agriculture & Rural Development (NABARD)",
      location: "All India",
      salary: "₹44,500 – ₹89,150 (with allowances)",
      type: "Full-time",
      description: "NABARD Grade A recruitment 2024 for IT professionals to drive digital transformation in rural banking.",
      requiredSkills: ["B.E./B.Tech (CS/IT)", "Database Management", "Cybersecurity Basics", "NABARD/Banking Knowledge"],
      category: "government",
      source: "NABARD Official Website",
      sourceUrl: "https://www.nabard.org/career.aspx",
      lastDate: "18 Nov 2024",
      vacancies: 102,
    },
    {
      id: "g11",
      title: "Constable (General Duty) – BSF / CRPF / CISF",
      company: "Staff Selection Commission (SSC) – CPO",
      location: "All India",
      salary: "₹21,700 – ₹69,100 (Level 3)",
      type: "Full-time",
      description: "SSC CPO Sub-Inspector and Constable GD recruitment 2024 for Central Armed Police Forces.",
      requiredSkills: ["Physical Fitness", "General Intelligence", "English / Hindi", "Current Affairs"],
      category: "government",
      source: "SSC Official Portal",
      sourceUrl: "https://ssc.nic.in/",
      lastDate: "30 Apr 2025",
      vacancies: 39481,
    },
    {
      id: "g12",
      title: "Technical Officer – Computer Science",
      company: "Food Corporation of India (FCI)",
      location: "North / South / East / West / NE Zone",
      salary: "₹40,000 – ₹1,40,000 (approx.)",
      type: "Full-time",
      description: "FCI Recruitment 2024 for Junior Engineer, Assistant Grade and Technical Officer posts across zones.",
      requiredSkills: ["B.E./B.Tech (CS/IT)", "Database", "Network Administration", "Linux"],
      category: "government",
      source: "FCI Official Website",
      sourceUrl: "https://fci.gov.in/recruitments.php",
      lastDate: "15 Mar 2025",
      vacancies: 5000,
    },
    {
      id: "g13",
      title: "Scientific Officer – Electronics / IT",
      company: "Bhabha Atomic Research Centre (BARC)",
      location: "Mumbai / Trombay",
      salary: "₹56,100 – ₹1,77,500 (Level 10)",
      type: "Full-time",
      description: "BARC OCES/DGFS programme for engineering graduates in electronics, instrumentation, and computer science fields.",
      requiredSkills: ["B.E./B.Tech (CS/EC/IT)", "Programming", "GATE Score", "Nuclear Knowledge"],
      category: "government",
      source: "BARC Official Website",
      sourceUrl: "https://www.barc.gov.in/careers/",
      lastDate: "31 Mar 2025",
      vacancies: 150,
    },
    {
      id: "g14",
      title: "Assistant Programmer – NIC / Ministry of IT",
      company: "Ministry of Electronics and IT (MeitY)",
      location: "New Delhi",
      salary: "₹44,900 – ₹1,42,400 (Level 7)",
      type: "Full-time",
      description: "MeitY and NIC hiring for Digital India projects. Roles in software development, cloud infrastructure, and cybersecurity.",
      requiredSkills: ["Software Development", "Cloud Computing", "Cybersecurity", "Databases"],
      category: "government",
      source: "MeitY / NCS Portal",
      sourceUrl: "https://www.ncs.gov.in/",
      lastDate: "20 May 2025",
      vacancies: 200,
    },
    {
      id: "g15",
      title: "Assistant Manager – Systems (IT)",
      company: "Reserve Bank of India (RBI)",
      location: "All India",
      salary: "₹55,200 – ₹1,01,500 (with DA/HRA)",
      type: "Full-time",
      description: "RBI Grade B Officer (DR) recruitment 2024 for Systems stream. Work on critical banking technology infrastructure.",
      requiredSkills: ["B.E./B.Tech (CS/IT)", "Networking", "Database", "Systems Administration"],
      category: "government",
      source: "RBI Official Website",
      sourceUrl: "https://www.rbi.org.in/Scripts/Opportunities.aspx",
      lastDate: "10 Feb 2025",
      vacancies: 90,
    },
  ];

  res.json({ jobs: governmentJobs, total: governmentJobs.length, fetchedAt: Date.now() });
});

export default router;
