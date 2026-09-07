import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '@/config/site';
import { useAuthModal } from '@/context/AuthModalContext';

interface NavItem {
  label: string;
  path: string;
  isHash?: boolean;
  icon: string;
  iconColor?: string;
  badge?: {
    text: string;
    className: string;
  };
}

// Only the most useful, high-value redirect links for players
const navItems: NavItem[] = [
  {
    label: 'Live Matches',
    path: '/#live-matches',
    isHash: true,
    icon: 'fa-solid fa-satellite-dish',
    iconColor: 'text-[#00f2fe]',
    badge: {
      text: 'LIVE',
      className: 'bg-[#00f2fe] text-black font-black animate-pulse shadow-[0_0_8px_rgba(0,242,254,0.6)]',
    },
  },
  {
    label: 'IPL 2026',
    path: '/fairplay-ipl-2026/',
    icon: 'fa-solid fa-trophy',
    iconColor: 'text-[#d4af37]',
    badge: {
      text: 'HOT',
      className: 'bg-gradient-to-r from-[#ff6b18] to-[#ffb574] text-black font-black shadow-[0_0_8px_rgba(255,107,24,0.6)]',
    },
  },
  {
    label: 'Live Casino',
    path: '/#casino',
    isHash: true,
    icon: 'fa-solid fa-dice',
    iconColor: 'text-[#ff416c]',
  },
  {
    label: 'Download App',
    path: '/fairplay-app/',
    icon: 'fa-brands fa-android',
    iconColor: 'text-[#25d366]',
  },
  {
    label: 'Login Guide',
    path: '/fairplay-login/',
    icon: 'fa-solid fa-shield-halved',
    iconColor: 'text-slate-300',
  },
  {
    label: 'FAQ & Help',
    path: '/faq/',
    icon: 'fa-solid fa-circle-question',
    iconColor: 'text-[#38bdf8]',
  },
];

export default function Header() {
  const { openAuthModal } = useAuthModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and unlock scroll on route or hash change
  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname, location.hash]);

  const toggleMobileMenu = () => {
    const nextState = !mobileMenuOpen;
    setMobileMenuOpen(nextState);
    document.body.style.overflow = nextState ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const handleHashNavClick = (path: string) => {
    if (path.startsWith('/#')) {
      const elementId = path.replace('/#', '');
      if (location.pathname === '/') {
        const elem = document.getElementById(elementId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0d14]/95 backdrop-blur-2xl border-b border-[#d4af37]/25 shadow-[0_12px_35px_rgba(0,0,0,0.85)] py-2.5 sm:py-3'
            : 'bg-[#0a0d14]/85 backdrop-blur-md border-b border-white/[0.08] py-3 sm:py-4'
        }`}
      >
        {/* Top luxury hairline glow */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <img
              src="/images/logo.png"
              alt="Fairplay"
              className="h-8 sm:h-9 md:h-11 w-auto max-w-[140px] sm:max-w-[170px] md:max-w-none object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Bar (Only Most Useful Links) */}
          <nav className="hidden lg:flex items-center bg-white/[0.03] border border-white/[0.07] rounded-full p-1 shadow-inner">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => item.isHash && handleHashNavClick(item.path)}
                  className={`px-3 py-1.5 xl:px-3.5 xl:py-2 rounded-full text-xs xl:text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-[#d4af37]/25 to-[#f3e5ab]/10 border border-[#d4af37]/40 text-[#f3e5ab] shadow-[0_0_15px_rgba(212,175,55,0.25)] font-bold'
                      : 'text-slate-300 hover:text-[#f3e5ab] hover:bg-white/[0.05]'
                  }`}
                >
                  <i className={`${item.icon} text-xs ${item.iconColor || 'text-slate-400'} group-hover:scale-110 transition-transform`} />
                  <span>{item.label}</span>

                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full leading-tight uppercase ${item.badge.className}`}>
                      {item.badge.text}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons (Interactive Auth Modal + WhatsApp Link) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
            {/* Login Button */}
            <button
              onClick={() => openAuthModal('login')}
              className="border border-[#d4af37]/40 text-[#f3e5ab] hover:bg-[#d4af37]/15 hover:border-[#d4af37] px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <i className="fa-solid fa-right-to-bracket text-xs text-[#d4af37]"></i>
              <span>Login</span>
            </button>

            {/* Register Button */}
            <button
              onClick={() => openAuthModal('register')}
              className="btn btn-gold btn-shimmer text-xs px-4 xl:px-5 py-2 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.35)] font-extrabold flex items-center gap-1.5"
            >
              <i className="fa-solid fa-gift text-xs"></i>
              <span>Register</span>
              <span className="hidden xl:inline-block text-[9px] bg-black/30 text-white px-1.5 py-0.5 rounded-full font-bold">
                +300%
              </span>
            </button>

            {/* Quick WhatsApp Round Button */}
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#25d366]/20 border border-[#25d366]/50 text-[#25d366] hover:bg-[#25d366] hover:text-white flex items-center justify-center text-sm transition-all shadow-[0_0_12px_rgba(37,211,102,0.3)]"
              aria-label="Connect on WhatsApp"
              title="Connect on WhatsApp"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>

          {/* Mobile Header Actions: Quick Register Button + Hamburger */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            {/* Quick Register CTA on Mobile */}
            <button
              onClick={() => openAuthModal('register')}
              className="btn btn-gold btn-shimmer text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow"
            >
              <i className="fa-solid fa-gift text-[10px]"></i>
              <span>Register</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] border border-white/10 text-white flex items-center justify-center text-base hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark text-lg text-[#d4af37]' : 'fa-bars text-base'}`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer: Luxury, Clean, Responsive */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Dark Backdrop */}
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          onClick={closeMobileMenu}
        />

        {/* Drawer Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-[85%] max-w-[340px] bg-[#0c101c] border-l border-[#d4af37]/30 p-5 flex flex-col justify-between shadow-2xl transition-transform duration-300 overflow-y-auto ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <img src="/images/logo.png" alt="Fairplay" className="h-8 w-auto object-contain" />
              <button
                onClick={closeMobileMenu}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-[#d4af37]/50 flex items-center justify-center"
                aria-label="Close menu"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            {/* VIP Status Pill */}
            <div className="p-2.5 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/25 mb-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#25d366] animate-ping" />
                <span className="font-bold text-[#f3e5ab] text-[11px] tracking-wide">FAIRPLAY 24/7 LIVE</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Get ID in 2 Mins</span>
            </div>

            {/* Quick Login & Register Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              <button
                onClick={() => {
                  closeMobileMenu();
                  openAuthModal('login');
                }}
                className="btn btn-outline text-xs py-2.5 justify-center w-full"
              >
                <i className="fa-solid fa-right-to-bracket text-xs mr-1 text-[#d4af37]"></i>
                <span>Login</span>
              </button>
              <button
                onClick={() => {
                  closeMobileMenu();
                  openAuthModal('register');
                }}
                className="btn btn-gold btn-shimmer text-xs py-2.5 justify-center w-full shadow font-bold"
              >
                <i className="fa-solid fa-user-plus text-xs mr-1"></i>
                <span>Register</span>
              </button>
            </div>

            {/* Useful Navigation Section */}
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1 flex items-center gap-1.5">
              <i className="fa-solid fa-compass text-[#d4af37] text-xs"></i>
              <span>Quick Menu</span>
            </div>

            {/* Mobile Redirect List */}
            <div className="space-y-1.5">
              {/* Home */}
              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  location.pathname === '/'
                    ? 'bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f3e5ab] font-bold shadow-sm'
                    : 'bg-white/[0.03] text-slate-200 hover:text-[#d4af37] hover:bg-white/[0.06] border border-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#d4af37]/15 flex items-center justify-center text-[#d4af37] text-xs">
                    <i className="fa-solid fa-house"></i>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">Home</span>
                </div>
                <i className="fa-solid fa-chevron-right text-xs text-slate-600"></i>
              </Link>

              {/* Useful Links */}
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => {
                      closeMobileMenu();
                      if (item.isHash) handleHashNavClick(item.path);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f3e5ab] font-bold shadow-sm'
                        : 'bg-white/[0.03] text-slate-200 hover:text-[#d4af37] hover:bg-white/[0.06] border border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-xs">
                        <i className={`${item.icon} ${item.iconColor || 'text-[#d4af37]'}`}></i>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase ${item.badge.className}`}>
                          {item.badge.text}
                        </span>
                      )}
                      <i className="fa-solid fa-chevron-right text-xs text-slate-600"></i>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Drawer Footer WhatsApp & Responsible Gaming */}
          <div className="pt-4 border-t border-white/10 mt-6 space-y-3">
            <a
              href={SITE_CONFIG.whatsappSupportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full justify-center text-xs py-3 font-bold shadow-xl flex items-center gap-2"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              <span>24/7 WhatsApp VIP Support</span>
            </a>

            <div className="text-center text-[10px] text-slate-500 font-medium flex items-center justify-center gap-1.5">
              <i className="fa-solid fa-shield-halved text-[#d4af37]"></i>
              <span>18+ Play Responsibly • 100% Safe &amp; Verified</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
