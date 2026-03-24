export interface CreateApplicationDTO {
  internship_id: string;
  resume_url?: string;
}

export interface Application {
  id: string;
  internship_id: string;
  student_id: string;
  resume_url?: string;
  ai_score?: number;
  status: string;
  created_at: Date;
}