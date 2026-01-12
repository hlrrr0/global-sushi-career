# Global Sushi Career

海外の寿司職人求人に特化したキュレーション型求人メディア

## 🌟 特徴

- **AI自動解析**: URLを入力するだけで海外求人を自動解析・翻訳・登録
- **Agent System連携**: 自社保有案件を自動連携
- **MicroCMS管理**: Pick案件を簡単に管理
- **LINE応募**: すべての応募をLINE公式アカウントで一元管理

## 🚀 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: MicroCMS
- **AI**: Google Gemini AI (gemini-2.5-flash)
- **Hosting**: Vercel

## 📁 プロジェクト構成

```
├── app/
│   ├── page.tsx              # トップページ
│   ├── jobs/
│   │   ├── page.tsx          # 求人一覧
│   │   └── [id]/page.tsx     # 求人詳細
│   ├── admin/
│   │   └── import/
│   │       └── page.tsx      # AI求人登録ツール
│   └── api/
│       └── admin/
│           ├── analyze/route.ts      # AI解析API
│           └── create-job/route.ts   # 求人作成API
├── lib/
│   ├── types/
│   │   └── index.ts          # 型定義
│   ├── microcms.ts           # MicroCMS SDK
│   ├── gemini.ts             # Google Gemini AI連携
│   ├── scraper.ts            # Webスクレイピング
│   └── utils/
│       └── converter.ts      # データ変換
├── middleware.ts             # Basic認証
└── .env.local                # 環境変数
```

## 🔧 セットアップ

### 1. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください:

```bash
# MicroCMS
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# Agent System API
AGENT_SYSTEM_API_URL=https://api.example.com
AGENT_SYSTEM_API_KEY=your-agent-system-api-key

# Basic Auth for Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password

# LINE Official Account
LINE_OFFICIAL_URL=https://line.me/R/ti/p/@your-account

# NextAuth
NEXTAUTH_SECRET=your-nextauth-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### 2. MicroCMSの設定

MicroCMSで以下のAPIを作成してください:

#### Areas API (国・地域マスタ)
- **API ID**: `areas`
- **API Type**: リスト形式

| フィールドID | 名称 | 型 |
|-------------|------|-----|
| name | 国名(英語) | テキスト |
| nameJa | 国名(日本語) | テキスト |
| currency | 通貨コード | テキスト |
| currencySymbol | 通貨記号 | テキスト |
| flagImage | 国旗画像 | 画像 |
| exchangeRate | 為替レート | 数値 |

#### Jobs API (求人情報)
- **API ID**: `jobs`
- **API Type**: リスト形式

| フィールドID | 名称 | 型 |
|-------------|------|-----|
| title | タイトル | テキスト |
| area | 国・地域 | コンテンツ参照(Areas) |
| city | 都市 | テキスト |
| salary_text | 給与 | テキスト |
| content | 詳細 | リッチエディタ |
| original_url | 元URL | テキスト |
| main_image | メイン画像 | 画像 |

### 3. 依存関係のインストール

```bash
npm install
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

## 🎯 主要機能

### AI求人登録ツール (`/admin/import`)

1. 海外求人サイトのURLを入力
2. AIが自動でスクレイピング・解析・翻訳
3. フォームに自動入力された内容を確認・編集
4. MicroCMSに保存（下書き or 公開）

**Basic認証でアクセス制限されています**

### 求人表示

- **トップページ**: 国別の求人数表示、特徴紹介
- **求人一覧**: フィルタ検索、Agent/Pick統合表示
- **求人詳細**: 詳細情報、LINE応募ボタン

## 📝 開発メモ

### Phase 1: 基盤構築 ✅
- Next.jsプロジェクトセットアップ
- MicroCMS連携
- 型定義

### Phase 2: AIツール実装 ✅
- Google Gemini AI連携
- スクレイピング機能
- 管理画面UI

### Phase 3: フロントエンド実装 ✅
- トップページ
- 求人一覧・詳細
- LINE連携

### Phase 4: 残りのタスク
- [ ] Agent System API連携実装
- [ ] エラーハンドリング強化
- [ ] レスポンシブデザイン調整
- [ ] SEO対策
- [ ] 画像最適化
- [ ] テスト実装

## 🔐 セキュリティ

- 管理画面は`middleware.ts`でBasic認証保護
- API Keyはすべてサーバーサイドのみでアクセス
- 環境変数は`.env.local`で管理（Gitにコミットしない）

## 🚢 デプロイ

### Vercelへのデプロイ

1. GitHubリポジトリにプッシュ
2. Vercelでプロジェクトをインポート
3. 環境変数を設定
4. デプロイ

```bash
# 環境変数をVercelに設定
vercel env add MICROCMS_API_KEY
vercel env add GEMINI_API_KEY
# ... その他の環境変数も同様に
```

## 📄 ライセンス

Private Project

## 👥 Contact

お問い合わせ: [LINE Official Account]
