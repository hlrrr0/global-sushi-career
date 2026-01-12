// 共通の求人情報型
export interface Job {
  id: string;
  title: string;
  area: Area;
  city: string;
  salaryText: string;
  salaryJpy?: string; // 日本円換算
  content: string;
  mainImage?: string;
  originalUrl?: string; // Pick案件の場合のみ
  source: 'agent' | 'cms'; // データソース識別
  labels: string[]; // 「Agent」「Curation」「急募」など
  createdAt: string;
  updatedAt: string;
}

// 国・エリア情報
export interface Area {
  id: string;
  name: string;
  nameJa: string;
  currency: string; // USD, GBP, EUR など
  currencySymbol: string; // $, £, € など
  flagImage?: string;
  exchangeRate?: number; // 日本円への換算レート
}

// Agent System APIからのレスポンス（例）
export interface AgentJob {
  id: string;
  title: string;
  location: string;
  salary: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// MicroCMSからのレスポンス
export interface MicroCMSJob {
  id: string;
  title: string;
  area: {
    id: string;
    name: string;
    nameJa: string;
    currency: string;
    currencySymbol: string;
    flagImage?: { url: string };
    exchangeRate?: number;
  };
  city: string;
  salary_text: string;
  content: string;
  original_url?: string;
  main_image?: { url: string };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface MicroCMSArea {
  id: string;
  name: string;
  nameJa: string;
  currency: string;
  currencySymbol: string;
  flagImage?: { url: string };
  exchangeRate?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// AI解析結果の型
export interface AIAnalysisResult {
  title: string;
  titleJa: string;
  country: string;
  city: string;
  salary: string;
  salaryJpy: string;
  description: string;
  descriptionJa: string;
  summary: string;
  requirements?: string;
  benefits?: string;
}

// 検索・フィルタ条件
export interface JobFilters {
  area?: string;
  minSalary?: number;
  maxSalary?: number;
  keyword?: string;
}
