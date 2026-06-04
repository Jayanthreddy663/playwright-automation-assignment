# Copilot Agents Evaluation

## Requirement Used

"Checkout requires first name, last name and postal code."

## End-to-End Agent Flow Example

### 1) Prompt given to Test Case Designer

"Checkout requires first name, last name and postal code. Create positive, negative, boundary, and edge test cases with preconditions, steps, and expected results."

### 2) Output summary from Test Case Designer

- TC-01: Valid checkout information allows continue to overview.
- TC-02: Missing first name shows first-name required error.
- TC-03: Missing last name shows last-name required error.
- TC-04: Missing postal code shows postal-code required error.
- Boundary/edge suggestions for short values, long values, and whitespace-only input.

Structured format used:

| ID | Type | Preconditions | Steps | Test Data | Expected Result |
|---|---|---|---|---|---|
| TC-01 | Positive | User is logged in and on checkout info page | 1) Enter first name 2) Enter last name 3) Enter postal code 4) Click Continue | Valid values | User reaches overview page |
| TC-04 | Negative | User is logged in and on checkout info page | 1) Enter first name 2) Enter last name 3) Leave postal code empty 4) Click Continue | Postal code: empty | Error message "Postal Code is required" is shown |

### 3) Prompt given to Playwright Codegen

"Generate Playwright TypeScript automation for TC-01 and TC-04 using POM for SauceDemo checkout."

### 4) Output summary from Playwright Codegen

- Reused existing page objects and auth fixture.
- Added/used checkout data for valid and missing-postal scenarios.
- Implemented positive and negative assertions in spec files.

Implementation mapping:

- `TC-01` implemented in [tests/ui/checkout.spec.ts](tests/ui/checkout.spec.ts)
- `TC-04` implemented in [tests/ui/checkout.spec.ts](tests/ui/checkout.spec.ts)

## What the agents got right

- Suggested the right scenario split (positive + negative).
- Followed repo conventions (TypeScript, Playwright, POM style).
- Encouraged data-driven test design.

## What I corrected by hand

- Adjusted specific locators where needed.
- Moved assertions to specs when page objects had assertion logic.
- Replaced inline strings with data-file references.
- Simplified one complex API assertion for readability.

## Where I would not fully trust generation

- Dynamic/fragile locators without runtime verification.
- Environment-sensitive logic and CI-related assumptions.
- Complex business rules without domain confirmation.
- Final API assertion semantics unless verified against docs.

## Conclusion

Copilot agents were helpful for speed and first-draft generation. Human review was still required for final architecture consistency, assertion quality, and long-term maintainability.