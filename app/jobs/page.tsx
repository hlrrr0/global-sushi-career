import Link from 'next/link';
import { getJobs } from '@/lib/microcms';
import { convertMicroCMSJobToJob } from '@/lib/utils/converter';

// 動的レンダリングを強制（ビルド時の環境変数エラーを回避）
export const dynamic = 'force-dynamic';

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { area?: string; keyword?: string };
}) {
  // MicroCMSから求人を取得
  const { contents: cmsJobs } = await getJobs();
  const jobs = cmsJobs.map(convertMicroCMSJobToJob);

  // フィルタリング
  const filteredJobs = jobs.filter((job) => {
    if (searchParams.area && job.area.id !== searchParams.area) {
      return false;
    }
    if (searchParams.keyword && !job.title.toLowerCase().includes(searchParams.keyword.toLowerCase())) {
      return false;
    }
    return true;
  });

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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          求人検索 {searchParams.area && `- ${searchParams.area}`}
        </h1>

        {/* 検索フォーム */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form method="GET" action="/jobs" className="flex gap-4">
            <input
              type="text"
              name="keyword"
              placeholder="キーワードで検索..."
              defaultValue={searchParams.keyword}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="area"
              defaultValue={searchParams.area}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">すべての国・地域</option>
              <option value="usa">アメリカ</option>
              <option value="uk">イギリス</option>
              <option value="australia">オーストラリア</option>
              <option value="canada">カナダ</option>
            </select>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              検索
            </button>
          </form>
        </div>

        {/* 求人一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">求人が見つかりませんでした</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {job.mainImage && (
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={job.mainImage}
                      alt={job.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {job.labels.map((label, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    📍 {job.area.nameJa} - {job.city}
                  </p>
                  <p className="text-lg font-semibold text-green-600 mb-3">
                    💰 {job.salaryText}
                  </p>
                  <p className="text-gray-700 line-clamp-3">{job.content}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
