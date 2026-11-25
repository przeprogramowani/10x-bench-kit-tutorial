# 10x-bench-kit-tutorial

Przykładowe repozytorium produktowe (**Billing Ledger**) przygotowane do 10-lekcyjnego kursu **„Najlepszy model do twojego projektu – poradnik 10x-bench-kit”**.

## Jak użyć tego repozytorium?

1. Sklonuj repozytorium lokalnie:
   ```bash
   git clone https://github.com/przeprogramowani/10x-bench-kit-tutorial.git
   cd 10x-bench-kit-tutorial
   ```
2. Uruchom testy i linter, aby upewnić się, że projekt działa lokalnie (wymagany Node.js 22+):
   ```bash
   npm test
   npm run lint
   ```
3. Zainicjalizuj obok niego własną instancję `10x-bench-kit`:
   ```bash
   10x bench-kit init
   ```
4. Otwórz nowo utworzony katalog `../10x-bench-kit-tutorial-bench` w swoim narzędziu AI (Claude Code, OpenCode, Codex, Antigravity) i zacznij od:
   > *Use bench-status to check this instance, then bench-create-task to create our first tasks.*

## Co zawiera historia Gita?

Historia `main` celowo zawiera kilka realistycznych zmian (bugfix, feature, refactor) z testami, które świetnie nadają się do nauki kopania zadań (`bench-create-task`):
- **#1 (bugfix):** obsługa zerowych ilości i ujemnych sum na fakturach (`src/pricing.ts`),
- **#2 (feature):** rabaty progowe (tiered volume discounts) z limitem `maxDiscountPercent` (`src/discounts.ts`),
- **#3 (refactor):** ujednolicenie deterministycznego zaokrąglania walutowego (`src/money.ts`),
- **#4 (feature):** proporcjonalne rozliczanie zmiany planu w trakcie cyklu (`calculateProration` w `src/ledger.ts`).
