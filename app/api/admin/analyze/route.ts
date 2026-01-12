import { NextRequest, NextResponse } from 'next/server';
import { scrapeWebsite } from '@/lib/scraper';
import { analyzeJobPosting } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // URL検証
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // 1. Webサイトをスクレイピング
    const htmlContent = await scrapeWebsite(url);

    if (!htmlContent || htmlContent.length < 100) {
      return NextResponse.json(
        { error: 'Failed to extract meaningful content from the URL' },
        { status: 400 }
      );
    }

    // 2. OpenAI APIで解析
    const analysis = await analyzeJobPosting(htmlContent, url);

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error('Error in analyze API:', error);
    return NextResponse.json(
      {
        error: 'Failed to analyze the job posting',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
