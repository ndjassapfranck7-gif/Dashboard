PROJET NATIVEWIND — STYLES SÉPARÉS PAR DOMAINE

Les styles NativeWind ne sont plus regroupés dans un seul nativewind.ts.

Ils sont maintenant séparés selon l'endroit où ils agissent :

src/store/
├── common.store.tsx       # écran, contenu, titres communs
├── search.store.tsx       # recherche et filtres
├── loading.store.tsx      # loader et erreurs
├── dashboard.store.tsx    # dashboard et statistiques
├── list.store.tsx         # listes et états vides
├── product.store.tsx      # cartes et actions produit
├── form.store.tsx         # formulaires
├── user.store.tsx         # cartes utilisateur
├── detail.store.tsx       # écrans de détail
├── toast.store.tsx        # Toast
└── fab.store.tsx          # Floating Action Button

Chaque fichier exporte un objet `nw` contenant uniquement les classes de son domaine.

Exemple :
import { nw as commonNw } from "../../../store/common.store";
<Text className={commonNw.title}>Tableau de bord</Text>

Cette organisation conserve NativeWind : les classes restent des classes Tailwind utilisées via `className`.
