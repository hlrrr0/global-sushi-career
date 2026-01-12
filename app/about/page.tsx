import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About - Global Sushi Career',
  description: '日本の寿司職人は、もっと評価されるべきだ。技術に見合った対価と、アーティストとしての敬意が得られる環境へ。',
};

export default function AboutPage() {
  const lineUrl = process.env.LINE_OFFICIAL_URL || process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL || '#';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section: 問いかけ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* 背景画像 - 寿司職人の横顔 */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1920&q=80)',
            filter: 'grayscale(30%) brightness(0.4)',
          }}
        />
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        
        {/* コンテンツ */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            その技術の適正価格を、<br />
            <span className="text-[#D4AF37]">知っていますか？</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
            日本で磨いた10年は、世界では宝物になる。
          </p>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            言葉の壁、ビザの壁、情報の壁。それらが理由で、世界への挑戦を諦めていませんか？<br />
            <span className="text-[#D4AF37] font-semibold">Global Sushi Career</span>は、寿司職人の海外挑戦を"当たり前"にするためのキャリア支援プラットフォームです。
          </p>
        </div>
      </section>

      {/* Market Data: 市場価値の可視化 */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            同じ技術でも、<span className="text-[#D4AF37]">場所が変われば価値は3倍</span>
          </h2>
          
          {/* インフォグラフィック */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* 日本 */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg text-center">
              <div className="text-6xl mb-4">🇯🇵</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">日本</h3>
              <p className="text-gray-600 mb-4">寿司職人 平均年収</p>
              <div className="text-5xl font-bold text-gray-800 mb-2">450万円</div>
              <p className="text-sm text-gray-500">※経験10年程度</p>
            </div>

            {/* 米国 */}
            <div className="bg-gradient-to-br from-[#D4AF37]/10 to-yellow-500/10 rounded-2xl p-8 border-2 border-[#D4AF37] shadow-xl text-center relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#D4AF37] text-black text-xs font-bold px-3 py-1 rounded-full">
                2.7倍
              </div>
              <div className="text-6xl mb-4">🇺🇸</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">米国</h3>
              <p className="text-gray-600 mb-4">寿司職人 平均年収</p>
              <div className="text-5xl font-bold text-[#D4AF37] mb-2">1,200万円</div>
              <p className="text-sm text-gray-600">※給与＋チップ込み</p>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              同じ技術、同じ労働時間でも、<span className="font-bold text-[#D4AF37]">場所を変えるだけで価値は2倍、3倍になります。</span><br />
              これは夢物語ではなく、世界のスタンダードです。
            </p>
          </div>
        </div>
      </section>

      {/* Our Value: 選ばれる3つの理由 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            選ばれる<span className="text-[#D4AF37]">3つの理由</span>
          </h2>
          <p className="text-center text-gray-600 mb-16">Why Global Sushi Career</p>

          <div className="grid md:grid-cols-3 gap-10">
            {/* 1. 厳選された求人 */}
            <div className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-yellow-600 rounded-full flex items-center justify-center text-5xl shadow-lg shadow-[#D4AF37]/30 group-hover:scale-110 transition-transform">
                  ✓
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Curated by Tech & Pro
              </h3>
              <p className="text-lg font-semibold text-[#D4AF37] mb-3">厳選された求人</p>
              <p className="text-gray-700 leading-relaxed">
                怪しい求人は一切排除。AIと運営チームの二重チェックを通過した、<span className="font-bold">ビザサポート確約・高待遇の案件のみ</span>を掲載します。
              </p>
            </div>

            {/* 2. グローバルネットワーク */}
            <div className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-5xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                  🌍
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Global Chef Network
              </h3>
              <p className="text-lg font-semibold text-emerald-600 mb-3">現地のリアル情報</p>
              <p className="text-gray-700 leading-relaxed">
                求人票には載っていない、治安・家賃・教育事情など。<span className="font-bold">世界各国で活躍する日本人シェフのネットワーク</span>から、現地の生の情報をお届けします。
              </p>
            </div>

            {/* 3. LINE完結 */}
            <div className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-5xl shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  💬
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Agent System
              </h3>
              <p className="text-lg font-semibold text-blue-600 mb-3">LINE完結</p>
              <p className="text-gray-700 leading-relaxed">
                面倒な書類作成は不要。<span className="font-bold">LINEで経歴と希望を伝えるだけ</span>で、あなたにマッチする非公開求人が届きます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Message: 運営の想い */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-black relative overflow-hidden">
        {/* 装飾 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-white leading-tight">
            職人が、世界で<br className="md:hidden" />
            <span className="text-[#D4AF37]">一番輝ける場所へ。</span>
          </h2>
          
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              日本の食文化の象徴である寿司。<br />
              その担い手が経済的に豊かになることは、<span className="text-white font-semibold">日本の誇り</span>です。
            </p>
            <p>
              私たちは単なる求人サイトではありません。<br />
              <span className="text-[#D4AF37] font-bold text-xl">あなたの人生を変えるパートナー</span>です。
            </p>
            <p>
              技術に見合った対価を得ること。<br />
              アーティストとしての敬意を受けること。<br />
              それは当然の権利です。
            </p>
            <p className="text-white font-semibold text-xl pt-4">
              世界は、あなたの技術を待っています。
            </p>
          </div>
        </div>
      </section>

      {/* FAQ: よくある不安の解消 */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            よくある<span className="text-[#D4AF37]">ご質問</span>
          </h2>
          <p className="text-center text-gray-600 mb-12">FAQ</p>

          <div className="space-y-6">
            {/* Q1 */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#D4AF37] transition-colors shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                <span className="text-[#D4AF37] mr-3 text-2xl">Q.</span>
                <span>英語が全く話せませんが大丈夫ですか？</span>
              </h3>
              <p className="text-gray-700 ml-10 leading-relaxed">
                <span className="font-bold text-emerald-600">A.</span> 技術があれば採用されるケースは多数あります。日本人オーナー店や通訳付きの求人もご紹介可能です。実際、英語力ゼロから渡航して活躍している職人も多くいます。
              </p>
            </div>

            {/* Q2 */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#D4AF37] transition-colors shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                <span className="text-[#D4AF37] mr-3 text-2xl">Q.</span>
                <span>ビザの取得は難しいですか？</span>
              </h3>
              <p className="text-gray-700 ml-10 leading-relaxed">
                <span className="font-bold text-emerald-600">A.</span> 国や経験によりますが、<span className="font-bold">ビザサポート実績のある店舗のみをご紹介</span>し、申請もサポートします。必要書類の準備から申請代行まで、専任エージェントがフォローします。
              </p>
            </div>

            {/* Q3 */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#D4AF37] transition-colors shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                <span className="text-[#D4AF37] mr-3 text-2xl">Q.</span>
                <span>費用はかかりますか？</span>
              </h3>
              <p className="text-gray-700 ml-10 leading-relaxed">
                <span className="font-bold text-emerald-600">A.</span> <span className="font-bold text-[#D4AF37] text-lg">求職者様からは一切いただきません。完全無料です。</span>採用企業からの成功報酬で運営しているため、安心してご利用ください。
              </p>
            </div>

            {/* Q4 */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#D4AF37] transition-colors shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                <span className="text-[#D4AF37] mr-3 text-2xl">Q.</span>
                <span>現在の職場で働きながら相談できますか？</span>
              </h3>
              <p className="text-gray-700 ml-10 leading-relaxed">
                <span className="font-bold text-emerald-600">A.</span> もちろんです。LINEでのやり取りなので、お好きなタイミングで相談いただけます。情報収集だけでも大歓迎です。無理な勧誘は一切いたしません。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA: クロージング */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
        {/* 装飾 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            まずは、あなたの<br className="md:hidden" />
            <span className="text-[#D4AF37]">市場価値を知ること</span>から。
          </h2>
          
          <p className="text-lg text-gray-300 mb-10 leading-relaxed">
            無料キャリア相談で、海外求人情報をお届けします。<br />
            <span className="text-sm text-gray-400">※無理な勧誘はしません。ブロックも自由です。</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[#06C755] to-[#00B900] text-white font-bold text-lg rounded-full hover:scale-105 transition-all shadow-2xl hover:shadow-[#06C755]/50"
            >
              <span className="mr-3 text-2xl">💬</span>
              無料キャリア相談・求人を受け取る
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center px-10 py-5 border-2 border-[#D4AF37] text-[#D4AF37] font-bold text-lg rounded-full hover:bg-[#D4AF37] hover:text-black transition-all hover:scale-105"
            >
              求人一覧を見る
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>完全無料</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>24時間以内に返信</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>秘密厳守</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
