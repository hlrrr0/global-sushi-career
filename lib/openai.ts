import OpenAI from 'openai';
import { AIAnalysisResult } from '@/lib/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeJobPosting(
  htmlContent: string,
  url: string
): Promise<AIAnalysisResult> {
  try {
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
${htmlContent.slice(0, 10000)} // 最初の10000文字のみ送信

【出力フォーマット】
以下のJSON形式で出力してください:
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

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'あなたは海外の寿司職人求人を日本語に翻訳し、魅力的に伝えるエキスパートです。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const result = completion.choices[0].message.content;
    if (!result) {
      throw new Error('No response from OpenAI');
    }

    const parsed = JSON.parse(result) as AIAnalysisResult;
    return parsed;
  } catch (error) {
    console.error('Error analyzing job posting with OpenAI:', error);
    throw error;
  }
}

export async function translateText(text: string, targetLang = 'ja'): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Translate the following text to ${targetLang}. Keep it professional and appealing for Japanese sushi chefs.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.5,
    });

    return completion.choices[0].message.content || text;
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
}
