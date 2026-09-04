import { Helmet } from 'react-helmet-async';
import type { FC } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  ogType?: string;
  structuredData?: object;
}

const SITE_URL = 'https://fairplay1login.com';
const SITE_NAME = 'Fairplay';

const SEO: FC<SEOProps> = ({
  title,
  description,
  canonical,
  keywords,
  ogType = 'website',
  structuredData,
}) => {
  const fullCanonical = `${SITE_URL}${canonical}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={`${SITE_URL}/og-default.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/og-default.png`} />
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
export { SITE_URL, SITE_NAME };
