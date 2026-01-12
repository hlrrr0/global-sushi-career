import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-400 py-12 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-[#D4AF37] mb-3">Global Sushi Career</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              寿司職人の海外キャリアを支援する<br />
              求人プラットフォーム
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-3">サイト</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#D4AF37] transition-colors">
                  トップ
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-[#D4AF37] transition-colors">
                  求人を探す
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D4AF37] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/for-business" className="hover:text-[#D4AF37] transition-colors">
                  採用企業様
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-3">お問い合わせ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href={process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"
                >
                  <span>💬</span>
                  LINE公式
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} Global Sushi Career. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
