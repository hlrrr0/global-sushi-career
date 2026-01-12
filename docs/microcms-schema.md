# MicroCMS API Schema Documentation

このドキュメントは、MicroCMSで設定すべきAPIスキーマの詳細を記載しています。

## Areas API (国・地域マスタ)

### 基本設定
- **API ID**: `areas`
- **API Type**: リスト形式
- **エンドポイント**: `https://[service-domain].microcms.io/api/v1/areas`

### フィールド定義

| フィールドID | 表示名 | 種類 | 必須 | 説明 |
|-------------|--------|------|------|------|
| `name` | 国名(英語) | テキストフィールド | ✅ | 例: USA, United Kingdom |
| `nameJa` | 国名(日本語) | テキストフィールド | ✅ | 例: アメリカ、イギリス |
| `currency` | 通貨コード | テキストフィールド | ✅ | 例: USD, GBP, EUR |
| `currencySymbol` | 通貨記号 | テキストフィールド | ✅ | 例: $, £, € |
| `flagImage` | 国旗画像 | 画像 | - | 国旗の画像ファイル |
| `exchangeRate` | 為替レート | 数値 | - | 日本円への換算レート (例: 150 for USD) |

### サンプルデータ

```json
[
  {
    "id": "usa",
    "name": "USA",
    "nameJa": "アメリカ",
    "currency": "USD",
    "currencySymbol": "$",
    "exchangeRate": 150
  },
  {
    "id": "uk",
    "name": "United Kingdom",
    "nameJa": "イギリス",
    "currency": "GBP",
    "currencySymbol": "£",
    "exchangeRate": 190
  },
  {
    "id": "australia",
    "name": "Australia",
    "nameJa": "オーストラリア",
    "currency": "AUD",
    "currencySymbol": "A$",
    "exchangeRate": 100
  },
  {
    "id": "canada",
    "name": "Canada",
    "nameJa": "カナダ",
    "currency": "CAD",
    "currencySymbol": "C$",
    "exchangeRate": 110
  }
]
```

---

## Jobs API (求人情報)

### 基本設定
- **API ID**: `jobs`
- **API Type**: リスト形式
- **エンドポイント**: `https://[service-domain].microcms.io/api/v1/jobs`

### フィールド定義

| フィールドID | 表示名 | 種類 | 必須 | 説明 |
|-------------|--------|------|------|------|
| `title` | 求人タイトル | テキストフィールド | ✅ | 日本語翻訳済みのタイトル |
| `area` | 国・地域 | コンテンツ参照 | ✅ | Areasへの参照 |
| `city` | 都市 | テキストフィールド | ✅ | 例: New York, London |
| `salary_text` | 給与 | テキストフィールド | ✅ | 例: $6,000/月 (約90万円) |
| `content` | 求人詳細 | リッチエディタ | ✅ | 日本語要約・翻訳済みの詳細 |
| `original_url` | 元URL | テキストフィールド | ✅ | スクレイピング元のURL |
| `main_image` | メイン画像 | 画像 | - | 求人のメイン画像 |

### サンプルデータ

```json
{
  "title": "ニューヨークの高級寿司レストランで寿司職人募集",
  "area": {
    "id": "usa"
  },
  "city": "New York",
  "salary_text": "$6,000/月 (約90万円)",
  "content": "<p>マンハッタンの高級日本料理店で寿司職人を募集しています。経験3年以上の方優遇。ビザサポートあり。</p>",
  "original_url": "https://example.com/job/123",
  "main_image": {
    "url": "https://images.microcms-assets.io/..."
  }
}
```

---

## API設定手順

### 1. MicroCMSにログイン
https://app.microcms.io/

### 2. サービスを作成（初回のみ）
- サービス名: 任意（例: global-sushi-career）
- サービスID: 任意（例: global-sushi-career）

### 3. Areas APIを作成
1. 「API作成」をクリック
2. 「リスト形式」を選択
3. API ID: `areas`
4. 上記のフィールド定義に従ってフィールドを追加
5. 保存

### 4. Jobs APIを作成
1. 「API作成」をクリック
2. 「リスト形式」を選択
3. API ID: `jobs`
4. 上記のフィールド定義に従ってフィールドを追加
5. `area`フィールドは「コンテンツ参照」で`areas` APIを選択
6. 保存

### 5. APIキーを取得
1. 「設定」→「APIキー」
2. 新しいAPIキーを作成（読み取り・書き込み権限を付与）
3. `.env.local`に設定

---

## 注意事項

- **original_url**は管理用で、フロントエンドでは控えめに表示します
- **main_image**は手動アップロード推奨（著作権考慮）
- **exchangeRate**は定期的に更新することを推奨
- Management APIを使用する場合は、別途APIキーの設定が必要

---

## 参考リンク

- [MicroCMS公式ドキュメント](https://document.microcms.io/)
- [APIリファレンス](https://document.microcms.io/content-api/get-list-contents)
