# Copilot Instructions for `site-TCC`

## Project shape
- This repository is split into three app surfaces: `back-end/` (Laravel API), `front-end/` (React + Vite web), and `mobile/` (Expo Router app).
- Treat `back-end/` as the source of truth for business rules and persistence; the web/mobile apps consume its API.
- The top-level `README.md` is only a placeholder; use the subproject files for real guidance.

## Backend architecture
- Laravel 12 + Sanctum live in `back-end/`; API routes are defined in `back-end/routes/api.php` and are mostly Portuguese nouns/actions like `treino`, `ficha`, `exercicio`, `historico`, and `badges`.
- Authenticated endpoints are wrapped in `auth:sanctum`; login and registration stay outside that group.
- Business rules that are not simple CRUD are centralized in `back-end/app/services/`, especially workout calculation helpers like `CalcularTreinoService` and `CalcularNivelPorPontuacao`.
- Keep changes aligned with the existing controller-per-resource pattern in `back-end/app/Http/Controllers/`.

## Web frontend conventions
- The web app uses React Router with nested layouts in `front-end/src/layouts/` and page components in `front-end/src/views/`; route wiring is in `front-end/src/router.jsx`.
- React Query is set up once in `front-end/src/main.jsx`; feature logic lives in `front-end/src/logicas/` and typically uses `useQuery`/`useMutation` hooks.
- API calls go through `front-end/src/api.tsx`, which attaches the `Bearer` token from `localStorage` automatically.
- Theme state is handled by `front-end/src/contextos/TemaContexto.tsx`, which writes the active theme to `document.documentElement.dataset.theme` and `localStorage`.

## Mobile conventions
- The mobile app uses Expo Router with file-based routes under `mobile/app/`; `mobile/app/_layout.tsx` is the root provider stack.
- Shared state lives in `mobile/contextos/`, and longer form flows such as cadastro keep draft data in `AsyncStorage` via `mobile/logicas/cadastro/useCadastro.tsx`.
- The mobile API client is `mobile/api.tsx`; keep it in sync with the backend base URL when the API host changes.
- `@/*` resolves to the mobile project root via `mobile/tsconfig.json`; prefer that alias for app-wide imports.

## Cross-app API flow
- Web auth stores `token` and `usuario` in `localStorage`; mobile uses `AsyncStorage` for multi-step form state and bearer auth only where needed.
- Keep request/response shapes consistent across clients, especially for login, cadastro, treino, ficha, exercicio, and historico endpoints.
- If you add a backend field or route, update the web and mobile callers together so the three surfaces stay in sync.

## Workflow
- Backend development scripts: `composer run dev` starts Laravel + queue listener + Vite; `composer test` runs the PHP test suite.
- Web development scripts: `npm run dev`, `npm run build`, and `npm run lint` in `front-end/`.
- Mobile development scripts: `npm start`, `npm run web`, and `npm run lint` in `mobile/`.

## Implementation notes
- Preserve the existing Portuguese naming and route vocabulary unless there is a clear reason to rename across all three apps.
- Avoid refactoring route/layout structure unless it directly supports the requested change.
- Some files already use mixed casing or older naming conventions; do not normalize them wholesale without a targeted need.
