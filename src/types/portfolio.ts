export interface SkillItem {
  name: string;
  icon: string;
}

export interface SkillGroup {
  label: string;
  items: SkillItem[];
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  featured: boolean;
  index: string;
  tag?: string;
  badge?: string;
  title: string;
  desc: string;
  extra?: string;
  role?: string;
  tags: string[];
  github?: string;
  live?: string;
  image: string;
  stats?: ProjectStat[];
}

export interface ExperienceItem {
  title: string;
  roleType: string;
  company: string;
  period: string;
  duration: string;
  desc: string;
  bullets: string[];
  tags: string[];
  hasCertificate?: boolean;
}

export interface ExperienceMilestone {
  id: string;
  category: "work" | "internship" | "education";
  badge: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  statusBadge: string;
  desc: string;
  bullets: string[];
  tags: string[];
  certificateType?: "gold_medal" | "hec_hackathon" | "google_marketing" | "enablers";
  certificateTitle?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export interface Category {
  id: string;
  label: string;
  match: string[];
}
