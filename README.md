# SauceDemo Playwright Automation Framework

[![Playwright Tests](https://github.com/basiratz/sauce-demo-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/basiratz/sauce-demo-playwright/actions/workflows/playwright.yml)
[![View Live Report](https://img.shields.io/badge/report-live-brightgreen)](https://basiratz.github.io/sauce-demo-playwright/)

End-to-end test automation for [saucedemo.com](https://www.saucedemo.com), built with **Playwright + TypeScript**, using the **Page Object Model**, running on a **GitHub Actions CI/CD pipeline** with published HTML/Allure reports on every run.

**[→ View the latest test report](https://basiratz.github.io/sauce-demo-playwright/)**

---

## Overview

This project simulates a real-world QA automation setup: structured page objects, tagged test suites, cross-browser execution, and a CI pipeline that runs on every push and publishes a shareable report — the same workflow you'd find on a production QA team.

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | Browser automation & test runner |
| TypeScript | Type-safe test and page object code |
| GitHub Actions | CI/CD pipeline |
| GitHub Pages | Hosting the published HTML report |
| Allure | Rich test reporting with history/trends |

## Project Structure

```
├── .github/workflows/
│   └── playwright.yml       # CI/CD pipeline definition
├── config/
│   └── routes.ts             # App route constants
├── data/
│   ├── users.ts               # Test user credentials/fixtures
│   └── errorMessages.ts      # Expected UI error copy
├── pages/
│   └── LoginPage.ts          # Page Object for the login screen
├── tests/
│   └── login.spec.ts         # Login test suite
├── playwright.config.ts
└── README.md
```

As more features are covered, each page gets its own Page Object under `pages/` and its own spec under `tests/` (e.g. `InventoryPage.ts` / `inventory.spec.ts`, `CartPage.ts` / `cart.spec.ts`).

## Features Covered

- [x] **Login** — valid/invalid credentials, locked-out user, empty fields, whitespace handling, case sensitivity, basic injection input, error banner dismissal
- [ ] Inventory / product listing
- [ ] Cart
- [ ] Checkout flow
- [ ] Logout

*(Checklist updated as coverage grows.)*

Tests are tagged for selective runs:
- `@smoke` — critical-path checks, fast subset
- `@regression` — full suite
- `@security` — input-validation / injection-style checks

## Running Locally

**Prerequisites:** Node.js 18+

```bash
# install dependencies
npm install

# install Playwright browsers
npx playwright install

# create a .env file with:
# BASE_URL=https://www.saucedemo.com

# run all tests (headless)
npx playwright test

# run with the browser visible
npx playwright test --headed

# run only smoke tests
npx playwright test --grep @smoke

# view the last HTML report
npx playwright show-report
```

## CI/CD Pipeline

Every push and pull request to `main` triggers `.github/workflows/playwright.yml`, which:

1. Installs dependencies and Playwright browsers
2. Runs the full test suite across **Chromium, Firefox, and WebKit**
3. Captures traces, screenshots, and video on any failure
4. Generates a **Playwright HTML report** and an **Allure report**
5. Uploads both as downloadable workflow artifacts
6. Publishes the Playwright HTML report to **GitHub Pages** — always the latest run, at the link above

Failures don't just show red in Actions — you get a full trace-viewer replay (DOM snapshots, network calls, console logs) for every failed step, without re-running anything locally.

## Reporting

| Report | Where |
|---|---|
| Playwright HTML (latest) | [Live link](https://basiratz.github.io/sauce-demo-playwright/) |
| Allure report | Downloadable artifact on each [workflow run](https://github.com/basiratz/sauce-demo-playwright/actions) |
| JUnit XML | Downloadable artifact, for CI dashboard integrations |

## Roadmap

- [ ] Extend Page Object coverage to inventory, cart, and checkout
- [ ] Add visual regression checks
- [ ] Add API-level setup/teardown (skip UI login for non-login tests)
- [ ] Parallelize CI by sharding across browsers/tags
