export const students = [
  { id: "s1", name: "Rahul Sharma", skills: ["React", "Node.js", "Python"], gpa: 8.5, college: "Delhi University" },
  { id: "s2", name: "Priya Patel", skills: ["Java", "Machine Learning", "SQL"], gpa: 9.1, college: "IIT Bombay" },
  { id: "s3", name: "Amit Kumar", skills: ["C++", "Spring Boot", "AWS"], gpa: 8.2, college: "NIT Trichy" },
  { id: "s4", name: "Sneha Reddy", skills: ["UI/UX", "Figma", "Tailwind"], gpa: 8.8, college: "NID Bangalore" },
  { id: "s5", name: "Vikram Singh", skills: ["Angular", "Docker", "Kubernetes"], gpa: 7.9, college: "BITS Pilani" }
];

export const employers = [
  { id: "e1", name: "TechNova Solutions", industry: "IT Services", size: "1000-5000", location: "Bangalore" },
  { id: "e2", name: "Innovate AI", industry: "Artificial Intelligence", size: "50-200", location: "Hyderabad" },
  { id: "e3", name: "Global Finance Corp", industry: "Fintech", size: "10000+", location: "Mumbai" },
  { id: "e4", name: "EduTech India", industry: "EdTech", size: "200-500", location: "Pune" },
  { id: "e5", name: "HealthCare Systems", industry: "HealthTech", size: "500-1000", location: "Delhi" }
];

export const jobs = [
  { id: "j1", title: "Frontend Developer", company: "TechNova Solutions", location: "Bangalore", salary: "₹8L - ₹12L", type: "Full-time", description: "Looking for a skilled React developer.", requiredSkills: ["React", "TypeScript", "Tailwind"] },
  { id: "j2", title: "Data Scientist", company: "Innovate AI", location: "Hyderabad", salary: "₹15L - ₹20L", type: "Full-time", description: "Machine learning engineer role.", requiredSkills: ["Python", "TensorFlow", "SQL"] },
  { id: "j3", title: "Backend Engineer", company: "Global Finance Corp", location: "Mumbai", salary: "₹10L - ₹15L", type: "Full-time", description: "Java backend developer.", requiredSkills: ["Java", "Spring Boot", "Microservices"] },
  { id: "j4", title: "UI/UX Designer", company: "EduTech India", location: "Pune", salary: "₹6L - ₹10L", type: "Full-time", description: "Design intuitive user interfaces.", requiredSkills: ["Figma", "Adobe XD", "HTML/CSS"] },
  { id: "j5", title: "DevOps Engineer", company: "HealthCare Systems", location: "Delhi", salary: "₹12L - ₹18L", type: "Full-time", description: "Manage cloud infrastructure.", requiredSkills: ["AWS", "Docker", "Kubernetes"] },
  { id: "j6", title: "Software Engineering Intern", company: "TechNova Solutions", location: "Remote", salary: "₹30K/month", type: "Internship", description: "Summer internship program.", requiredSkills: ["JavaScript", "Python"] },
  { id: "j7", title: "Product Manager", company: "Innovate AI", location: "Hyderabad", salary: "₹14L - ₹22L", type: "Full-time", description: "Lead AI product initiatives.", requiredSkills: ["Product Management", "Agile", "Data Analysis"] },
  { id: "j8", title: "Full Stack Developer", company: "EduTech India", location: "Pune", salary: "₹9L - ₹14L", type: "Full-time", description: "End-to-end web development.", requiredSkills: ["MERN Stack", "AWS"] },
  { id: "j9", title: "Data Analyst", company: "Global Finance Corp", location: "Mumbai", salary: "₹7L - ₹11L", type: "Full-time", description: "Analyze financial data.", requiredSkills: ["Excel", "SQL", "Tableau"] },
  { id: "j10", title: "Cloud Architect", company: "HealthCare Systems", location: "Delhi", salary: "₹18L - ₹25L", type: "Full-time", description: "Design cloud solutions.", requiredSkills: ["AWS", "Azure", "System Design"] }
];

export const mockAnalytics = {
  placementsByMonth: [
    { name: 'Jan', placements: 120 },
    { name: 'Feb', placements: 150 },
    { name: 'Mar', placements: 180 },
    { name: 'Apr', placements: 210 },
    { name: 'May', placements: 190 },
    { name: 'Jun', placements: 250 },
  ],
  topIndustries: [
    { name: 'IT Services', value: 45 },
    { name: 'Fintech', value: 20 },
    { name: 'EdTech', value: 15 },
    { name: 'HealthTech', value: 10 },
    { name: 'Others', value: 10 },
  ],
  skillDemand: [
    { skill: 'React', demand: 85 },
    { skill: 'Python', demand: 78 },
    { skill: 'Java', demand: 72 },
    { skill: 'AWS', demand: 65 },
    { skill: 'SQL', demand: 60 },
  ]
};
