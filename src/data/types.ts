export type OpportunityCategory =
  | 'All'
  | 'Jobs'
  | 'Internships'
  | 'Scholarships'
  | 'Grants'
  | 'Hackathons'
  | 'Fellowships';

export type EducationLevel =
  | 'Any / All Levels'
  | 'High School'
  | 'Undergraduate'
  | 'Graduate'
  | 'Post-Doc / Professional';

export type DeadlineFilter = 'all' | 'closing-soon' | 'active' | 'rolling';

export type FundingFilter = 'all' | 'fully-funded' | 'paid' | 'high-reward';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  orgLogo?: string;
  category: Exclude<OpportunityCategory, 'All'>;
  type: string; // e.g. "Full-time", "12-Week Fellowship", "Fully Funded", "Global Contest"
  location: string;
  isRemote: boolean;
  fundingAmount?: string; // e.g. "$120k - $150k", "$35,000 Grant", "Fully Funded + Flights"
  deadline: string; // "YYYY-MM-DD" or "Rolling"
  description: string;
  eligibility: string[];
  benefits: string[];
  applicationSteps: string[];
  applyUrl: string;
  tags: string[];
  featured?: boolean;
  verified?: boolean;
  educationLevel?: EducationLevel;
  createdAt: string;
  contactEmail?: string;
}

export interface FilterState {
  searchQuery: string;
  category: OpportunityCategory;
  isRemoteOnly: boolean;
  deadlineStatus: DeadlineFilter;
  fundingType: FundingFilter;
  educationLevel: EducationLevel | 'all';
  sortBy: 'featured' | 'deadline-asc' | 'newest' | 'highest-funding';
  savedOnly: boolean;
}

export interface OpportunityFormData {
  title: string;
  organization: string;
  category: Exclude<OpportunityCategory, 'All'>;
  type: string;
  location: string;
  isRemote: boolean;
  fundingAmount: string;
  deadline: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  applyUrl: string;
  tags: string[];
  contactEmail: string;
  educationLevel: EducationLevel;
}
