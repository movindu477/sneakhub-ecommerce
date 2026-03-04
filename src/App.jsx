import { useState } from 'react'
import { Rocket, Sparkles, Layout, Zap, Github } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-cyan-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            SneakHub
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-cyan-400 transition-colors">Features</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Templates</a>
          <a href="https://github.com" className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700 px-4 py-2 rounded-full transition-all text-white">
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3 h-3" />
              Tailwind V4 + React + Vite
            </div>

            <h1 className="text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-8 tracking-tight">
              Build <span className="text-white">Faster</span>. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Ship Smarter.
              </span>
            </h1>

            <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
              Launch your next project with a premium codebase. Pre-configured with Tailwind CSS v4, Lucide icons, and modern best practices.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-cyan-50 transition-all transform hover:-translate-y-1 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Get Started
              </button>
              <button className="px-8 py-4 bg-slate-800/80 text-white font-bold rounded-2xl hover:bg-slate-700 transition-all border border-slate-700/50 backdrop-blur-sm">
                View Demo
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-slate-900/50 border border-slate-700/50 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 overflow-hidden shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/50 transition-colors group/card">
                  <Layout className="w-10 h-10 text-cyan-400 mb-4 group-hover/card:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white mb-2">Modern Layout</h3>
                  <p className="text-sm text-slate-400">Fully responsive grid system powered by Tailwind v4.</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-purple-500/50 transition-colors group/card">
                  <Zap className="w-10 h-10 text-purple-400 mb-4 group-hover/card:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white mb-2">Instant Start</h3>
                  <p className="text-sm text-slate-400">Zero-config development with lightning fast hot reloads.</p>
                </div>
                <div className="col-span-2 p-8 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-cyan-600/20 border border-slate-700/50 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Scale Effortlessly</h3>
                    <p className="text-sm text-slate-300">Architecture designed for growing teams.</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-slate-800/50 py-12">
        <div className="max-w-7xl mx-auto px-8 text-center text-slate-500 text-sm">
          <p>© 2026 SneakHub. Powered by Antigravity AI.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
