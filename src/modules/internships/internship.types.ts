export interface CreateInternshipDTO {
  title: string;
  description: string;
  location?: string;
  stipend?: number;
  skills_required?: string[];
}

export interface Internship {
  id: string;
  company_id: string;
  title: string;
  description: string;
  location?: string;
  stipend?: number;
  skills_required?: string[];
  created_at: Date;
}