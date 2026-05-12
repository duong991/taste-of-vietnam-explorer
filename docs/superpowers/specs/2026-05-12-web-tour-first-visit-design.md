# Web Tour for First-Time Users (Home Page)

## Context

Project uses React + Vite + React Router and currently has no onboarding tour flow. User wants a guided web tour for first-time visitors when they enter the website, with:

- auto-run for first visit
- one-time behavior (no auto-run again)
- manual replay via "Xem huong dan"
- initial scope only for home page (`/`)
- 5 tour steps
- library: `react-joyride`

## Goals

- Help new users quickly understand key areas on the home page.
- Keep implementation low-risk and fast to ship.
- Avoid coupling onboarding logic to the entire app at this stage.

## Non-Goals

- No onboarding for routes other than `/` in this version.
- No global onboarding provider yet.
- No analytics pipeline in v1 (can be added later).

## Selected Approach

Recommended and approved approach: **A) React Joyride inline per page**.

Why:

- Fastest delivery for current scope.
- Minimal architectural changes.
- Easy to iterate before scaling onboarding across the app.

Alternatives considered:

1. App-level onboarding provider in `App.tsx` (better long-term scaling, more setup now).
2. Domain wrapper + adapter layer (most flexible, overkill for current scope).

## UX Flow

1. First-time user opens `/`.
2. App checks local completion key in `localStorage`.
3. If not completed, run a 5-step Joyride tour automatically.
4. If user completes, skips, or closes tour, mark completed and stop.
5. Tour does not auto-run again.
6. User can relaunch manually via a "Xem huong dan" trigger on home page.

## Tour Step Targets

To make selectors resilient, use explicit `data-tour` attributes on key home blocks.

Proposed target sequence (5 steps):

1. Hero intro area: `[data-tour="home-hero"]`
2. Search section: `[data-tour="home-search"]`
3. Featured tours section: `[data-tour="home-featured-tours"]`
4. Featured dishes section: `[data-tour="home-featured-dishes"]`
5. CTA / next action section: `[data-tour="home-cta"]`

## Architecture and File Touchpoints

### New Component

- `src/components/onboarding/HomeTour.tsx`

Responsibilities:

- Own Joyride integration (`steps`, `run`, callbacks, locale labels).
- Read/write completion state.
- Expose manual restart trigger API (via prop callback or controlled state pattern).

### Home Page Integration

- `src/pages/Index.tsx`

Changes:

- Mount `HomeTour`.
- Add `data-tour` attributes to the 5 relevant blocks.
- Add "Xem huong dan" trigger (floating button or home-level control).

### Optional Utility (if needed for testability)

- `src/lib/onboardingStorage.ts`

Responsibilities:

- Encapsulate `localStorage` access.
- Guard browser/storage errors.
- Centralize versioned key usage.

## State Model

Minimal runtime state:

- `hasMounted`: ensures browser-only APIs are accessed after mount.
- `isRunning`: controls Joyride run state.
- `isCompleted`: derived from storage (or cached after first read).

Storage key:

- `onboarding.home.v1.completed`

Versioning rationale:

- Enables controlled reset in future by bumping to `v2`.

## Error Handling and Resilience

- If `localStorage` fails (private mode/quota/error), degrade gracefully using in-memory fallback and never block page rendering.
- If a target selector is missing, skip that step and continue.
- If route changes while tour is running, stop the tour.
- If Joyride emits unexpected status, fail safe by setting `isRunning = false`.

## Accessibility and UX Guardrails

- Keep copy short, plain Vietnamese.
- Include full controls: Back, Next, Skip, Done.
- Ensure tooltip and overlay remain usable on mobile viewport.
- Avoid obscuring critical nav/actions where possible.
- Provide keyboard-friendly interaction defaults from Joyride.

## Test Strategy

### Unit Tests

- Storage helper reads default correctly when key missing.
- Storage helper writes and reads completed value.
- Storage helper handles exceptions and returns safe fallback.

### Integration / Component Tests

- First visit auto-starts tour.
- Completing/skipping sets completion and prevents next auto-start.
- Manual trigger starts tour even after completion.
- Missing target selector does not crash flow.

### Manual Smoke Tests

- Desktop: step placement and overlay behavior.
- Mobile: tooltip fit, button reachability, no blocked critical actions.

## Rollout Plan

1. Add dependency `react-joyride`.
2. Implement `HomeTour` and storage logic.
3. Wire into `Index.tsx` with 5 targets.
4. Add manual replay trigger.
5. Run unit/integration/manual smoke checks.

## Future Extensions

- Expand onboarding to `/tour` and other key routes with route-scoped tours.
- Add analytics events (started, skipped, completed, per-step drop-off).
- Add locale-aware tour copy from i18n keys.
- Migrate to app-level onboarding provider when multi-route scope becomes active.
