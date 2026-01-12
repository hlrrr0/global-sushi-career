import { NextRequest, NextResponse } from 'next/server';
import { createJob } from '@/lib/microcms';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      areaId,
      city,
      salaryText,
      content,
      originalUrl,
      status = 'draft',
    } = body;

    // バリデーション
    if (!title || !areaId || !city || !salaryText || !content || !originalUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // MicroCMSに登録
    const result = await createJob({
      title,
      area: areaId,
      city,
      salary_text: salaryText,
      content,
      original_url: originalUrl,
      status,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error in create-job API:', error);
    return NextResponse.json(
      {
        error: 'Failed to create job',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
