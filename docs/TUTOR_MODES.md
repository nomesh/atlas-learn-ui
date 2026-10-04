# Tutor modes: LIVE, MOCK and production

## Finding: does `.env.local` put local ATLAS Learn on `MockTutorAdapter`?

Yes, in the repo state inspected. `.env` says `VITE_USE_MOCK_API=false`, but `.env.local` (git-ignored, per developer) says `VITE_USE_MOCK_API=true`, and `.env.local` overrides `.env`. `TutorService` constructs `MockTutorAdapter` whenever the resolved mode is mock, so `npm run dev` with that file uses fixtures and never calls the backend.

Verified by: reading the factory in `src/api/tutorApi.ts`, and starting Vite from a copy of this repo in each mode and reading the console line `[TutorService] Initialized with ... (source: ...)`. I could not see your browser, so a persisted `localStorage` key `atlas_force_mock` (set by the in-app toggle, and it beats `.env`) is the one thing I cannot rule out. The dev badge now shows it.

Two further facts that explain the "production vs local" comparison:

- The `/teach-me` page renders lesson steps from static frontend data (`getLessonStepsForTopic`) and does not call the Tutor. Only the `/tutor` chat uses `AtlasLiveTutorAdapter` or `MockTutorAdapter`. Lesson steps and simulations are identical in every mode; only chat prose depends on the adapter and model.
- The previous rule was `VITE_USE_MOCK_API !== 'false'`, so an unset value, a typo or a stray space silently meant MOCK.

## The three situations

| Situation | How you get it | Tutor chat | Dev badge |
|---|---|---|---|
| Production build | `vite build` / deployed | always LIVE, mock impossible | not rendered at all |
| Development, LIVE | `npm run dev:live` | real backend, model chosen by `atlas_runtime_config` | green `Tutor: LIVE · <provider> · <model>` |
| Development, MOCK | `npm run dev:mock` | offline fixtures, backend bypassed | amber `Tutor: MOCK` |

Resolution rules (`src/api/tutorMode.ts`, unit tested):

1. Production build: LIVE, always.
2. Browser override `localStorage atlas_force_mock` = `true`/`false`: wins in development and is labelled "localStorage override".
3. `VITE_USE_MOCK_API=true` -> MOCK. `=false` -> LIVE.
4. Unset, empty or invalid in a Vite build -> LIVE (with a console error for invalid values).
5. Plain Node (the `node:test` suites, no Vite) -> MOCK, because there is no backend. This keeps the existing deterministic tests unchanged.

## Minimal configuration for LIVE local development

1. Stop relying on `.env.local` for mode. Either use `npm run dev:live` (sets the variable for the process, which beats every `.env` file), or in `.env.local` set `VITE_USE_MOCK_API=false` (or delete the line).
2. Leave `VITE_API_BASE_URL` blank so Vite proxies `/api` to `http://localhost:8080` (override only if the backend is elsewhere).
3. In the browser, clear a stale toggle override: use `clear override` on the dev badge (it removes `atlas_force_mock` and reloads).
4. Sign in through the app. `VITE_ATLAS_AUTH_TOKEN` is only for a secured backend without the app sign-in; never commit a real token.
5. Backend running on :8080 with a reachable chat provider. To see the model name on the badge, start the backend with `ATLAS_LEARN_TUTOR_EXPOSE_RUNTIME=true` (adds `llmProvider` / `llmModel` to Tutor response metadata; default is off). Without it the badge says `Tutor: LIVE · model not reported yet`.

For deterministic tests/E2E use `npm run dev:mock`, or leave `.env.local` at `VITE_USE_MOCK_API=true` knowingly; the amber badge makes it obvious.

## Provider and model on the badge

The badge never guesses. The backend reports the provider and model that were configured when it answered (read from `atlas_runtime_config`), and the badge shows exactly that after the first LIVE answer. In MOCK it never shows a model. Switching modes clears any remembered model.
