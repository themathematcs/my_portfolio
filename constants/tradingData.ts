// Trading for a Living - Central Data & Configuration

export interface IntroModule {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  youtubeId: string; // YouTube Video ID (e.g. kR23vj_jYqU)
  youtubeUrl: string;
  description: string;
  keyTakeaways: string[];
  actionChecklist: string[];
}

export interface WeeklyVideo {
  id: string;
  title: string;
  category: 'Forex' | 'Crypto' | 'Indices' | 'Psychology' | 'Strategy';
  date: string;
  duration: string;
  youtubeId: string;
  youtubeUrl: string;
  description: string;
  isFeatured?: boolean;
}

export const WHATSAPP_CONFIG = {
  // Your WhatsApp Phone Number in international format (254743269133)
  phoneNumber: "254743269133", 
  // Direct WhatsApp Group Invite Link
  groupInviteUrl: "",
  // Pre-filled message sent by student when clicking to join VIP
  defaultMessage: "Hello Mentor! 👋 I completed the 'Trading for a Living' introductory masterclasses and I want to join the VIP WhatsApp Mentorship group and start 1-on-1 coaching.",
  mentorName: "Lead Trading Mentor"
};

// 4 Introductory Foundational Modules (The Starter Funnel)
export const INTRO_MODULES: IntroModule[] = [
  {
    id: 1,
    title: "Module 1: The Blueprint of Trading for a Living",
    subtitle: "Market Reality, Probabilities & Overcoming the 90% Failure Rate",
    duration: "18 min",
    youtubeId: "kR23vj_jYqU",
    youtubeUrl: "https://www.youtube.com/watch?v=kR23vj_jYqU",
    description: "Discover the critical transition from retail gambler to institutional-minded trader. Learn how market participants move liquidity and why statistical edge is your only real asset.",
    keyTakeaways: [
      "Retail vs. Institutional orderflow mechanics",
      "The 3 pillars: Edge, Risk Management, Psychology",
      "Why 90% of traders fail and how to join the top 10%",
      "The exact daily routine of a full-time independent trader"
    ],
    actionChecklist: [
      "Define your daily trading hours (London or NY session)",
      "Open a trade journal spreadsheet",
      "Set a hard rule on maximum daily drawdown threshold"
    ]
  },
  {
    id: 2,
    title: "Module 2: Price Action Mastery & Candlestick Anatomy",
    subtitle: "Reading Market Structure, Liquidity Sweeps & Key Reversal Zones",
    duration: "24 min",
    youtubeId: "iX6P3sWvUuY",
    youtubeUrl: "https://www.youtube.com/watch?v=iX6P3sWvUuY",
    description: "Stop cluttering your charts with lagging indicators. Learn to read raw price action, market structure shifts (MSS), high-probability candlestick patterns, and institutional support/resistance.",
    keyTakeaways: [
      "Identifying Higher Highs/Higher Lows and market structure breaks",
      "The truth about Pinbars, Engulfing candles, and Fair Value Gaps",
      "How liquidity pools form above and below consolidation ranges",
      "Multi-timeframe top-down analysis (Daily -> 4H -> 15M)"
    ],
    actionChecklist: [
      "Mark daily high and daily low on your top 3 watchlists",
      "Identify the last clean Market Structure Shift (MSS)",
      "Practice spotting liquidity sweeps on 15M charts"
    ]
  },
  {
    id: 3,
    title: "Module 3: Institutional Risk Management & The 1% Rule",
    subtitle: "Mathematical Position Sizing, Asymmetric R:R & Capital Preservation",
    duration: "21 min",
    youtubeId: "F3QpgXUr-ng",
    youtubeUrl: "https://www.youtube.com/watch?v=F3QpgXUr-ng",
    description: "Risk management is the absolute holy grail of professional trading. Master exact lot-sizing formulas, 1:2 to 1:5 asymmetric risk-to-reward models, and drawdown recovery math.",
    keyTakeaways: [
      "The 1% Maximum Account Risk Rule explained mathematically",
      "Calculating exact position sizes for Forex, Crypto, and Stocks",
      "Asymmetric payouts: How a 40% win rate can make you wildly profitable",
      "Avoiding revenge trading and scaling into winners"
    ],
    actionChecklist: [
      "Set a hard rule: Never risk more than 1.0% per trade",
      "Use the built-in position size calculator before every entry",
      "Always define stop-loss before entering the market"
    ]
  },
  {
    id: 4,
    title: "Module 4: Building Your Execution System & Daily Routine",
    subtitle: "Trade Checklist, Execution Rules & Transitioning to WhatsApp VIP",
    duration: "28 min",
    youtubeId: "jW9vVd4i35o",
    youtubeUrl: "https://www.youtube.com/watch?v=jW9vVd4i35o",
    description: "Turn trading concepts into a repeatable, rule-based execution system. Learn pre-market preparation, news catalyst awareness, trade execution timing, and emotional discipline.",
    keyTakeaways: [
      "The 5-Point Trade Confirmation Checklist before pulling the trigger",
      "Managing high-impact economic news events (CPI, FOMC, NFP)",
      "End-of-day trade debrief and performance analytics",
      "The step-by-step roadmap to qualifying for 1-on-1 WhatsApp Mentorship"
    ],
    actionChecklist: [
      "Write down your personal 5-point entry checklist",
      "Check economic calendar before the morning session",
      "Connect with the Mentor on WhatsApp to start 1-on-1 Coaching"
    ]
  }
];

// Weekly Free YouTube Video Drops (Add your new weekly YouTube video links here!)
export const WEEKLY_VIDEOS: WeeklyVideo[] = [
  {
    id: "w1",
    title: "Weekly Forex Outlook: EUR/USD & GBP/USD Liquidity Sweeps",
    category: "Forex",
    date: "This Week",
    duration: "16 min",
    youtubeId: "iX6P3sWvUuY",
    youtubeUrl: "https://www.youtube.com/watch?v=iX6P3sWvUuY",
    description: "In-depth breakdown of key liquidity pools on EUR/USD ahead of central bank interest rate announcements and NFP.",
    isFeatured: true
  },
  {
    id: "w2",
    title: "Bitcoin 200 EMA Retest: Is the Bull Run Resuming?",
    category: "Crypto",
    date: "Recent",
    duration: "14 min",
    youtubeId: "kR23vj_jYqU",
    youtubeUrl: "https://www.youtube.com/watch?v=kR23vj_jYqU",
    description: "Technical review of Bitcoin's daily support retest and altcoin market structure confirmation.",
    isFeatured: false
  },
  {
    id: "w3",
    title: "How to Recover from a 3-Trade Losing Streak Without Tilting",
    category: "Psychology",
    date: "Recent",
    duration: "19 min",
    youtubeId: "F3QpgXUr-ng",
    youtubeUrl: "https://www.youtube.com/watch?v=F3QpgXUr-ng",
    description: "The mental framework professional traders use to stay completely unemotional during unavoidable drawdowns.",
    isFeatured: false
  },
  {
    id: "w4",
    title: "Gold (XAU/USD) 1:4 Risk-to-Reward Scalping Strategy",
    category: "Strategy",
    date: "Recent",
    duration: "22 min",
    youtubeId: "jW9vVd4i35o",
    youtubeUrl: "https://www.youtube.com/watch?v=jW9vVd4i35o",
    description: "Live session recording demonstrating high-precision London Open entries on Gold with tight stop losses.",
    isFeatured: false
  }
];

// VIP Mentorship Perks Breakdown
export const VIP_PERKS = [
  {
    icon: "🤝",
    title: "Private 1-on-1 Mentoring Calls",
    description: "Weekly private Google Meet strategy calls with full screen-sharing, live trade auditing, and tailored feedback on your personal trading journal."
  },
  {
    icon: "💬",
    title: "Exclusive WhatsApp VIP Community",
    description: "Direct access to the private WhatsApp mastermind group where daily trade setups, live commentary, and voice notes are posted in real-time."
  },
  {
    icon: "🎯",
    title: "Institutional Daily Trade Breakdowns",
    description: "Receive high-probability setups with exact Entry, Stop Loss, and Take Profit (1:3+ R:R) targets across Forex, Crypto, and Indices."
  },
  {
    icon: "📈",
    title: "Custom 90-Day Scaling Roadmap",
    description: "Step-by-step guidance to master risk calibration, build consistency, and prepare to pass $100k-$200k funded prop firm evaluations."
  }
];
