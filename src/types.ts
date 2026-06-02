export interface ChecklistItem {
  id: string;
  category: 'area-1' | 'area-2' | 'area-3' | 'area-4' | 'audyt' | 'testy' | 'etyka';
  title: string;
  concept: string;
  implementations: string[];
}

export interface B2BUpgradeState {
  traffic: number;
  currentCR: number;
  avgDealValue: number;
  websiteUrl: string;
  name: string;
  email: string;
  telefon: string;
  rodo: boolean;
  scorePercentage: number;
  checkedCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
  metric: string; // e.g. "+38% konwersji"
  industry: string; // e.g. "B2B SaaS"
}

export interface FAQItem {
  question: string;
  answer: string;
}
