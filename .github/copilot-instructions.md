# Repository Instructions

## Tech Stack
- Playwright
- TypeScript
- @playwright/test

## UI Testing
- Use Page Object Model
- No hard waits
- Use web-first assertions
- Reuse fixtures

## API Testing
- Use APIRequestContext
- Centralize payloads
- Validate responses with Zod

## Naming
- Pages: LoginPage.ts
- Specs: login.spec.ts

## Assertions
- Use Playwright expect()
- Avoid manual waits

## Browsers
- Chromium
- WebKit