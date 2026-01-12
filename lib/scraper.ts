import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeWebsite(url: string): Promise<string> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9,ja;q=0.8',
      },
      timeout: 15000,
      maxRedirects: 5,
    });

    const $ = cheerio.load(response.data);

    // スクリプトやスタイルタグを削除（ただしコンテンツは残す）
    $('script').remove();
    $('style').remove();
    $('noscript').remove();
    $('iframe').remove();
    $('nav').remove();
    $('header').remove();
    $('footer').remove();
    $('.cookie-banner').remove();
    $('.advertisement').remove();

    // メインコンテンツを抽出（複数のセレクタを試行）
    let mainContent = '';
    
    const selectors = [
      'main',
      'article',
      '[role="main"]',
      '.job-description',
      '.job-details',
      '.job-content',
      '.posting-description',
      '.content',
      '#content',
      '.main-content',
      'body',
    ];

    for (const selector of selectors) {
      const element = $(selector);
      if (element.length > 0 && element.text().trim().length > 200) {
        // HTMLを保持（構造情報も取得）
        mainContent = element.html() || '';
        break;
      }
    }

    // フォールバック: bodyから取得
    if (!mainContent || mainContent.length < 200) {
      mainContent = $('body').html() || '';
    }

    // 余分な空白を削除して整形（でも構造は保持）
    const cleanedHtml = mainContent
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();

    // テキストも抽出しておく
    const $clean = cheerio.load(cleanedHtml);
    const textContent = $clean('body').text()
      .replace(/\s+/g, ' ')
      .trim();

    console.log(`Scraped ${textContent.length} characters from ${url}`);

    // HTMLとテキストの両方を返す（改行で区切る）
    return `HTML:\n${cleanedHtml.slice(0, 20000)}\n\nTEXT:\n${textContent.slice(0, 10000)}`;
  } catch (error) {
    console.error('Error scraping website:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch website: ${error.message}`);
    }
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
