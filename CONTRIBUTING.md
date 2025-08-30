# Contributing to Ankur Halder's Portfolio

First off, thank you for considering contributing to this project! Your help is greatly appreciated.

This document provides a set of guidelines for contributing to the project. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [ankur.halder@example.com](mailto:ankur.halder@example.com).

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible. Fill out the required template, the information it asks for helps us resolve issues faster.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion and find related suggestions.

### Your First Code Contribution

Unsure where to begin contributing? You can start by looking through `good first issue` and `help wanted` issues.

### Pull Requests

The process described here has several goals:

- Maintain project quality
- Fix problems that are important to users
- Engage the community in working toward the best possible project
- Enable a sustainable system for maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1.  Follow all instructions in [the template](.github/PULL_REQUEST_TEMPLATE.md)
2.  Follow the [styleguides](#styleguides)
3.  After you submit your pull request, verify that all status checks are passing.

## Development Setup

Ready to contribute? Here's how to set up the project for local development.

1.  **Fork the repository.**
2.  **Clone your fork:**
    ```sh
    git clone https://github.com/your-username/ankurhalder-portfolio.git
    ```
3.  **Navigate to the project directory:**
    ```sh
    cd ankurhalder-portfolio
    ```
4.  **Install dependencies:**
    ```sh
    npm install
    ```
5.  **Run the development server:**
    ```sh
    npm run dev
    ```
6.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 72 characters or less.
- Reference issues and pull requests liberally after the first line.

### JavaScript Styleguide

All JavaScript code is linted with [ESLint](https://eslint.org/).

- Run `npm run lint` to check for linting errors.
- We follow the rules defined in our `.eslintrc.mjs` file.

### Stylesheets Styleguide

We use [Sass](https://sass-lang.com/) for styling. Please follow the existing code style.

## Questions?

If you have any questions, you can create an issue.

Thank you for your contribution!
