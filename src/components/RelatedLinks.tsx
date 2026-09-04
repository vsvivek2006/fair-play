import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { PageLink } from '@/types/PageData';

interface RelatedLinksProps {
  links: PageLink[];
}

export default function RelatedLinks({ links }: RelatedLinksProps) {
  if (!links.length) return null;

  return (
    <section className="mt-12 border-t border-slate-200 pt-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Pages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {links.map((link) => (
          <Link
            key={link.url}
            to={link.url}
            className="flex items-center gap-2 p-4 rounded-lg border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all group"
          >
            <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">
              {link.text}
            </span>
            <ArrowRight size={16} className="text-slate-400 group-hover:text-emerald-500 ml-auto" />
          </Link>
        ))}
      </div>
    </section>
  );
}
