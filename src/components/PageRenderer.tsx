import type { PageData } from '@/types/PageData';
import SEO from '@/components/SEO';
import Breadcrumbs, { breadcrumbStructuredData } from '@/components/Breadcrumbs';
import RelatedLinks from '@/components/RelatedLinks';

interface PageRendererProps {
  data: PageData;
}

export default function PageRenderer({ data }: PageRendererProps) {
  const allStructuredData = [
    breadcrumbStructuredData(data.breadcrumb),
    ...(data.structuredData ? [data.structuredData] : []),
    ...(data.faqs && data.faqs.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: data.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <SEO
        title={data.title}
        description={data.metaDescription}
        canonical={data.slug}
        keywords={data.keywords}
        ogType={data.ogType}
        structuredData={
          allStructuredData.length === 1
            ? allStructuredData[0]
            : allStructuredData.length > 1
              ? {
                  '@context': 'https://schema.org',
                  '@graph': allStructuredData,
                }
              : undefined
        }
      />
      <Breadcrumbs items={data.breadcrumb} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <header className="mb-8">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full mb-3">
            {data.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
            {data.h1}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">{data.intro}</p>
        </header>

        <div className="prose prose-lg max-w-none">
          {data.sections.map((section, idx) => (
            <section key={idx} className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">{section.heading}</h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-slate-700 leading-relaxed mb-4">{p}</p>
              ))}
              {section.subsections?.map((sub, sIdx) => (
                <div key={sIdx} className="mb-4">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{sub.heading}</h3>
                  {sub.paragraphs.map((p, spIdx) => (
                    <p key={spIdx} className="text-slate-700 leading-relaxed mb-3">{p}</p>
                  ))}
                </div>
              ))}
            </section>
          ))}
        </div>

        {data.faqs && data.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {data.faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-slate-200 pb-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <RelatedLinks links={data.relatedLinks} />
      </article>
    </>
  );
}
