import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeWebsite(url: string): Promise<string> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);

    // スクリプトやスタイルタグを削除
    $('script').remove();
    $('style').remove();
    $('noscript').remove();
    $('iframe').remove();

    // メインコンテンツを抽出（一般的なセレクタ）
    const mainContent =
      $('main').text() ||
      $('article').text() ||
      $('.job-description').text() ||
      $('.content').text() ||
      $('body').text();

    // 余分な空白を削除して整形
    const cleanedText = mainContent
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();

    return cleanedText;
  } catch (error) {
    console.error('Error scraping website:', error);
    throw new Error('Failed to fetch the website content');
  }
}

// Puppeteerを使用する場合（JSレンダリングが必要な場合）
export async function scrapeDynamicWebsite(url: string): Promise<string> {
  // Puppeteerの実装は必要に応じて追加
  // Vercel環境ではPuppeteerの使用に制限があるため、
  // 基本的にはCheerioを使用する方針
  throw new Error('Dynamic scraping not implemented yet');
}
