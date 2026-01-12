import { UsernameForm } from "@/components/UsernameForm";

export default function Home() {
  return (
    <main className="h-screen flex flex-col bg-[#f8fafc] overflow-hidden">
      {/* Navigation */}
      <header className="w-full px-6 md:px-12 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="DevCanvas" className="h-7 w-auto" />
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[#475569] hover:text-[#0f172a] transition-colors"
        >
          GitHub →
        </a>
      </header>

      {/* Hero Section - Flex grow to fill available space */}
      <div className="flex-1 px-6 md:px-12 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ecfdf5] rounded-full mb-4">
                <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[#059669]">Free & Open Source</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] leading-[1.1] mb-4">
                Turn your GitHub
                <br />
                <span className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
                  into a portfolio
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-base text-[#475569] mb-6 max-w-lg">
                Generate a beautiful developer portfolio from your GitHub profile. No signup required.
              </p>

              {/* Form */}
              <UsernameForm />

              {/* Social proof */}
              <div className="flex items-center gap-3 mt-6 text-sm text-[#94a3b8]">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#ef4444] ring-2 ring-white" />
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#10b981] to-[#06b6d4] ring-2 ring-white" />
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] ring-2 ring-white" />
                </div>
                <span>Trusted by developers</span>
              </div>
            </div>

            {/* Right side - Preview card */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-[#e2e8f0] transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]" />
                  <div>
                    <div className="h-3 w-28 bg-[#e2e8f0] rounded mb-1.5" />
                    <div className="h-2.5 w-20 bg-[#f1f5f9] rounded" />
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-2.5 w-full bg-[#f1f5f9] rounded" />
                  <div className="h-2.5 w-4/5 bg-[#f1f5f9] rounded" />
                </div>
                <div className="flex gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-[#eef2ff] text-[#6366f1] text-xs font-medium rounded-lg">React</span>
                  <span className="px-2.5 py-1 bg-[#ecfdf5] text-[#10b981] text-xs font-medium rounded-lg">Node.js</span>
                  <span className="px-2.5 py-1 bg-[#fffbeb] text-[#f59e0b] text-xs font-medium rounded-lg">TypeScript</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-16 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]" />
                  <div className="h-16 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features - Compact row */}
      <div className="px-6 md:px-12 py-6 bg-white border-t border-[#e2e8f0] flex-shrink-0">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eef2ff] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-[#0f172a] text-sm">Instant</div>
              <div className="text-xs text-[#94a3b8]">Ready in seconds</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-[#0f172a] text-sm">No Signup</div>
              <div className="text-xs text-[#94a3b8]">Just enter username</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fffbeb] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-[#0f172a] text-sm">Always Fresh</div>
              <div className="text-xs text-[#94a3b8]">Syncs with GitHub</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Compact */}
      <footer className="px-6 md:px-12 py-4 border-t border-[#e2e8f0] flex-shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-[#94a3b8]">
          <span>© 2024 DevCanvas</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0f172a] transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}
