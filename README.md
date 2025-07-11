# NawyTask

## Project Summary
This project is an automated end-to-end test suite for the [demoblaze.com](https://www.demoblaze.com/) e-commerce web application, built using [Playwright](https://playwright.dev/) with the Page Object Model (POM) design pattern. It covers core user flows such as sign up, login, logout, and purchasing items, including both positive and negative test cases.

## Features
- Automated UI tests for sign up, login, logout, and full purchase flows
- Page Object Model for maintainable and scalable test code
- Playwright HTML reporting
- Easily extendable for new scenarios

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd NawyTask
   ```
2. Install dependencies (this will install Playwright locally):
   ```bash
   npm install
   ```
3. (Optional) If you want to use the Playwright CLI globally, install it with:
   ```bash
   npm install -g playwright
   ```

### Configuration
You can configure the test environment using a `.env` file in the `NawyTask` directory. See `.env.example` for available variables.

#### Example `.env` file:
```
BASE_URL=https://www.demoblaze.com/index.html
HEADLESS=true
```
- `BASE_URL`: The base URL for the application under test.
- `HEADLESS`: Run tests in headless mode (`true` or `false`).

> **Note:** The codebase is ready for environment variable support, but you may need to uncomment the dotenv lines in `playwright.config.ts` to enable it.

### Running the Tests
To run all tests and generate an HTML report:
```bash
npx playwright test
```

To open the HTML report after running tests:
```bash
npx playwright show-report
```

### Directory Structure
- `Pages/` - Page Object Model classes for each page/component
- `tests/` - Test scenarios for each user flow
- `playwright.config.ts` - Playwright configuration

### Recommendations for Further Improvement
- **Parameterize test data** using environment variables or fixtures
- **Add CI/CD integration** (e.g., GitHub Actions)
- **Add npm scripts** for common tasks (test, report, lint)
- **Add code linting/formatting** (ESLint, Prettier)
- **Improve error handling and logging**
- **Expand test coverage** for edge cases and negative scenarios

---

## Preferences
- You can add a `.env` file for environment-specific configuration.
- The project is designed for easy extension and integration with CI/CD pipelines.

---

