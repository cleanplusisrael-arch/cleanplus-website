# Clean+ — Hero Patch

Changements à appliquer sur `cleanplusisrael-arch/cleanplus-website` (branche `main`).

## Fichiers dans ce zip

```
cleanplus/
├── public/
│   └── hero.jpg                    ← remplace l'existant
└── src/
    └── components/
        └── Hero.tsx                ← remplace l'existant
```

## Installation

### Option A — via l'interface web GitHub
1. Ouvrez https://github.com/cleanplusisrael-arch/cleanplus-website
2. Pour **`cleanplus/public/hero.jpg`** :
   - Naviguez au dossier `cleanplus/public/`
   - Cliquez sur `hero.jpg` puis sur l'icône poubelle → Commit
   - Revenez au dossier, cliquez "Add file" → "Upload files" → déposez le nouveau `hero.jpg`
   - Commit directement sur `main`
3. Pour **`cleanplus/src/components/Hero.tsx`** :
   - Naviguez à `cleanplus/src/components/Hero.tsx`
   - Cliquez sur l'icône crayon (Edit)
   - Supprimez tout le contenu, collez le nouveau Hero.tsx
   - Commit directement sur `main`

Vercel redéploiera automatiquement.

### Option B — via votre machine
```bash
git clone https://github.com/cleanplusisrael-arch/cleanplus-website.git
cd cleanplus-website
# copiez les 2 fichiers de ce zip aux bons emplacements (cleanplus/public/hero.jpg et cleanplus/src/components/Hero.tsx)
git add .
git commit -m "hero: photo plus claire, overlay allégé"
git push origin main
```

## Ce qui change

- **Photo hero** : nouvelle image + opacité passée de 0.42 → 1 (photo pleinement visible)
- **Overlay** : passé de ~0.9 opaque à un dégradé doux 0.35 → transparent
- **Grille de points** : supprimée pour ne rien ajouter sur la photo
- **Lisibilité du texte** : `text-shadow` ajouté sur le h1, le subtitle et la trust row
- **Pills & bouton téléphone** : fond semi-transparent avec backdrop-blur pour rester lisibles sur la photo
- **Carte stats à droite** : fond navy semi-transparent (0.55) au lieu de blanc transparent pour rester lisible contre la photo claire
