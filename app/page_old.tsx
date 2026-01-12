import Link from 'next/link';
import { getJobs } from '@/lib/microcms';
import { convertMicroCMSJobToJob } from '@/lib/utils/converter';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 新着求人を取得（最大4件）
  let latestJobs = [];
  try {
    const { contents: cmsJobs } = await getJobs();
    latestJobs = cmsJobs
      .slice(0, 4)
      .map((cmsJob) => {
        try {
          return convertMicroCMSJobToJob(cmsJob);
        } catch (error) {
          console.error('Failed to convert job:', error);
          return null;
        }
      })
      .filter((job): job is NonNullable<typeof job> => job !== null);
  } catch (error) {
    console.error('Failed to load jobs:', error);
  }

  const areaButtons = [
    { flag: '🇺🇸', name: 'アメリカ', country: 'usa', jobs: 45 },
    { flag: '��', name: 'イギリス', country: 'uk', jobs: 23 },
    { flag: '🇦🇺', name: 'オーストラリア', country: 'australia', jobs: 18 },
    { flag: '��', name: 'カナダ', country: 'canada', jobs: 15 },
    { flag: '🇸🇬', name: 'シンガポール', country: 'singapore', jobs: 12 },
    { flag: '🇦🇪', name: 'ドバイ・UAE', country: 'uae', jobs: 8 },
    { flag: '�🇺', name: 'ヨーロッパ全域', region: 'europe', jobs: 31 },
    { flag: '🌏', name: 'アジアその他', region: 'asia', jobs: 20 },
  ];

  const interviews = [
    {
      name: '田中 健太郎',
      age: '35歳',
      location: 'ニューヨーク',
      quote: '英語力ゼロからNYへ。\n3年で年収3倍に。',
      image: '👨‍🍳',
    },
    {
      name: '佐藤 美咲',
      age: '28歳', 
      location: 'ロンドン',
      quote: 'ロンドンでの\nワークライフバランス',
      image: '👩‍�',
    },
    {
      name: '山田 大輔',
      age: '32歳',
      location: 'シドニー',
      quote: 'オーストラリアで\n家族と豊かな生活',
      image: '👨‍🍳',
    },
  ];

  return (
    <div className="min-h-screen bg-[#111]">
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-white">🍣 Global Sushi</span>
            <span className="text-[#D4AF37]"> Career</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <a href="#areas" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              国から探す
            </a>
            <Link href="/jobs" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              求人一覧
            </Link>
            <a href="#contact" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              キャリア相談
            </a>
          </nav>
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* メインビジュアル - Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 背景グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black"></div>
        
        {/* 背景画像効果 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] bg-repeat"></div>
        </div>

        {/* コンテンツ */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">その技術は、</span>
            <br />
            <span className="text-[#D4AF37]">世界でさらに輝く。</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            年収1,000万超えは当たり前。<br className="md:hidden" />
            世界中の厳選された寿司求人を、あなたの手に。
          </p>
          
          {/* CTA ボタン */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={process.env.LINE_OFFICIAL_URL || '#'}
              className="group relative px-8 py-4 bg-[#06C755] text-white font-bold text-lg rounded-full hover:bg-[#05B04D] transition-all hover:scale-105 shadow-lg hover:shadow-[#06C755]/50"
            >
              <span className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"></path>
                </svg>
                非公開求人・キャリア相談
              </span>
            </a>
            <Link
              href="/jobs"
              className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-black transition-all"
            >
              求人を探す
            </Link>
          </div>
        </div>

        {/* スクロールインジケーター */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            国・地域から探す
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCountries.map((country) => (
              <Link
                key={country.id}
                href={`/jobs?area=${country.id}`}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-yellow-500 transition-all hover:scale-105"
              >
                <div className="text-5xl mb-3">{country.flag}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {country.name}
                </h3>
                <p className="text-gray-400">{country.jobs}件の求人</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Global Sushi Careerの特徴
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-3">AI自動解析</h3>
              <p className="text-gray-400">世界中の求人サイトをAIが自動で解析・翻訳して掲載</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-bold text-white mb-3">API連携</h3>
              <p className="text-gray-400">Agent Systemとの連携で自社保有案件も統合表示</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-white mb-3">LINE応募</h3>
              <p className="text-gray-400">すべての応募はLINE公式アカウントで簡単に</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 Global Sushi Career. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              利用規約
            </Link>
            <Link href="/admin/import" className="hover:text-white transition-colors">
              管理画面
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
