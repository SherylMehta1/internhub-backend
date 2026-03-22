export interface CreateCompanyDTO {
  company_name: string;
  description?: string;
}

export interface Company {
  id: string;
  user_id: string;
  company_name: string;
  description?: string;
  verified: boolean;
  created_at: Date;
}