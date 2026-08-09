import React, { useState } from 'react';
import { 
  INTRO_MODULES, 
  WEEKLY_VIDEOS, 
  VIP_PERKS, 
  WHATSAPP_CONFIG, 
  IntroModule, 
  WeeklyVideo 
} from '../constants/tradingData';

interface TradingForALivingProps {
  onBackToPortfolio?: () => void;
}

const TradingForALiving: React.FC<TradingForALivingProps> = ({ onBackToPortfolio }) => {
  // Navigation & State
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  // Position Sizing Calculator State
  const [accountBalance, setAccountBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1.0);
  const [entryPrice, setEntryPrice] = useState<number>(1.0850);
  const [stopLossPrice, setStopLossPrice] = useState<number>(1.0800);
  
  // Live Chart Asset Selector
  const [selectedChartSymbol, setSelectedChartSymbol] = useState<string>("BINANCE:BTCUSDT");

  const currentModule = INTRO_MODULES[activeModuleIndex];

  // Toggle Module Completion
  const toggleModuleCompletion = (id: number) => {
    if (completedModules.includes(id)) {
      setCompletedModules(completedModules.filter(mId => mId !== id));
    } else {
      setCompletedModules([...completedModules, id]);
    }
  };

  const progressPercentage = Math.round((completedModules.length / INTRO_MODULES.length) * 100);

  // Filter Weekly Videos
  const filteredWeeklyVideos = selectedCategory === 'All'
    ? WEEKLY_VIDEOS
    : WEEKLY_VIDEOS.filter(v => v.category === selectedCategory);

  // Risk Calculation
  const dollarRisk = (accountBalance * (riskPercent / 100));
  const stopLossDistance = Math.abs(entryPrice - stopLossPrice);
  const positionUnits = stopLossDistance > 0 ? (dollarRisk / stopLossDistance) : 0;

  // WhatsApp Link Generator
  const generateWhatsAppUrl = (customText?: string) => {
    const textToSend = customText || WHATSAPP_CONFIG.defaultMessage;
    return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(textToSend)}`;
  };

  // Download Lesson Summary
  const downloadLessonNotes = (module: IntroModule) => {
    const content = `TRADING FOR A LIVING - MASTERCLASS CHEAT SHEET\n\n` +
      `Module ${module.id}: ${module.title}\n` +
      `Subtitle: ${module.subtitle}\n` +
      `Duration: ${module.duration}\n\n` +
      `SUMMARY:\n${module.description}\n\n` +
      `KEY TAKEAWAYS:\n${module.keyTakeaways.map(t => `• ${t}`).join('\n')}\n\n` +
      `ACTION CHECKLIST:\n${module.actionChecklist.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n\n` +
      `---\n` +
      `WhatsApp VIP Mentorship: ${generateWhatsAppUrl()}\n`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Trading_For_A_Living_Module_${module.id}_Notes.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#00E676] selection:text-black font-sans pb-24">
      
      {/* 🟢 TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-[#222222] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBackToPortfolio && (
              <button
                onClick={onBackToPortfolio}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#333333] hover:border-white text-zinc-300 hover:text-white transition flex items-center gap-1 bg-[#111111]"
              >
                ← Portfolio
              </button>
            )}
            <div className="flex items-center gap-2">
              <span className="text-xl">📈</span>
              <span className="font-extrabold tracking-tight text-white text-base md:text-lg">
                TRADING FOR A LIVING<span className="text-[#00E676]">.</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#111111] text-[#00E5FF] border border-[#222222]">
                Academy & VIP Mentorship
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-zinc-400">
            <a href="#masterclass" className="hover:text-[#00E676] transition">4-Part Masterclass</a>
            <a href="#weekly-drops" className="hover:text-[#00E676] transition">Weekly Free Drops</a>
            <a href="#live-charts" className="hover:text-[#00E676] transition">Live Charts</a>
            <a href="#calculator" className="hover:text-[#00E676] transition">1% Calculator</a>
            <a href="#whatsapp-vip" className="hover:text-[#FFD700] transition">VIP Coaching</a>
          </nav>

          <div>
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-black shadow-lg shadow-[#25D366]/20 transition transform hover:-translate-y-0.5"
            >
              <span>💬</span> WhatsApp VIP
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-8">

        {/* 🌟 HERO BANNER */}
        <section className="relative rounded-2xl bg-gradient-to-b from-[#111111] via-[#090909] to-black border border-[#222222] p-8 md:p-14 text-center mb-12 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 text-[#00E676] text-xs font-bold uppercase tracking-wider mb-5">
              🎓 100% Free Starter Academy + VIP WhatsApp Mentorship
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-5">
              The Institutional Roadmap to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">Trading for a Living</span>
            </h1>
            
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Start with the 4-part foundational masterclass below. Master market structure, candlestick dynamics, and mathematical 1% risk management, then advance directly to private 1-on-1 coaching in our VIP WhatsApp community.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#masterclass"
                className="px-6 py-3 rounded-xl bg-white hover:bg-[#00E676] text-black font-bold text-sm transition transform hover:-translate-y-0.5 shadow-xl"
              >
                📺 Start Free 4-Part Course
              </a>
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-black font-bold text-sm transition transform hover:-translate-y-0.5 shadow-xl shadow-[#25D366]/20 flex items-center gap-2"
              >
                <span>💬</span> Advance to VIP WhatsApp Group
              </a>
            </div>
          </div>
        </section>

        {/* 🎓 SECTION 1: 4-PART STARTER MASTERCLASS */}
        <section id="masterclass" className="mb-16 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[#00E5FF] font-mono font-bold text-xs uppercase tracking-widest">
                STEP 1: FOUNDATION
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                The 4-Part Introductory Masterclass
              </h2>
              <p className="text-zinc-400 text-xs md:text-sm mt-1">
                Watch each video lesson sequentially before qualifying for 1-on-1 mentoring.
              </p>
            </div>

            {/* Progress Badge */}
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-3 min-w-[240px]">
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-zinc-300">Course Progress</span>
                <span className="text-[#00E676] font-mono">{progressPercentage}% ({completedModules.length}/4)</span>
              </div>
              <div className="w-full bg-[#222222] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#00E676] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Module Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {INTRO_MODULES.map((mod, idx) => {
              const isSelected = idx === activeModuleIndex;
              const isDone = completedModules.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleIndex(idx)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected 
                      ? 'bg-[#181818] border-[#00E676] shadow-lg shadow-[#00E676]/10' 
                      : 'bg-[#0d0d0d] border-[#222222] hover:border-[#444444]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase mb-1">
                    <span className={isSelected ? 'text-[#00E676]' : 'text-zinc-400'}>
                      Module 0{mod.id}
                    </span>
                    {isDone && <span className="text-[#00E676]">✓ Done</span>}
                  </div>
                  <div className="font-bold text-white text-xs md:text-sm line-clamp-1">
                    {mod.title.split(': ')[1] || mod.title}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1">⏱️ {mod.duration}</div>
                </button>
              );
            })}
          </div>

          {/* Active Module Lesson View */}
          <div className="rounded-2xl bg-[#0e0e0e] border border-[#222222] p-6 md:p-8 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1f1f1f]">
              <div>
                <span className="text-xs font-mono text-[#00E5FF] uppercase font-bold">
                  Module 0{currentModule.id} • Duration: {currentModule.duration}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
                  {currentModule.title}
                </h3>
                <p className="text-xs md:text-sm text-zinc-400 mt-1">
                  {currentModule.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleModuleCompletion(currentModule.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 border ${
                    completedModules.includes(currentModule.id)
                      ? 'bg-[#00E676]/15 border-[#00E676] text-[#00E676]'
                      : 'bg-[#181818] border-[#333333] hover:border-white text-white'
                  }`}
                >
                  <span>{completedModules.includes(currentModule.id) ? '✓' : '○'}</span>
                  {completedModules.includes(currentModule.id) ? 'Completed' : 'Mark as Completed'}
                </button>

                <button
                  onClick={() => downloadLessonNotes(currentModule)}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold bg-[#181818] border border-[#333333] hover:border-[#00E5FF] text-zinc-300 hover:text-[#00E5FF] transition"
                  title="Download Lesson Cheat Sheet"
                >
                  📥 Cheat Sheet (.txt)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Video Player Card */}
              <div className="lg:col-span-7">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-[#242424] shadow-xl group">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentModule.youtubeId}?rel=0&modestbranding=1`}
                    title={currentModule.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  ></iframe>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-zinc-400 bg-[#080808] p-3 rounded-lg border border-[#1a1a1a]">
                  <span>▶️ HD Educational Stream</span>
                  <a 
                    href={currentModule.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00E5FF] hover:underline font-semibold flex items-center gap-1"
                  >
                    Watch on YouTube ↗
                  </a>
                </div>
              </div>

              {/* Lesson Notes & Action Items */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="mb-5">
                    <h4 className="text-xs font-mono uppercase font-bold text-[#00E676] mb-2 flex items-center gap-1.5">
                      <span>📌</span> Key Takeaways
                    </h4>
                    <ul className="space-y-2 text-xs md:text-sm text-zinc-300">
                      {currentModule.keyTakeaways.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 bg-[#141414] p-2.5 rounded-lg border border-[#202020]">
                          <span className="text-[#00E676] font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-5">
                    <h4 className="text-xs font-mono uppercase font-bold text-[#00E5FF] mb-2 flex items-center gap-1.5">
                      <span>⚡</span> Action Checklist
                    </h4>
                    <ol className="space-y-1.5 text-xs text-zinc-400">
                      {currentModule.actionChecklist.map((check, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-zinc-500 font-mono font-bold">{i + 1}.</span>
                          <span>{check}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Bottom Step-forward CTA */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#181504] to-[#0c0a02] border border-[#FFD700]/40 mt-4">
                  <div className="text-xs font-bold text-[#FFD700] mb-1">👑 Ready for personalized mentorship?</div>
                  <div className="text-[11px] text-zinc-300 mb-3">
                    Advance to 1-on-1 private coaching calls and daily trade setups on WhatsApp.
                  </div>
                  <a
                    href={generateWhatsAppUrl(`Hi Mentor, I just finished Module ${currentModule.id} and want to join the WhatsApp VIP group.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 px-4 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-black font-extrabold text-xs transition"
                  >
                    💬 Chat with Mentor on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 📺 SECTION 2: WEEKLY FREE YOUTUBE DROPS */}
        <section id="weekly-drops" className="mb-16 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[#00E5FF] font-mono font-bold text-xs uppercase tracking-widest">
                STEP 2: CONTINUOUS LEARNING
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                Weekly Free YouTube Drops & Breakdowns
              </h2>
              <p className="text-zinc-400 text-xs md:text-sm mt-1">
                Updated every week with live market breakdowns, liquidity sweeps, and psychology frameworks.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-[#0e0e0e] p-1.5 rounded-xl border border-[#222222]">
              {['All', 'Forex', 'Crypto', 'Strategy', 'Psychology'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    selectedCategory === cat
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredWeeklyVideos.map((video) => (
              <div 
                key={video.id}
                className="group rounded-xl bg-[#0e0e0e] border border-[#222222] hover:border-[#00E676] overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur text-[10px] font-bold text-[#00E5FF] border border-white/10">
                      {video.category}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur text-[10px] font-mono text-zinc-300">
                      ⏱️ {video.duration}
                    </div>
                    
                    {/* Play Overlay Button */}
                    <button
                      onClick={() => setActiveVideoModal(video.youtubeId)}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl opacity-90 group-hover:scale-110 transition"
                      aria-label="Play video"
                    >
                      <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-4">
                    <span className="text-[11px] text-zinc-500 font-mono">{video.date}</span>
                    <h4 className="font-bold text-white text-sm mt-1 mb-2 line-clamp-2 group-hover:text-[#00E676] transition">
                      {video.title}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between border-t border-[#1a1a1a] mt-2">
                  <button
                    onClick={() => setActiveVideoModal(video.youtubeId)}
                    className="text-xs font-bold text-[#00E676] hover:underline"
                  >
                    Watch Here ▶
                  </button>
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-zinc-400 hover:text-white"
                  >
                    YouTube ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 📊 SECTION 3: LIVE CANDLESTICK CHARTS */}
        <section id="live-charts" className="mb-16 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[#00E5FF] font-mono font-bold text-xs uppercase tracking-widest">
                STEP 3: REAL-TIME MARKET TERMINAL
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                Institutional Live Candlestick Terminal
              </h2>
              <p className="text-zinc-400 text-xs md:text-sm mt-1">
                Analyze price action, support & resistance levels, and volume directly on your dashboard.
              </p>
            </div>

            {/* Asset Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Bitcoin (BTC)", symbol: "BINANCE:BTCUSDT" },
                { label: "Euro / USD", symbol: "FX:EURUSD" },
                { label: "Gold (XAU/USD)", symbol: "OANDA:XAUUSD" },
                { label: "S&P 500 (SPY)", symbol: "AMEX:SPY" },
                { label: "NVIDIA (NVDA)", symbol: "NASDAQ:NVDA" },
              ].map(asset => (
                <button
                  key={asset.symbol}
                  onClick={() => setSelectedChartSymbol(asset.symbol)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                    selectedChartSymbol === asset.symbol
                      ? 'bg-white text-black border-white'
                      : 'bg-[#0e0e0e] text-zinc-300 border-[#222222] hover:border-[#444444]'
                  }`}
                >
                  {asset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive TradingView Chart Container */}
          <div className="rounded-2xl bg-[#090909] border border-[#222222] p-4 shadow-2xl">
            <div className="w-full h-[580px] rounded-xl overflow-hidden bg-black border border-[#1f1f1f]">
              <iframe
                title="TradingView Live Chart"
                src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=${encodeURIComponent(selectedChartSymbol)}&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=000000&studies=%5B%22RSI%40tv-basicstudies%22%2C%22MASimple%40tv-basicstudies%22%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%22mainSeriesProperties.candleStyle.upColor%22%3A%22%2300E676%22%2C%22mainSeriesProperties.candleStyle.downColor%22%3A%22%23FF5252%22%2C%22mainSeriesProperties.candleStyle.drawWick%22%3Atrue%2C%22mainSeriesProperties.candleStyle.drawBorder%22%3Atrue%2C%22mainSeriesProperties.candleStyle.borderColor%22%3A%22%23378658%22%2C%22mainSeriesProperties.candleStyle.borderUpColor%22%3A%22%2300E676%22%2C%22mainSeriesProperties.candleStyle.borderDownColor%22%3A%22%23FF5252%22%2C%22mainSeriesProperties.candleStyle.wickUpColor%22%3A%22%2300E676%22%2C%22mainSeriesProperties.candleStyle.wickDownColor%22%3A%22%23FF5252%22%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=localhost`}
                className="w-full h-full border-0"
              ></iframe>
            </div>
          </div>
        </section>

        {/* 🧮 SECTION 4: 1% RISK CALCULATOR */}
        <section id="calculator" className="mb-16 scroll-mt-20">
          <div className="rounded-2xl bg-gradient-to-b from-[#111114] to-[#08080a] border border-[#222222] p-8 shadow-2xl">
            <div className="max-w-3xl">
              <span className="text-[#00E676] font-mono font-bold text-xs uppercase tracking-widest">
                STEP 4: RISK CONTROL
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                Institutional 1% Position Sizing Calculator
              </h2>
              <p className="text-zinc-400 text-xs md:text-sm mt-1 mb-8">
                Never enter a trade without knowing your exact maximum dollar risk and unit sizing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">Account Balance ($)</label>
                <input
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#0a0a0c] border border-[#2a2a2a] focus:border-[#00E676] rounded-xl px-4 py-3 text-white font-mono text-base outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">Risk Per Trade (%)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="5"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(parseFloat(e.target.value) || 1)}
                  className="w-full bg-[#0a0a0c] border border-[#2a2a2a] focus:border-[#00E676] rounded-xl px-4 py-3 text-white font-mono text-base outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">Entry Price ($)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#0a0a0c] border border-[#2a2a2a] focus:border-[#00E676] rounded-xl px-4 py-3 text-white font-mono text-base outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">Stop Loss Price ($)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={stopLossPrice}
                  onChange={(e) => setStopLossPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#0a0a0c] border border-[#2a2a2a] focus:border-[#FF5252] rounded-xl px-4 py-3 text-white font-mono text-base outline-none transition"
                />
              </div>
            </div>

            {/* Calculation Output Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#0a0a0c] p-5 rounded-xl border border-[#222222]">
              <div>
                <div className="text-xs text-zinc-500 uppercase font-bold">Max Dollar Risk (1%)</div>
                <div className="text-2xl font-black text-[#FF5252] font-mono mt-1">
                  ${dollarRisk.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div>
                <div className="text-xs text-zinc-500 uppercase font-bold">Stop Loss Distance</div>
                <div className="text-2xl font-black text-white font-mono mt-1">
                  {stopLossDistance.toFixed(4)} pts
                </div>
              </div>

              <div>
                <div className="text-xs text-zinc-500 uppercase font-bold">Recommended Position Sizing</div>
                <div className="text-2xl font-black text-[#00E676] font-mono mt-1">
                  {positionUnits.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Units
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 👑 SECTION 5: WHATSAPP VIP MENTORSHIP & COACHING FUNNEL */}
        <section id="whatsapp-vip" className="scroll-mt-20">
          <div className="rounded-2xl bg-gradient-to-b from-[#181504] via-[#0e0c03] to-black border-2 border-[#FFD700] p-8 md:p-14 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl pointer-events-none select-none">💎</div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FFD700]/20 border border-[#FFD700] text-[#FFD700] text-xs font-black uppercase tracking-wider mb-4">
                👑 ADVANCE TO PRIVATE MENTORSHIP
              </span>

              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                Join the Private VIP WhatsApp Mentorship
              </h2>

              <p className="text-zinc-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-10">
                Ready to take trading seriously? Skip years of trial and error. Connect directly with the lead mentor on WhatsApp for weekly 1-on-1 coaching calls, daily high-probability trade setups, and live mastermind sessions.
              </p>

              {/* VIP Perks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left mb-10">
                {VIP_PERKS.map((perk, i) => (
                  <div key={i} className="bg-black/60 border border-[#333333] hover:border-[#FFD700]/60 p-5 rounded-xl transition backdrop-blur">
                    <div className="text-2xl mb-2">{perk.icon}</div>
                    <h4 className="font-bold text-white text-base mb-1">{perk.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{perk.description}</p>
                  </div>
                ))}
              </div>

              {/* WhatsApp Conversion Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-black font-extrabold text-base transition transform hover:-translate-y-1 shadow-2xl shadow-[#25D366]/40 flex items-center justify-center gap-3"
                >
                  <span className="text-xl">💬</span> Join VIP WhatsApp Group Now
                </a>

                {WHATSAPP_CONFIG.groupInviteUrl && (
                  <a
                    href={WHATSAPP_CONFIG.groupInviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#111111] hover:bg-[#222222] border border-[#444444] text-white font-bold text-sm transition"
                  >
                    📲 Direct Group Invite Link
                  </a>
                )}
              </div>
              
              <div className="text-zinc-500 text-xs mt-4">
                Direct WhatsApp response within 15 minutes • Limited private student roster
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 🎬 YOUTUBE VIDEO PLAYBACK MODAL */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-[#111111] border border-[#333333] rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-[#222222]">
              <span className="font-bold text-white text-sm">Now Playing Lesson Stream</span>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg text-lg"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoModal}?autoplay=1&rel=0`}
                title="Video Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* 🖤 GLOBAL FOOTER */}
      <footer className="mt-20 pt-10 border-t border-[#1a1a1a] text-center text-zinc-500 text-xs px-4">
        <div className="font-bold text-zinc-300 text-sm mb-2">
          TRADING FOR A LIVING™ • INSTITUTIONAL TRADING ACADEMY
        </div>
        <p className="max-w-2xl mx-auto text-[11px] text-zinc-600 mb-4">
          Risk Warning: Trading financial instruments involves significant risk and may result in the loss of your capital. None of the content provided represents financial advice.
        </p>
        <div className="text-zinc-600">
          Integrated directly into Christian Nganga's Portfolio • Hosted on Netlify
        </div>
      </footer>

    </div>
  );
};

export default TradingForALiving;
