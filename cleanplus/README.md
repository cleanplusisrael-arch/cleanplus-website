# Clean+ Website — cleanplus.co.il

Site vitrine Next.js 14 pour Clean+, société de nettoyage professionnelle en Israël.

## Stack
- **Next.js 14** App Router
- **Tailwind CSS** Design system navy/gold
- **next-intl** Multilingual (HE/EN/FR/RU) avec RTL automatique
- **Firebase Firestore** Stockage leads
- **Vercel** Déploiement + Serverless functions

## Structure des routes
```
cleanplus.co.il/              → Site hébreu (défaut, RTL)
cleanplus.co.il/en/           → English
cleanplus.co.il/fr/           → Français
cleanplus.co.il/ru/           → Русский
cleanplus.co.il/devis-nettoyage → Landing page leads (à créer)
cleanplus.co.il/rejoindre-equipe → Landing page recrutement (à créer)
```

## Collections Firestore
```
leads_clients/    → Leads depuis le formulaire site
leads_candidates/ → Candidatures recrutement
```

## Setup
```bash
cp .env.example .env.local
# Remplir les variables Firebase + WhatsApp
npm install
npm run dev
```

## Déploiement Vercel
```bash
vercel --prod
```
Configurer les variables d'env dans le dashboard Vercel.

## À faire (prochaines étapes)
- [ ] Landing page /devis-nettoyage
- [ ] Landing page /rejoindre-equipe
- [ ] Notification WhatsApp manager via API
- [ ] Google Analytics + Meta Pixel
- [ ] Blog section pour SEO
- [ ] admin.cleanplus.co.il (dashboard)
