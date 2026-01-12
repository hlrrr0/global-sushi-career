import { createClient } from 'microcms-js-sdk';
import { MicroCMSJob, MicroCMSArea } from '@/lib/types';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// 求人一覧取得
export const getJobs = async (params?: {
  limit?: number;
  offset?: number;
  filters?: string;
}) => {
  try {
    const response = await client.get<{
      contents: MicroCMSJob[];
      totalCount: number;
      offset: number;
      limit: number;
    }>({
      endpoint: 'jobs',
      queries: {
        limit: params?.limit || 100,
        offset: params?.offset || 0,
        ...(params?.filters && { filters: params.filters }),
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching jobs from MicroCMS:', error);
    throw error;
  }
};

// 求人詳細取得
export const getJobById = async (id: string) => {
  try {
    const job = await client.get<MicroCMSJob>({
      endpoint: 'jobs',
      contentId: id,
    });
    return job;
  } catch (error) {
    console.error(`Error fetching job ${id} from MicroCMS:`, error);
    throw error;
  }
};

// エリア一覧取得
export const getAreas = async () => {
  try {
    const response = await client.get<{
      contents: MicroCMSArea[];
      totalCount: number;
    }>({
      endpoint: 'areas',
      queries: {
        limit: 100,
      },
    });
    return response.contents;
  } catch (error) {
    console.error('Error fetching areas from MicroCMS:', error);
    throw error;
  }
};

// エリア詳細取得
export const getAreaById = async (id: string) => {
  try {
    const area = await client.get<MicroCMSArea>({
      endpoint: 'areas',
      contentId: id,
    });
    return area;
  } catch (error) {
    console.error(`Error fetching area ${id} from MicroCMS:`, error);
    throw error;
  }
};

// 求人を作成（AI Import Tool用）
export const createJob = async (data: {
  title: string;
  area: string; // Area ID
  city: string;
  salary_text: string;
  content: string;
  original_url: string;
  status?: 'draft' | 'publish';
}) => {
  try {
    // Management APIを使用する場合は別途設定が必要
    // ここでは通常のclientを使用
    const response = await fetch(
      `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/jobs`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY || '',
        },
        body: JSON.stringify({
          ...data,
          status: data.status || 'draft',
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create job: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating job in MicroCMS:', error);
    throw error;
  }
};
