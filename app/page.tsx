import Link from 'next/link';
import { getJobs } from '@/lib/microcms';
import { convertMicroCMSJobToJob } from '@/lib/utils/converter';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 新着求人を取得（最大4件）
  let latestJobs: Array<ReturnType<typeof convertMicroCMSJobToJob>> = [];
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
    { flag: '🇺🇸', name: 'アメリカ', country: 'usa', jobs: 45, color: 'from-red-900/20 to-slate-900 hover:border-red-500' },
    { flag: '🇬🇧', name: 'イギリス', country: 'uk', jobs: 23, color: 'from-blue-900/20 to-slate-900 hover:border-blue-500' },
    { flag: '🇦🇺', name: 'オーストラリア', country: 'australia', jobs: 18, color: 'from-green-900/20 to-slate-900 hover:border-green-500' },
    { flag: '🇨🇦', name: 'カナダ', country: 'canada', jobs: 15, color: 'from-purple-900/20 to-slate-900 hover:border-purple-500' },
    { flag: '🇸🇬', name: 'シンガポール', country: 'singapore', jobs: 12, color: 'from-pink-900/20 to-slate-900 hover:border-pink-500' },
    { flag: '🇦🇪', name: 'ドバイ・UAE', country: 'uae', jobs: 8, color: 'from-amber-900/20 to-slate-900 hover:border-amber-500' },
    { flag: '🇪🇺', name: 'ヨーロッパ全域', region: 'europe', jobs: 31, color: 'from-cyan-900/20 to-slate-900 hover:border-cyan-500' },
    { flag: '🌏', name: 'アジアその他', region: 'asia', jobs: 20, color: 'from-orange-900/20 to-slate-900 hover:border-orange-500' },
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
      image: '👩‍🍳',
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
        {/* 背景画像 - 寿司職人の手元 */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1920&q=80)',
          }}
        />
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
        
        {/* グリッド背景 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] bg-repeat"></div>
        </div>

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

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 3つの強み - USP */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        {/* 背景画像 - 寿司 */}
        <div 
          className="absolute inset-0 opacity-5 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=1920&q=80)',
          }}
        />
        {/* 装飾的な背景要素 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#D4AF37]">3つの</span>
            <span className="text-gray-900">強み</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D4AF37] transition-all shadow-lg hover:shadow-2xl">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">🍣</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">寿司業界・独占特化</h3>
              <p className="text-gray-600 leading-relaxed">
                「和食全般」ではなく「寿司」に特化。<br />
                カウンターでの所作や技術を正当に評価する<br />
                ハイクラス求人のみを厳選。
              </p>
            </div>
            <div className="text-center group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D4AF37] transition-all shadow-lg hover:shadow-2xl">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">🌍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">世界中から厳選</h3>
              <p className="text-gray-600 leading-relaxed">
                AIと運営チームが審査した<br />
                「好条件・ビザサポート有」の案件のみ掲載。<br />
                妥協のない求人だけをお届けします。
              </p>
            </div>
            <div className="text-center group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D4AF37] transition-all shadow-lg hover:shadow-2xl">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">👨‍🍳</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">現役海外シェフの情報網</h3>
              <p className="text-gray-600 leading-relaxed">
                世界中で活躍する日本人シェフから提供される、<br />
                現地のリアルな生活・治安情報。<br />
                安心して挑戦できる環境を。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 国・地域から探す */}
      <section id="areas" className="py-20 px-4 bg-gradient-to-b from-slate-900 via-teal-950/30 to-slate-900 relative">
        {/* 背景画像 - 世界地図/都市 */}
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920&q=80)',
          }}
        />
        {/* 装飾 */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="text-white">国・地域から</span>
            <span className="text-[#D4AF37]">探す</span>
          </h2>
          <p className="text-center text-gray-400 mb-12">あなたの次のステージを選んでください</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {areaButtons.map((area) => (
              <Link
                key={area.country || area.region}
                href={`/jobs?${area.country ? `area=${area.country}` : `region=${area.region}`}`}
                className={`group relative bg-gradient-to-br ${area.color} border-2 border-slate-700 rounded-xl p-6 transition-all hover:scale-105 hover:shadow-xl`}
              >
                <div className="text-5xl mb-3">{area.flag}</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {area.name}
                </h3>
                <p className="text-gray-400 text-sm">{area.jobs}件の求人</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 新着・注目求人 */}
      {latestJobs.length > 0 && (
        <section className="py-20 px-4 bg-white relative">
          {/* 背景画像 - 高級レストラン */}
          <div 
            className="absolute inset-0 opacity-5 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80)',
            }}
          />
          {/* 装飾 */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0VFRUVFRSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <h2 className="text-4xl font-bold text-center mb-4">
              <span className="text-[#D4AF37]">新着</span>
              <span className="text-gray-900">・注目求人</span>
            </h2>
            <p className="text-center text-gray-600 mb-12">最新の厳選求人をチェック</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {latestJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="group bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-[#D4AF37] transition-all hover:scale-105 hover:shadow-2xl"
                >
                  {job.mainImage && (
                    <div className="h-40 overflow-hidden bg-gray-100">
                      <img
                        src={job.mainImage}
                        alt={job.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex gap-2 mb-2">
                      {job.labels.slice(0, 2).map((label, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs font-semibold bg-[#D4AF37]/20 text-[#D4AF37] rounded"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      📍 {job.area.nameJa} - {job.city}
                    </p>
                    <p className="text-[#D4AF37] font-bold text-lg">
                      💰 {job.salaryText}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/jobs"
                className="inline-block px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-full hover:bg-[#D4AF37] hover:text-black transition-all hover:scale-105"
              >
                もっと見る
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 先輩職人の声 */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-950/20 via-slate-900 to-rose-950/20 relative overflow-hidden">
        {/* 背景画像 - 寿司職人 */}
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=1920&q=80)',
          }}
        />
        {/* 背景装飾 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="text-white">先輩職人の</span>
            <span className="text-[#D4AF37]">声</span>
          </h2>
          <p className="text-center text-gray-400 mb-12">世界で活躍する日本人シェフのリアルストーリー</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {interviews.map((person, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-xl p-8 border-2 border-slate-700 hover:border-[#D4AF37] transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="text-7xl mb-4 text-center">{person.image}</div>
                <h3 className="text-xl font-bold text-white text-center mb-2">
                  {person.name} ({person.age})
                </h3>
                <p className="text-[#D4AF37] text-center mb-4">📍 {person.location}</p>
                <p className="text-gray-300 text-center whitespace-pre-line italic text-lg">
                  「{person.quote}」
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 利用フロー & CTA */}
      <section id="contact" className="py-20 px-4 bg-white relative overflow-hidden">
        {/* 背景画像 - 飛行機/旅 */}
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80)',
          }}
        />
        {/* 装飾 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-12">
            <span className="text-gray-900">ご利用の</span>
            <span className="text-[#D4AF37]">流れ</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center bg-gradient-to-br from-[#D4AF37]/5 to-yellow-500/5 rounded-2xl p-6 border-2 border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all hover:scale-105 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-yellow-600 text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-[#D4AF37]/50">1</div>
              <h3 className="text-gray-900 font-bold mb-2 text-lg">求人チェック</h3>
              <p className="text-gray-700 text-sm">気になる求人を探す</p>
            </div>
            <div className="text-center bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl p-6 border-2 border-emerald-500/20 hover:border-emerald-500 transition-all hover:scale-105 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-emerald-500/50">2</div>
              <h3 className="text-gray-900 font-bold mb-2 text-lg">LINE相談</h3>
              <p className="text-gray-700 text-sm">気軽に質問・相談</p>
            </div>
            <div className="text-center bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl p-6 border-2 border-blue-500/20 hover:border-blue-500 transition-all hover:scale-105 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-blue-500/50">3</div>
              <h3 className="text-gray-900 font-bold mb-2 text-lg">マッチング</h3>
              <p className="text-gray-700 text-sm">最適な求人をご紹介</p>
            </div>
            <div className="text-center bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl p-6 border-2 border-purple-500/20 hover:border-purple-500 transition-all hover:scale-105 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-purple-500/50">4</div>
              <h3 className="text-gray-900 font-bold mb-2 text-lg">渡航</h3>
              <p className="text-gray-700 text-sm">新しい挑戦へ</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 rounded-2xl p-12 border-2 border-[#D4AF37]/40 shadow-2xl shadow-indigo-500/20">
            <p className="text-2xl text-white mb-8">
              まずはLINEで、<br className="md:hidden" />
              <span className="text-[#D4AF37] font-bold">あなたの可能性を確認</span>しませんか？
            </p>
            <a
              href={process.env.LINE_OFFICIAL_URL || '#'}
              className="inline-block px-12 py-5 bg-[#06C755] text-white font-bold text-xl rounded-full hover:bg-[#05B04D] transition-all hover:scale-110 shadow-2xl"
            >
              <span className="flex items-center gap-3">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"></path>
                </svg>
                LINEでキャリア相談する
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-black border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-bold inline-block mb-4">
              <span className="text-white">🍣 Global Sushi</span>
              <span className="text-[#D4AF37]"> Career</span>
            </Link>
            <p className="text-gray-400">世界で輝く寿司職人のキャリアプラットフォーム</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <Link href="/jobs" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              求人一覧
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              About
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              利用規約
            </Link>
            <Link href="/admin/import" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              管理画面
            </Link>
          </div>
          
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; 2026 Global Sushi Career. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* SP用追従ボタン */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-black via-black to-transparent">
        <a
          href={process.env.LINE_OFFICIAL_URL || '#'}
          className="block w-full py-4 bg-[#06C755] text-white font-bold text-center rounded-full shadow-lg"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"></path>
            </svg>
            LINEで求人相談
          </span>
        </a>
      </div>
    </div>
  );
}
