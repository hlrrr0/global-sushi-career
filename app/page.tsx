import Link from 'next/link';

export default function Home() {
  const featuredCountries = [
    { id: 'usa', name: 'アメリカ', flag: '🇺🇸', jobs: 120 },
    { id: 'uk', name: 'イギリス', flag: '🇬🇧', jobs: 45 },
    { id: 'australia', name: 'オーストラリア', flag: '🇦🇺', jobs: 38 },
    { id: 'canada', name: 'カナダ', flag: '🇨🇦', jobs: 52 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <header className="bg-black/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            🍣 World Sushi Career
          </Link>
          <nav className="flex gap-6">
            <Link href="/jobs" className="text-white hover:text-yellow-400 transition-colors">
              求人検索
            </Link>
            <Link href="/about" className="text-white hover:text-yellow-400 transition-colors">
              About
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            世界で寿司職人として働く
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            海外の寿司職人求人を厳選してお届け。
            <br />
            Agent System連携求人とキュレーション求人を統合表示
          </p>
          <Link
            href="/jobs"
            className="inline-block bg-yellow-500 text-black font-bold px-8 py-4 rounded-full hover:bg-yellow-400 transition-transform hover:scale-105"
          >
            求人を探す
          </Link>
        </div>
      </section>

      <section className="py-16 px-4">
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

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            World Sushi Careerの特徴
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
          <p>&copy; 2026 World Sushi Career. All rights reserved.</p>
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
