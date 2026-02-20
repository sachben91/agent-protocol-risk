import Link from "next/link";

export function Nav() {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <span
            className="font-mono font-bold text-xs tracking-widest text-white bg-black px-2 py-1 rounded"
          >
            RISK
          </span>
          <span className="text-sm font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
            Agent Protocol Risk
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/methodology"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors no-underline"
          >
            Methodology
          </Link>
          <a
            href="https://summerofprotocols.com/dangerous-protocols-web"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors no-underline"
          >
            Framework ↗
          </a>
        </div>
      </div>
    </nav>
  );
}
