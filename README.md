# Playwright Test Project with TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:
    Node.js (v12 or later)
    npm

## Installation
1. Clone the repository

```bash
git clone https://github.com/GlitchHunter03/Playwright-automation-demo-project.git
cd Playwright-automation-demo-project
```

2. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

3. Folder Structure

Your project directory should look something like this:

```bash

├── Tests/
│   ├── cart/
│   │   └── addToCartAndValidate.spec.ts  # To test Cart Validation – Ensure that the correct item is added with the right price.
│   ├── Checkout
│   │   └── checkout.spec.ts # To test Checkout Process – Users can enter shipping details and complete the purchase.
│   ├── datadriven/
│   │   └── dataDriven.spec.ts  # For Data-Driven Testing – To Run the test for multiple product names.
│   ├── negative/
│   │   └── negative.spec.ts  # Negative Test Cases – Handle invalid scenarios, such as empty cart checkout or incorrect email format.
│   └── Search/
│       └── search.spec.ts # Contains 3 Tests - Search Functionality, Add to Cart and Cart Validation
├── test-results/
│       └── .last-run.json
├── .gitignore
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```
## Running the Tests

To Run all tests, use below command:

```bash
npm test
```

To run individual test, use below command:

```bash
npm test <path to file> # For example, to execute test for search, use - npm test tests/Search/search.spec.ts
```




