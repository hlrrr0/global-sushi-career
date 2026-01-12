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
    // gemini-2.5-flash: 最新の高速モデル (2026年1月時点)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
あなたは海外の寿司職人求人を解析する専門のAIエージェントです。
以下のHTMLから可能な限り詳細な求人情報を抽出し、日本人寿司職人向けに魅力的に翻訳してください。

【重要な抽出項目】
1. **求人タイトル**: 原文と、日本人にわかりやすい翻訳
2. **勤務地情報**: 
   - 国名（USA, UK, Australia, Canada, Koreaなど）
   - 都市名（具体的に）
   - 可能なら住所やエリア
3. **給与情報**:
   - 原文の給与（通貨込み）
   - 時給/月給/年俸の区別
   - 日本円換算（概算でOK）
   - ボーナス・チップの情報
4. **職種・ポジション**:
   - 寿司シェフ/ヘッドシェフ/アシスタント/握り専門など
   - 経験レベル（初級/中級/上級）
5. **仕事内容**: 
   - 具体的な業務内容
   - お店のスタイル（高級/カジュアル/回転寿司/ホテル内など）
   - 客層や雰囲気
6. **応募資格**:
   - 必須スキル/経験年数
   - 望ましいスキル
   - ビザサポートの有無
   - 語学力の要件
7. **福利厚生**:
   - ビザサポート
   - 住居補助/住居提供
   - 健康保険
   - 有給休暇
   - 食事補助
   - 研修制度
   - キャリアアップ機会
8. **勤務条件**:
   - 勤務時間/シフト
   - 休日
   - 勤務開始日
9. **お店情報**:
   - レストラン名
   - お店のタイプ
   - 規模（席数/従業員数）
   - オープン年数
10. **応募方法**: 応募に必要な情報や手順

【翻訳・要約のポイント】
- 日本人寿司職人が「海外で働きたい！」と思える魅力的な表現にする
- 給与や福利厚生は具体的に記載
- ビザサポートの情報は明確に
- お店の雰囲気や働きがいが伝わるように

【URL】
${url}

【HTMLコンテンツ】
${htmlContent.slice(0, 25000)}

【出力フォーマット】
以下のJSON形式で出力してください（JSONのみ、マークダウンのコードブロックも不要）:
{
  "title": "英語の求人タイトル",
  "titleJa": "日本語の求人タイトル（魅力的に）",
  "country": "国名（USA/UK/Australia/Canada/Korea等）",
  "city": "都市名",
  "location": "より詳細な住所・エリア（あれば）",
  "salary": "給与情報（元の通貨、例: $50,000-60,000/year + tips）",
  "salaryJpy": "給与情報の日本円換算（例: 年収700-840万円 + チップ）",
  "position": "職種・ポジション（例: 寿司ヘッドシェフ）",
  "experienceLevel": "経験レベル（初級/中級/上級/不問）",
  "description": "英語の詳細説明（なるべく長く）",
  "descriptionJa": "日本語の詳細説明（HTMLの<p>タグで段落分けして、魅力的に翻訳。具体的に。）",
  "summary": "この求人の魅力を3-5行で要約（日本人職人向けに）",
  "requirements": "応募資格・必須条件（HTMLの<ul><li>でリスト化）",
  "preferred": "望ましいスキル・経験（HTMLの<ul><li>でリスト化）",
  "benefits": "福利厚生（HTMLの<ul><li>でリスト化。ビザサポート、住居、保険など）",
  "workingHours": "勤務時間・シフト情報",
  "holidays": "休日・休暇",
  "restaurantName": "レストラン名（あれば）",
  "restaurantType": "お店のタイプ（高級日本料理/カジュアル寿司/回転寿司/ホテル内レストラン等）",
  "visaSupport": "ビザサポートの有無（あり/なし/要相談）",
  "housingSupport": "住居サポート（あり/なし/詳細）",
  "startDate": "勤務開始日（あれば）"
}

※情報が見つからない項目は空文字""にしてください
※descriptionJa、requirements、benefits等はHTMLタグで構造化してください
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
    // gemini-2.5-flash: 最新の高速モデル
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

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
