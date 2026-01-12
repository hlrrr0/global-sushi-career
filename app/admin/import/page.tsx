'use client';

import { useState, useEffect } from 'react';
import { AIAnalysisResult } from '@/lib/types';

interface Area {
  id: string;
  name: string;
  nameJa: string;
}

export default function AdminImportPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [areas, setAreas] = useState<Area[]>([]);

  // フォーム用の状態
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [salaryText, setSalaryText] = useState('');
  const [content, setContent] = useState('');
  const [areaId, setAreaId] = useState('');

  // エリア一覧を取得
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('/api/areas');
        const data = await response.json();
        if (data.areas) {
          setAreas(data.areas);
        }
      } catch (err) {
        console.error('Failed to fetch areas:', err);
      }
    };
    fetchAreas();
  }, []);

  const handleAnalyze = async () => {
    if (!url) {
      setError('URLを入力してください');
      return;
    }

    setLoading(true);
    setAnalyzing(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze');
      }

      setAnalysis(data.data);

      // フォームに自動入力
      setTitle(data.data.titleJa || data.data.title);
      setCity(data.data.city);
      setSalaryText(data.data.salaryJpy || data.data.salary);
      setContent(data.data.summary || data.data.descriptionJa);
      // areaIdは手動選択が必要

      setSuccess('解析が完了しました！内容を確認して保存してください。');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
      setAnalyzing(false);
    }
  };

  const handleSave = async (status: 'draft' | 'publish') => {
    if (!title || !city || !salaryText || !content || !areaId) {
      setError('すべての必須項目を入力してください');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/create-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          areaId,
          city,
          salaryText,
          content,
          originalUrl: url,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save');
      }

      setSuccess(
        `求人が${status === 'draft' ? '下書き' : '公開'}として保存されました！`
      );

      // フォームをリセット
      setUrl('');
      setTitle('');
      setCity('');
      setSalaryText('');
      setContent('');
      setAreaId('');
      setAnalysis(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI求人登録ツール
          </h1>
          <p className="text-gray-600 mb-6">
            海外の求人サイトのURLを入力すると、AIが自動で情報を抽出・翻訳します
          </p>

          {/* URL入力 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              求人ページのURL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/job/123"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              <button
                onClick={handleAnalyze}
                disabled={loading || !url}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {analyzing ? '解析中...' : 'AI解析'}
              </button>
            </div>
          </div>

          {/* エラー・成功メッセージ */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800">{success}</p>
            </div>
          )}

          {/* 解析中のローディング */}
          {analyzing && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">AIが求人情報を解析しています...</p>
            </div>
          )}
        </div>

        {/* 解析結果フォーム */}
        {analysis && !analyzing && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              求人情報の確認・編集
            </h2>

            <div className="space-y-4">
              {/* タイトル */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  求人タイトル *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* エリア選択 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  国・地域 *
                </label>
                <select
                  value={areaId}
                  onChange={(e) => setAreaId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">選択してください</option>
                  {areas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.nameJa} ({area.name})
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  推測: {analysis.country}
                </p>
              </div>

              {/* 都市 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  都市 *
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 給与 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  給与 *
                </label>
                <input
                  type="text"
                  value={salaryText}
                  onChange={(e) => setSalaryText(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  元の通貨: {analysis.salary}
                </p>
              </div>

              {/* 詳細 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  求人詳細 *
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* AI解析の詳細情報 */}
              <details className="border border-gray-200 rounded-md p-4">
                <summary className="cursor-pointer font-medium text-gray-700">
                  AI解析の詳細情報を表示
                </summary>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <strong className="text-blue-700">📝 原文タイトル:</strong>
                    <p className="mt-1 text-gray-700">{analysis.title}</p>
                  </div>

                  {analysis.position && (
                    <div>
                      <strong className="text-blue-700">👔 ポジション:</strong>
                      <p className="mt-1 text-gray-700">{analysis.position}</p>
                    </div>
                  )}

                  {analysis.experienceLevel && (
                    <div>
                      <strong className="text-blue-700">📊 経験レベル:</strong>
                      <p className="mt-1 text-gray-700">{analysis.experienceLevel}</p>
                    </div>
                  )}

                  {analysis.location && (
                    <div>
                      <strong className="text-blue-700">📍 詳細住所:</strong>
                      <p className="mt-1 text-gray-700">{analysis.location}</p>
                    </div>
                  )}

                  {analysis.restaurantName && (
                    <div>
                      <strong className="text-blue-700">🏪 レストラン名:</strong>
                      <p className="mt-1 text-gray-700">{analysis.restaurantName}</p>
                    </div>
                  )}

                  {analysis.restaurantType && (
                    <div>
                      <strong className="text-blue-700">🍽️ お店のタイプ:</strong>
                      <p className="mt-1 text-gray-700">{analysis.restaurantType}</p>
                    </div>
                  )}

                  <div>
                    <strong className="text-blue-700">📄 原文説明:</strong>
                    <p className="mt-1 text-gray-700 whitespace-pre-wrap">{analysis.description}</p>
                  </div>

                  {analysis.requirements && (
                    <div>
                      <strong className="text-blue-700">✅ 応募資格:</strong>
                      <div className="mt-1 text-gray-700" dangerouslySetInnerHTML={{ __html: analysis.requirements }} />
                    </div>
                  )}

                  {analysis.preferred && (
                    <div>
                      <strong className="text-blue-700">⭐ 望ましいスキル:</strong>
                      <div className="mt-1 text-gray-700" dangerouslySetInnerHTML={{ __html: analysis.preferred }} />
                    </div>
                  )}

                  {analysis.benefits && (
                    <div>
                      <strong className="text-blue-700">🎁 福利厚生:</strong>
                      <div className="mt-1 text-gray-700" dangerouslySetInnerHTML={{ __html: analysis.benefits }} />
                    </div>
                  )}

                  {analysis.visaSupport && (
                    <div>
                      <strong className="text-blue-700">🛂 ビザサポート:</strong>
                      <p className="mt-1 text-gray-700">{analysis.visaSupport}</p>
                    </div>
                  )}

                  {analysis.housingSupport && (
                    <div>
                      <strong className="text-blue-700">🏠 住居サポート:</strong>
                      <p className="mt-1 text-gray-700">{analysis.housingSupport}</p>
                    </div>
                  )}

                  {analysis.workingHours && (
                    <div>
                      <strong className="text-blue-700">⏰ 勤務時間:</strong>
                      <p className="mt-1 text-gray-700">{analysis.workingHours}</p>
                    </div>
                  )}

                  {analysis.holidays && (
                    <div>
                      <strong className="text-blue-700">🏖️ 休日:</strong>
                      <p className="mt-1 text-gray-700">{analysis.holidays}</p>
                    </div>
                  )}

                  {analysis.startDate && (
                    <div>
                      <strong className="text-blue-700">📅 勤務開始日:</strong>
                      <p className="mt-1 text-gray-700">{analysis.startDate}</p>
                    </div>
                  )}
                </div>
              </details>

              {/* 保存ボタン */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => handleSave('draft')}
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? '保存中...' : '下書きとして保存'}
                </button>
                <button
                  onClick={() => handleSave('publish')}
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? '保存中...' : '公開して保存'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
