'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ForBusinessPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    area: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: 実際のAPI呼び出しを実装
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6">
            ✓
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            お問い合わせありがとうございます
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            担当者より2営業日以内にご連絡させていただきます。<br />
            自動返信メールをご確認ください。
          </p>
          <Link
            href="/for-business"
            className="inline-block px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-full hover:bg-yellow-600 transition-colors"
          >
            ページに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white py-20 px-6 overflow-hidden">
        {/* 装飾 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* バッジ */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="px-4 py-2 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-full text-[#D4AF37] text-sm font-bold">
              寿司特化型求人 登録数 No.1
            </span>
            <span className="px-4 py-2 bg-blue-500/20 border border-blue-500 rounded-full text-blue-300 text-sm font-bold">
              海外採用実績多数
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-[#D4AF37]">初期費用0円・掲載費0円。</span><br />
            本物の日本人寿司職人を採用するなら、<br />
            <span className="text-white">Global Sushi Career。</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            世界中の寿司レストランが利用。<br />
            Visa要件を満たす即戦力層にダイレクトにアプローチできます。
          </p>

          <a
            href="#contact"
            className="inline-block px-10 py-5 bg-[#D4AF37] text-black font-bold text-lg rounded-full hover:bg-yellow-600 transition-all hover:scale-105 shadow-2xl"
          >
            まずは無料で資料請求・お問い合わせ
          </a>
        </div>
      </section>

      {/* Current Issues: 採用課題への共感 */}
      <section className="py-20 px-6 bg-gray-50 relative overflow-hidden">
        {/* 背景画像 - 寿司職人の修行風景 */}
        <div 
          className="absolute inset-0 opacity-5 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1920&q=80)',
          }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            こんな採用の<span className="text-[#D4AF37]">お悩み</span>はありませんか？
          </h2>
          <p className="text-center text-gray-600 mb-12">Current Issues</p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: '😞',
                title: '技術レベルが低い応募ばかり',
                description: '現地の求人サイトでは、本格的な寿司の技術を持った人材に出会えない。',
              },
              {
                icon: '🚪',
                title: 'すぐに辞めてしまう',
                description: 'ビザのスポンサーをしても、定着率が低く、採用コストが無駄になる。',
              },
              {
                icon: '💸',
                title: 'エージェント費用が高すぎる',
                description: '紹介手数料が年収の30-40%で、複数名採用すると予算を圧迫する。',
              },
              {
                icon: '🌐',
                title: '英語と技術を両立した人材がいない',
                description: '技術はあっても言葉が通じない、または語学力優先で技術が不足。',
              },
            ].map((issue, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-red-400 transition-colors shadow-md"
              >
                <div className="text-5xl mb-4">{issue.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{issue.title}</h3>
                <p className="text-gray-600 leading-relaxed">{issue.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solution: 選ばれる3つの理由 */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-black relative overflow-hidden">
        {/* 背景画像 - 寿司カウンター */}
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=1920&q=80)',
          }}
        />
        {/* 装飾 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Global Sushi Career が<span className="text-[#D4AF37]">選ばれる理由</span>
          </h2>
          <p className="text-center text-gray-400 mb-16">Our Solution</p>

          <div className="grid md:grid-cols-3 gap-10">
            {/* 1. 寿司職人特化型 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-yellow-600 rounded-full flex items-center justify-center text-5xl shadow-lg shadow-[#D4AF37]/30">
                  🍣
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                寿司職人・特化型データベース
              </h3>
              <p className="text-gray-300 leading-relaxed">
                「和食全般」ではなく「寿司」に特化。カウンター業務や魚の扱いに長けた人材のみが集まるため、<span className="font-bold text-white">技術ミスマッチが極小</span>。
              </p>
            </div>

            {/* 2. Visa Ready */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-5xl shadow-lg shadow-emerald-500/30">
                  ✓
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                スキルと語学の可視化<br />(Visa Ready)
              </h3>
              <p className="text-gray-300 leading-relaxed">
                技術年数だけでなく、「英語力」「海外就労意欲」でスクリーニング済み。<span className="font-bold text-white">ビザ取得可能性の高い人材のみ</span>をご紹介。
              </p>
            </div>

            {/* 3. 完全成功報酬 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-5xl shadow-lg shadow-blue-500/30">
                  ¥0
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                完全成功報酬<br />(No Cure, No Pay)
              </h3>
              <p className="text-gray-300 leading-relaxed">
                求人掲載は無料。何名面接しても無料。費用発生は<span className="font-bold text-white">「採用決定時」のみ</span>。掛け捨てリスク一切なし。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Database: 登録人材のイメージ */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* 背景画像 - 世界地図/グローバル */}
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920&q=80)',
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            登録人材の<span className="text-[#D4AF37]">イメージ</span>
          </h2>
          <p className="text-center text-gray-600 mb-12">Database Overview</p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* 経験年数 */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">経験年数の分布</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">10年以上</span>
                    <span className="font-bold text-[#D4AF37]">40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-[#D4AF37] h-3 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">5〜10年</span>
                    <span className="font-bold text-emerald-600">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">3〜5年（若手挑戦層）</span>
                    <span className="font-bold text-blue-600">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 年齢層 */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">年齢層の分布</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">20代</span>
                    <span className="font-bold text-purple-600">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-purple-500 h-3 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">30代</span>
                    <span className="font-bold text-indigo-600">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-indigo-500 h-3 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">40代以上</span>
                    <span className="font-bold text-gray-600">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gray-500 h-3 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 匿名プロフィール例 */}
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">登録者プロフィール例（匿名）</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                age: '32歳',
                experience: '銀座で修行8年',
                language: '日常会話レベルの英語',
                hope: 'ニューヨーク希望',
              },
              {
                age: '28歳',
                experience: '旅館出身・カウンター経験あり',
                language: '英語学習中',
                hope: 'シンガポール希望',
              },
              {
                age: '35歳',
                experience: '江戸前寿司 12年',
                language: 'TOEIC 650点',
                hope: 'ロンドン希望',
              },
            ].map((profile, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-md">
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">👨‍🍳</div>
                  <div className="text-2xl font-bold text-[#D4AF37] mb-2">{profile.age}</div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700"><span className="font-bold">経験:</span> {profile.experience}</p>
                  <p className="text-gray-700"><span className="font-bold">語学:</span> {profile.language}</p>
                  <p className="text-gray-700"><span className="font-bold">希望:</span> {profile.hope}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing: 料金体系 */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        {/* 背景画像 - 高級レストラン */}
        <div 
          className="absolute inset-0 opacity-5 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80)',
          }}
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            <span className="text-[#D4AF37]">シンプル</span>な料金体系
          </h2>
          <p className="text-center text-gray-600 mb-12">Pricing</p>

          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-2xl p-10 text-white shadow-2xl">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-[#D4AF37] mb-2">¥0</div>
                <h3 className="text-xl font-bold mb-2">初期費用</h3>
                <p className="text-gray-400 text-sm">登録・契約時</p>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-[#D4AF37] mb-2">¥0</div>
                <h3 className="text-xl font-bold mb-2">求人掲載費</h3>
                <p className="text-gray-400 text-sm">何件掲載しても</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">成果報酬のみ</div>
                <h3 className="text-xl font-bold mb-2">採用決定時</h3>
                <p className="text-gray-400 text-sm">想定年収の一定割合</p>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6 text-center">
              <p className="text-gray-300 leading-relaxed">
                ※ 早期退職時の返金規定あり（詳細はお問い合わせください）<br />
                ※ 料金は採用企業の所在地・規模により異なります
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-gray-700">
              <span className="font-bold text-[#D4AF37]">採用成功まで、一切費用はかかりません。</span><br />
              リスクゼロで、最高の人材にアプローチできます。
            </p>
          </div>
        </div>
      </section>

      {/* Flow: 採用までの流れ */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
        {/* 背景画像 - 寿司職人の手元 */}
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=1920&q=80)',
          }}
        />
        {/* 装飾 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            採用までの<span className="text-[#D4AF37]">流れ</span>
          </h2>
          <p className="text-center text-gray-400 mb-12">Recruitment Flow</p>

          <div className="relative">
            {/* 縦線 */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-[#D4AF37]/30 hidden md:block"></div>

            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'お問い合わせ',
                  description: 'フォームよりご連絡ください。24時間以内に担当者よりご連絡いたします。',
                  color: 'from-[#D4AF37] to-yellow-600',
                },
                {
                  step: '2',
                  title: 'ヒアリング・契約',
                  description: '求める人物像、待遇、ビザ要件などを詳しくヒアリング。契約を締結します。',
                  color: 'from-emerald-500 to-teal-600',
                },
                {
                  step: '3',
                  title: '求人掲載・紹介',
                  description: 'サイト掲載＆登録者へのスカウト配信。条件に合う候補者を直接ご紹介します。',
                  color: 'from-blue-500 to-indigo-600',
                },
                {
                  step: '4',
                  title: '面接',
                  description: 'オンライン面接やビデオ通話にて実施。複数名の面接も可能です。',
                  color: 'from-purple-500 to-pink-600',
                },
                {
                  step: '5',
                  title: '内定・ビザ申請',
                  description: '採用決定後、ビザ申請をサポート。必要書類の準備もお手伝いします。',
                  color: 'from-orange-500 to-red-600',
                },
                {
                  step: '6',
                  title: '入社・お支払い',
                  description: '勤務開始を確認後、請求書を発行いたします。',
                  color: 'from-cyan-500 to-blue-600',
                },
              ].map((flow, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${flow.color} rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg relative z-10`}>
                    {flow.step}
                  </div>
                  <div className="flex-1 bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-md border-2 border-slate-700 hover:border-[#D4AF37] transition-colors">
                    <h3 className="text-xl font-bold text-white mb-2">{flow.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{flow.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        {/* 背景画像 - 国際的なビジネスシーン */}
        <div 
          className="absolute inset-0 opacity-5 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80)',
          }}
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            よくある<span className="text-[#D4AF37]">ご質問</span>
          </h2>
          <p className="text-center text-gray-600 mb-12">FAQ</p>

          <div className="space-y-6">
            {[
              {
                q: '海外法人ですが契約可能ですか？',
                a: 'はい、可能です。世界中の日本食レストラン・企業様とお取引がございます。契約書は英文対応も可能です。',
              },
              {
                q: 'ビザのサポートは必須ですか？',
                a: 'はい、弊社からご紹介する人材は全て「海外就労を希望する方」のため、ビザサポートが必須となります。ビザ申請の実績が豊富な企業様を優先的にご紹介させていただきます。',
              },
              {
                q: '掲載から採用までの期間はどのくらいですか？',
                a: '平均で1〜3ヶ月程度です。条件や時期により異なりますが、スカウト機能により早期マッチングも可能です。',
              },
              {
                q: '掲載する求人の数に制限はありますか？',
                a: 'ございません。複数店舗での同時募集も可能です。すべて掲載費無料でご利用いただけます。',
              },
              {
                q: '契約期間の縛りはありますか？',
                a: 'ございません。採用が決まらなければ費用は発生しませんし、いつでも掲載を停止できます。',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-[#D4AF37] transition-colors">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start">
                  <span className="text-[#D4AF37] mr-3 text-2xl">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-gray-700 ml-10 leading-relaxed">
                  <span className="font-bold text-emerald-600">A.</span> {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              まずは、どのような人材がいるか<br />
              <span className="text-[#D4AF37]">お問い合わせ</span>ください
            </h2>
            <p className="text-gray-300">
              2営業日以内にご連絡いたします
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  会社名 / 店舗名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                  placeholder="例: Sushi Tokyo NYC"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  ご担当者名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                  placeholder="例: 山田 太郎"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                  placeholder="例: contact@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  電話番号 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                  placeholder="例: +1-212-555-0123"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  募集エリア（国・都市） <span className="text-red-500">*</span>
                </label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="">選択してください</option>
                  <option value="usa">アメリカ</option>
                  <option value="uk">イギリス</option>
                  <option value="australia">オーストラリア</option>
                  <option value="canada">カナダ</option>
                  <option value="singapore">シンガポール</option>
                  <option value="uae">UAE（ドバイ）</option>
                  <option value="europe">ヨーロッパその他</option>
                  <option value="asia">アジアその他</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  備考・ご要望（任意）
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                  placeholder="募集ポジション、希望時期、その他ご要望など"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 bg-[#D4AF37] text-black font-bold text-lg rounded-lg transition-all ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-600 hover:scale-105'
                } shadow-xl`}
              >
                {isSubmitting ? '送信中...' : 'お問い合わせ・求人掲載依頼（無料）'}
              </button>

              <p className="text-center text-sm text-gray-600">
                ※ 送信後、自動返信メールをお送りします。<br />
                2営業日以内に担当者よりご連絡させていただきます。
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Sticky CTA Button (Mobile) */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <a
          href="#contact"
          className="flex items-center justify-center w-16 h-16 bg-[#D4AF37] text-black rounded-full shadow-2xl hover:scale-110 transition-transform"
        >
          <span className="text-2xl">📧</span>
        </a>
      </div>

      {/* Sticky CTA Button (Desktop) */}
      <div className="hidden md:block fixed bottom-8 right-8 z-50">
        <a
          href="#contact"
          className="px-6 py-4 bg-[#D4AF37] text-black font-bold rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2"
        >
          <span className="text-xl">📧</span>
          <span>お問い合わせ</span>
        </a>
      </div>
    </div>
  );
}
