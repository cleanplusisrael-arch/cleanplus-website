import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    // Old French routes → new English routes (301 permanent redirects)
    { source: '/:locale/devis-nettoyage', destination: '/:locale/new-client', permanent: true },
    { source: '/:locale/rejoindre-equipe', destination: '/:locale/recruitment', permanent: true },
  ],
};

export default withNextIntl(nextConfig);
