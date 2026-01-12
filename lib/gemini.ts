import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIAnalysisResult } from '@/lib/types';

// ビルド時にエラーを避けるため、環境変数がない場合はダミー値を使用
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || 'dummy-key-for-build'
);

export async function analyzeJobPosting(
  htmlContent: string,
  url: string
): Promise<AIAnalysisResult> {
  // 環境変数チェック
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'dummy-key-for-build') {
    throw new Error('GEMINI_API_KEY is not configured. Please set it in your environment variables.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
あなたは海外の求人情報を解析し、日本人向けに翻訳・整形する専門家です。
以下のHTMLコンテンツから求人情報を抽出し、JSONフォーマットで返してください。

【抽出・変換ルール】
1. タイトル: 英語の原文とその日本語翻訳
2. 国・都市: 勤務地の国と都市を特定
3. 給与: 給与情報を抽出し、日本円換算も計算（現在の為替レート概算を使用）
4. 詳細説明: 原文と、魅力的な日本語翻訳（3-5行程度に要約）
5. 要約: 日本人職人向けに、この求人の魅力を3行程度で要約
6. 募集要項・福利厚生: あれば抽出

【URL】
${url}

【HTMLコンテンツ】
${htmlContent.slice(0, 10000)}

【出力フォーマット】
以下のJSON形式で出力してください（JSONのみを返し、他の説明文は不要です）:
{
  "title": "英語の求人タイトル",
  "titleJa": "日本語の求人タイトル",
  "country": "国名（英語）",
  "city": "都市名",
  "salary": "給与情報（元の通貨）",
  "salaryJpy": "給与情報（日本円換算の概算）",
  "description": "英語の詳細説明",
  "descriptionJa": "日本語の詳細説明（魅力的に翻訳）",
  "summary": "日本人職人向けの求人魅力の要約（3行程度）",
  "requirements": "募集要項（あれば）",
  "benefits": "福利厚生（あれば）"
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // JSONを抽出（マークダウンのコードブロックに囲まれている場合に対応）
    let jsonText = text;
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }

    const parsed = JSON.parse(jsonText.trim()) as AIAnalysisResult;
    return parsed;
  } catch (error) {
    console.error('Error analyzing job posting with Gemini:', error);
    throw error;
  }
}

export async function translateText(text: string, targetLang = 'ja'): Promise<string> {
  // 環境変数チェック
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'dummy-key-for-build') {
    throw new Error('GEMINI_API_KEY is not configured. Please set it in your environment variables.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Translate the following text to ${targetLang}. Keep it professional and appealing for Japanese sushi chefs. Return only the translated text without any additional explanation.

Text to translate:
${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error translating text with Gemini:', error);
    throw error;
  }
}
