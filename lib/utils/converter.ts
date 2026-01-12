import { Job, AgentJob, MicroCMSJob, Area, MicroCMSArea } from '@/lib/types';

// Agent System APIのデータをJob型に変換
export function convertAgentJobToJob(agentJob: AgentJob, area: Area): Job {
  return {
    id: `agent_${agentJob.id}`,
    title: agentJob.title,
    area,
    city: extractCity(agentJob.location),
    salaryText: agentJob.salary,
    content: agentJob.description,
    mainImage: agentJob.imageUrl,
    source: 'agent',
    labels: ['Agent', '自社案件'],
    createdAt: agentJob.createdAt,
    updatedAt: agentJob.updatedAt,
  };
}

// MicroCMSのデータをJob型に変換
export function convertMicroCMSJobToJob(cmsJob: MicroCMSJob): Job {
  const area: Area = {
    id: cmsJob.area.id,
    name: cmsJob.area.name,
    nameJa: cmsJob.area.nameJa,
    currency: cmsJob.area.currency,
    currencySymbol: cmsJob.area.currencySymbol,
    flagImage: cmsJob.area.flagImage?.url,
    exchangeRate: cmsJob.area.exchangeRate,
  };

  return {
    id: `cms_${cmsJob.id}`,
    title: cmsJob.title,
    area,
    city: cmsJob.city,
    salaryText: cmsJob.salary_text,
    content: cmsJob.content,
    mainImage: cmsJob.main_image?.url,
    originalUrl: cmsJob.original_url,
    source: 'cms',
    labels: ['Curation', 'Pick'],
    createdAt: cmsJob.createdAt,
    updatedAt: cmsJob.updatedAt,
  };
}

// MicroCMSのAreaデータをArea型に変換
export function convertMicroCMSAreaToArea(cmsArea: MicroCMSArea): Area {
  return {
    id: cmsArea.id,
    name: cmsArea.name,
    nameJa: cmsArea.nameJa,
    currency: cmsArea.currency,
    currencySymbol: cmsArea.currencySymbol,
    flagImage: cmsArea.flagImage?.url,
    exchangeRate: cmsArea.exchangeRate,
  };
}

// ロケーション文字列から都市名を抽出
function extractCity(location: string): string {
  // 簡易的な実装
  const parts = location.split(',');
  return parts[0].trim();
}

// 給与テキストに日本円換算を追加
export function addJpyConversion(salaryText: string, exchangeRate: number): string {
  // 簡易的な実装例
  const match = salaryText.match(/[\d,]+/);
  if (match) {
    const amount = parseInt(match[0].replace(/,/g, ''));
    const jpy = Math.round(amount * exchangeRate);
    return `${salaryText} (約${jpy.toLocaleString('ja-JP')}円)`;
  }
  return salaryText;
}
