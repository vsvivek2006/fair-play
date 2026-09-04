import { Link } from 'react-router-dom';

const footerSections = [
  {
    title: 'Core Pages',
    links: [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about/' },
      { label: 'Contact', path: '/contact/' },
      { label: 'FAQ', path: '/faq/' },
      { label: 'Help Center', path: '/help/' },
      { label: 'Sitemap', path: '/sitemap/' },
    ],
  },
  {
    title: 'Fairplay',
    links: [
      { label: 'Fairplay', path: '/fairplay/' },
      { label: 'Fairplay Guide', path: '/fairplay-guide/' },
      { label: 'Fairplay Features', path: '/fairplay-features/' },
      { label: 'Fairplay 2026', path: '/fairplay-2026/' },
      { label: 'Fairplay Online', path: '/fairplay-online/' },
      { label: 'Fairplay Pro', path: '/fairplay-pro/' },
    ],
  },
  {
    title: 'App & Download',
    links: [
      { label: 'Fairplay App', path: '/fairplay-app/' },
      { label: 'Fairplay Download', path: '/fairplay-download/' },
      { label: 'Fairplay APK', path: '/fairplay-apk/' },
      { label: 'Fairplay APK Installation', path: '/fairplay-apk-installation/' },
      { label: 'Fairplay Latest Version', path: '/fairplay-latest-version/' },
      { label: 'Fairplay App Updates', path: '/fairplay-app-updates/' },
    ],
  },
  {
    title: 'Account & Login',
    links: [
      { label: 'Fairplay Login', path: '/fairplay-login/' },
      { label: 'Fairplay Register', path: '/fairplay-register/' },
      { label: 'Fairplay Account', path: '/fairplay-account/' },
      { label: 'Fairplay Password Help', path: '/fairplay-password-help/' },
      { label: 'Fairplay Login Troubleshooting', path: '/fairplay-login-troubleshooting/' },
      { label: 'Fairplay Account Security', path: '/fairplay-account-security/' },
    ],
  },
  {
    title: 'Guides & Info',
    links: [
      { label: 'How Fairplay Works', path: '/how-fairplay-works/' },
      { label: 'Fairplay Beginner Guide', path: '/fairplay-beginner-guide/' },
      { label: 'Fairplay User Guide', path: '/fairplay-user-guide/' },
      { label: 'Fairplay Safety Guide', path: '/fairplay-safety-guide/' },
      { label: 'Fairplay Troubleshooting', path: '/fairplay-troubleshooting/' },
      { label: 'Fairplay Common Questions', path: '/fairplay-common-questions/' },
    ],
  },
  {
    title: 'Sports & Legal',
    links: [
      { label: 'Fairplay Sports', path: '/fairplay-sports/' },
      { label: 'Fairplay IPL 2026', path: '/fairplay-ipl-2026/' },
      { label: 'Fairplay IPL Guide', path: '/fairplay-ipl-guide/' },
      { label: 'Privacy Policy', path: '/privacy-policy/' },
      { label: 'Terms & Conditions', path: '/terms/' },
      { label: 'Disclaimer', path: '/disclaimer/' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold text-sm mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm hover:text-emerald-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Fairplay. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link to="/privacy-policy/" className="hover:text-emerald-400 transition-colors">Privacy</Link>
            <Link to="/terms/" className="hover:text-emerald-400 transition-colors">Terms</Link>
            <Link to="/disclaimer/" className="hover:text-emerald-400 transition-colors">Disclaimer</Link>
            <Link to="/cookie-policy/" className="hover:text-emerald-400 transition-colors">Cookies</Link>
            <Link to="/sitemap/" className="hover:text-emerald-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
