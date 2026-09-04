import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { PageData } from '@/types/PageData';

interface BreadcrumbsProps {
  items: { name: string; url: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 py-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
        {items.map((item, index) => (
          <li key={item.url} className="flex items-center gap-1">
            {index > 0 && <ChevronRight size={14} className="text-slate-400" />}
            {index === items.length - 1 ? (
              <span className="text-slate-700 font-medium">{item.name}</span>
            ) : (
              <Link to={item.url} className="hover:text-emerald-600 transition-colors">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function breadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://fairplay1login.com${item.url}`,
    })),
  };
}
