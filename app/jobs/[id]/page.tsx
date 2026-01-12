import Link from 'next/link';
import { getJobById } from '@/lib/microcms';
import { convertMicroCMSJobToJob } from '@/lib/utils/converter';
import { notFound } from 'next/navigation';

// 動的レンダリングを強制（ビルド時の環境変数エラーを回避）
export const dynamic = 'force-dynamic';

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    // IDからソース判定 (cms_xxx または agent_xxx)
    const [source, actualId] = params.id.split('_');
    
    if (source !== 'cms' && source !== 'agent') {
      notFound();
    }

    // TODO: Agent System APIからの取得も実装
    if (source === 'agent') {
      // Agent System APIから取得
      notFound(); // 未実装のため
    }

    // MicroCMSから取得
    const cmsJob = await getJobById(actualId);
    const job = convertMicroCMSJobToJob(cmsJob);

    // LINE URLの生成
    const lineUrl = process.env.LINE_OFFICIAL_URL || 'https://line.me/R/ti/p/@example';
    const lineUrlWithParams = `${lineUrl}?job_id=${job.id}`;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              🍣 World Sushi Career
            </Link>
            <nav className="flex gap-6">
              <Link href="/jobs" className="text-gray-900 hover:text-yellow-600 transition-colors">
                求人検索
              </Link>
              <Link href="/about" className="text-gray-900 hover:text-yellow-600 transition-colors">
                About
              </Link>
            </nav>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* パンくず */}
          <div className="mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">トップ</Link>
            {' > '}
            <Link href="/jobs" className="hover:text-gray-900">求人検索</Link>
            {' > '}
            <span className="text-gray-900">{job.title}</span>
          </div>

          {/* メイン画像 */}
          {job.mainImage && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={job.mainImage}
                alt={job.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* 求人情報 */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            {/* ラベル */}
            <div className="flex gap-2 mb-4">
              {job.labels.map((label, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm font-semibold bg-yellow-100 text-yellow-800 rounded"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* タイトル */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {job.title}
            </h1>

            {/* 基本情報 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-6 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600 mb-1">勤務地</div>
                <div className="text-lg font-semibold text-gray-900">
                  {job.area.flagImage && (
                    <img src={job.area.flagImage} alt={job.area.nameJa} className="inline w-6 h-4 mr-2" />
                  )}
                  {job.area.nameJa} - {job.city}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">給与</div>
                <div className="text-lg font-semibold text-green-600">
                  {job.salaryText}
                </div>
              </div>
            </div>

            {/* 詳細説明 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">求人詳細</h2>
              <div className="prose max-w-none text-gray-700">
                {job.content}
              </div>
            </div>

            {/* Pick案件の場合は元URLを表示（小さく） */}
            {job.originalUrl && (
              <div className="mb-6 text-sm text-gray-500">
                <p>情報元: {new URL(job.originalUrl).hostname}</p>
              </div>
            )}

            {/* 応募ボタン */}
            <div className="text-center">
              <a
                href={lineUrlWithParams}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white font-bold px-12 py-4 rounded-full hover:bg-green-600 transition-transform hover:scale-105"
              >
                💬 LINEで応募する
              </a>
              <p className="mt-4 text-sm text-gray-600">
                応募はLINE公式アカウントから簡単に行えます
              </p>
            </div>
          </div>

          {/* 戻るリンク */}
          <div className="text-center">
            <Link
              href="/jobs"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← 求人一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching job:', error);
    notFound();
  }
}
