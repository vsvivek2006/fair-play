import { Link } from 'react-router-dom';

const articles = [
  {
    title: 'Fairplay Login: Your Ultimate Online Cricket Betting ID Provider in India',
    image: '/images/blog-online-cricket-betting.jpg',
    tag: 'Betting Guides',
    link: '/fairplay-login/',
    desc: 'Step-by-step instructions on accessing your verified Fairplay betting ID, instant login credentials, and fast deposit security.',
  },
  {
    title: 'Fairplay 2026: Best Cricket Betting Exchange & Odds Guide in India',
    image: '/images/blog-cricket-betting-exchange.jpg',
    tag: 'Exchange Trading',
    link: '/fairplay-ipl-2026/',
    desc: 'How back and lay betting exchange works for IPL 2026, market margins, and strategic insights for serious cricket bettors.',
  },
  {
    title: 'Fairplay Live Casino & Online Game Betting Strategies',
    image: '/images/blog-casino-game-betting.jpg',
    tag: 'Casino & Arcade',
    link: '/fairplay-features/',
    desc: 'Explore popular live tables including Teen Patti, Roulette, Dragon Tiger, and Rummy with real-time dealers.',
  },
];

const guideHubs = [
  {
    title: 'Beginner Setup Guide',
    icon: 'fa-user-gear',
    link: '/fairplay-beginner-guide/',
    desc: 'Learn how to generate your account, deposit funds, and place your first wager.',
  },
  {
    title: 'Account Security & Safety',
    icon: 'fa-shield-halved',
    link: '/fairplay-account-security/',
    desc: 'Tips on safeguarding your login credentials and two-factor verification.',
  },
  {
    title: 'Password Help & Recovery',
    icon: 'fa-key',
    link: '/fairplay-password-help/',
    desc: 'Instant recovery steps if you lose access to your Fairplay password or username.',
  },
  {
    title: 'Full Platform Walkthrough',
    icon: 'fa-compass',
    link: '/fairplay-guide/',
    desc: 'Comprehensive overview of all markets, live streams, and cashout features.',
  },
];

export default function HomeBlogSection() {
  return (
    <section id="guides" className="py-14 sm:py-20 lg:py-24 bg-[#0a0d14] relative">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="title-wrapper">
          <h2 className="section-title">Guides &amp; Latest Updates</h2>
          <p className="section-subtitle">
            Stay informed with expert betting tips, account guides, and IPL 2026 match analyses.
          </p>
        </div>

        {/* 3 Featured Blog Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {articles.map((art, idx) => (
            <article
              key={idx}
              className="glass-card flex flex-col overflow-hidden group hover:border-[#d4af37]/60"
            >
              <div className="w-full h-44 sm:h-52 overflow-hidden bg-[#0a0d14] relative">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-[#0a0d14]/85 text-[#d4af37] border border-[#d4af37]/30 backdrop-blur-md">
                  {art.tag}
                </span>
              </div>

              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors mb-2 leading-snug break-words">
                    {art.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {art.desc}
                  </p>
                </div>

                <Link
                  to={art.link}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#f3e5ab] hover:text-[#d4af37] transition-colors mt-auto pt-2"
                >
                  <span>Read Full Guide</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Quick Knowledge Hubs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {guideHubs.map((hub, idx) => (
            <Link
              key={idx}
              to={hub.link}
              className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 hover:bg-white/[0.05] transition-all duration-300 group block"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center text-base sm:text-lg mb-3 group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                <i className={`fa-solid ${hub.icon}`}></i>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#d4af37] transition-colors mb-1 break-words">
                {hub.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">{hub.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
