import { getPersonJsonLd, getWebsiteJsonLd } from '@/lib/seo';

export default function JsonLd() {
  const schemas = [getPersonJsonLd(), getWebsiteJsonLd()];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
