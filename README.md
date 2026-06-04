# Playwright UI + API Automation Task

Automation suite for:

- UI: SauceDemo (https://www.saucedemo.com)
- API: Restful-Booker (https://restful-booker.herokuapp.com)

Tech stack:

- TypeScript
- Playwright (`@playwright/test`)
- Zod (schema validation)

## Project Structure

- UI tests: [tests/ui](tests/ui)
- API tests: [tests/api](tests/api)
- UI page objects: [src/pages](src/pages)
- Auth fixture: [src/fixtures/auth.fixture.ts](src/fixtures/auth.fixture.ts)
- API clients: [src/api/clients](src/api/clients)
- API payloads: [src/api/payloads](src/api/payloads)
- API schemas: [src/api/schemas](src/api/schemas)
- Copilot instructions: [.github/copilot-instructions.md](.github/copilot-instructions.md)
- Copilot agents: [.github/agents](.github/agents)

## Setup

Prerequisites:

- Node.js 18+
- npm

Install dependencies:

- `npm install`

Install Playwright browsers:

- `npx playwright install`

## Run Tests

Run all tests:

- `npm run test:all`

Run only UI tests:

- `npm run test:ui`

Run only API tests:

- `npm run test:api`

Run a single spec (example):

- `npx playwright test tests/api/booking.spec.ts`

## Reporting

Generate HTML report after test run:

- `npx playwright show-report`

Failure artifacts are configured in [playwright.config.ts](playwright.config.ts):

- `trace: 'on-first-retry'`
- screenshots on failure
- videos retained on failure

## Browser Coverage

Configured projects:

- Chromium
- WebKit

See [playwright.config.ts](playwright.config.ts).

## Copilot Agents Usage

Repo-level grounding instructions:

- [.github/copilot-instructions.md](.github/copilot-instructions.md)

Agents:

- Test case design: [.github/agents/test-case-designer.agent.md](.github/agents/test-case-designer.agent.md)
- Playwright code generation: [.github/agents/playwright-codegen.agent.md](.github/agents/playwright-codegen.agent.md)

Evaluation writeup:

- [copilot-agents.md](copilot-agents.md)

## Notes

- No hard waits are used (`waitForTimeout` avoided).
- Test data is externalized in [src/data](src/data) and [src/api/payloads](src/api/payloads).
- API response schema validation is performed with Zod in API CRUD/E2E flows.