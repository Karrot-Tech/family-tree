# PWA Update Strategy Test Matrix

Date: 2026-02-14
Branch: `codex/pwa-compatibility`

## Scope

- Build-hashed cache keys for service worker caches.
- Service worker registration tied to Next.js `buildId`.
- Offline fallback behavior remains functional.

## Matrix

| ID | Scenario | Method | Expected | Result |
|---|---|---|---|---|
| M1 | Lint validity | `npm run lint` | No lint errors | Pass |
| M2 | Production build validity | `npm run build` | Build succeeds | Pass |
| M3 | SW registration URL includes build ID | `rg "sw\\.js\\?buildId" .next/static/chunks/pages/_app-*.js` | Compiled bundle includes registration URL with `buildId` query | Pass |
| M4 | Build ID rotation across builds | Read `.next/BUILD_ID` before/after a second `npm run build` | Build ID changes between builds | Pass (`4JyZk9gC_8H-PgJAt5f-J` -> `lNbag7d0OSiw8NEKi-_uo`) |
| M5 | Manifest endpoint reachable | `curl -I http://127.0.0.1:3000/manifest.webmanifest` | `HTTP/1.1 200 OK` | Pass |
| M6 | SW endpoint reachable with synthetic build ID | `curl -I "http://127.0.0.1:3000/sw.js?buildId=test-build"` | `HTTP/1.1 200 OK` | Pass |
| M7 | Offline fallback page reachable | `curl -I http://127.0.0.1:3000/offline.html` | `HTTP/1.1 200 OK` | Pass |

## Manual Validation (Android Chrome)

| ID | Scenario | Expected | Status |
|---|---|---|---|
| A1 | Install prompt appears after engagement | Browser shows install affordance/button | Pending |
| A2 | Install app and relaunch from homescreen | App opens in standalone mode | Pending |
| A3 | Deploy new build, reopen app | New SW activates and old caches are cleared | Pending |
| A4 | Airplane mode navigation to cached route | Offline fallback or cached page appears | Pending |
