# Contributing to Pet Care SaaS

Thank you for your interest in contributing to Pet Care SaaS! This document provides guidelines and instructions for contributing to our project.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/pet-care-landing.git
   cd pet-care-landing
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Guidelines

### TypeScript

- Strict TypeScript usage is mandatory
- No `any` types allowed
- Use interface for object types
- Define proper return types for functions
- Use generics when appropriate

### React & Next.js

- Use functional components with TypeScript
- Implement proper error boundaries
- Follow Next.js 15 App Router conventions
- Use Server and Client Components appropriately
- Implement proper loading and error states

### Styling

- Use Tailwind CSS for styling
- Follow mobile-first approach
- Maintain consistent spacing using Tailwind's spacing scale
- Use Shadcn UI components when available
- Ensure responsive design across all breakpoints

### Code Style

- Use ESLint and Prettier with provided configurations
- Follow component file structure:
  ```typescript
  // Imports
  import { useState } from 'react'
  import type { ComponentType } from 'types'
  
  // Types
  interface Props {
    // ...
  }
  
  // Component
  export function ComponentName({ prop1, prop2 }: Props) {
    // ...
  }
  ```

### Testing

- Write Jest tests for utility functions
- Include component tests for critical features
- Test responsive behavior
- Test error states and edge cases

## 📝 Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass:
   ```bash
   pnpm test
   ```
4. Follow conventional commits:
   ```
   feat: add new feature
   fix: bug fix
   docs: documentation updates
   style: formatting, missing semicolons, etc
   refactor: code restructuring
   test: adding tests
   chore: maintenance tasks
   ```
5. Create a Pull Request with:
   - Clear title and description
   - Screenshots/GIFs for UI changes
   - Link to related issue
   - List of changes made

## 🐛 Bug Reports

When filing a bug report, include:

1. Description of the issue
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Screenshots if applicable
6. Environment details:
   - Browser version
   - OS version
   - Node.js version
   - pnpm version

## 💡 Feature Requests

When proposing new features:

1. Describe the feature in detail
2. Explain the use case
3. Consider implementation complexity
4. Discuss potential alternatives
5. Include mockups/wireframes if UI-related

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated promptly and fairly.

## 📄 License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.
