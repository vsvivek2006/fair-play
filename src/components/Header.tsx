import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about/' },
  { label: 'Fairplay', path: '/fairplay/' },
  { label: 'App', path: '/fairplay-app/' },
  { label: 'Login', path: '/fairplay-login/' },
  { label: 'Guides', path: '/fairplay-guide/' },
  { label: 'Sports', path: '/fairplay-sports/' },
  { label: 'Help', path: '/help/' },
  { label: 'Contact', path: '/contact/' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Fairplay
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-emerald-400 bg-slate-800'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`
                }
                end={link.path === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <nav className="lg:hidden pb-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'text-emerald-400 bg-slate-800'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`
                }
                end={link.path === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
