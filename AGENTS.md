# Agent Instructions for Link Shortener Project

## Overview

This document serves as the main entry point for AI coding assistants working on this project. The instructions are organized into separate, focused guides to help you understand and maintain consistent coding standards across the codebase.

## ⚠️ CRITICAL: Read Documentation FIRST

**BEFORE generating ANY code, you MUST:**
1. **Identify the relevant documentation file(s)** in the `/docs` directory
2. **READ the complete documentation** for that area
3. **Follow the patterns and guidelines** specified in those files
4. **Check existing implementations** to maintain consistency

**This is NOT optional.** Generating code without reading the relevant documentation will result in inconsistent implementations that violate project standards.

## Project Description

A modern link shortener application built with Next.js 16, React 19, TypeScript, Drizzle ORM, Neon PostgreSQL, and Clerk authentication. The application allows users to create shortened URLs with custom codes, track analytics, and manage their links through an authenticated dashboard.

## Tech Stack Summary

- **Framework**: Next.js 16.1.3 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **UI**: React 19.2.3, Tailwind CSS 4, shadcn/ui (New York style)
- **Database**: Drizzle ORM 0.45.1 + Neon PostgreSQL
- **Authentication**: Clerk 6.36.8
- **Icons**: Lucide React 0.562.0

## ⚠️ CRITICAL: Next.js Middleware Warning

**NEVER use `middleware.ts`** - This is deprecated in later versions of Next.js with TypeScript.

**✅ ALWAYS use `proxy.ts` instead** for middleware functionality.

This project uses `proxy.ts` for all middleware-related operations. If you need to add middleware logic, implement it in the existing `proxy.ts` file following the established patterns.

## Documentation Structure

For detailed guidelines on specific topics, refer to the modular documentation in the `/docs` directory. 

**⚠️ MANDATORY: You MUST read the relevant documentation file(s) BEFORE generating any code.**

Available documentation guides:

- **[Authentication Guidelines](docs/authentication.md)** - Clerk authentication patterns, protected routes, and user management
  - **Read this BEFORE**: Implementing auth, creating protected routes, handling user data
- **[UI Component Guidelines](docs/ui-components.md)** - shadcn/ui component usage, styling patterns, and composition rules
  - **Read this BEFORE**: Creating UI components, styling, using shadcn/ui

## Quick Start for AI Agents

When working on this project, follow this workflow:

### 1. **Understand the Request & READ DOCUMENTATION**
- Identify which area of the codebase you'll be working in
- **IMMEDIATELY read the relevant documentation guide(s)** in `/docs`
- **Do NOT skip this step** - generating code without reading docs will cause inconsistencies

### 2. **Check Existing Patterns**
- Look for similar implementations in the codebase
- Follow established patterns and conventions
- Maintain consistency with existing code style

### 3. **Write Type-Safe Code**
- Always use TypeScript with proper types
- Leverage Drizzle ORM type inference
- Never use `any` type unless absolutely necessary

### 4. **Follow Server/Client Component Rules**
- Default to Server Components
- Only use Client Components when needed (hooks, interactivity)
- Mark client components with `"use client"` directive

### 5. **Handle Authentication**
- Always check authentication for protected operations
- Use Clerk's `auth()` in server components/actions
- Associate user data with `userId`

### 6. **Implement Error Handling**
- Use consistent error response patterns
- Provide helpful error messages
- Log errors appropriately
- Never expose sensitive information

### 7. **Style Consistently**
- Use Tailwind CSS utility classes
- Support dark mode with `dark:` variants
- Use the `cn()` utility for conditional classes
- Follow mobile-first responsive design

### 8. **Validate and Test**
- Validate all user inputs
- Test changes thoroughly
- Ensure TypeScript compiles without errors
- Check for proper error handling

## Common Commands

```bash
# Development
npm run dev              # Start development server

# Database
npx drizzle-kit generate # Generate migrations
npx drizzle-kit push     # Push schema to database
npx drizzle-kit studio   # Open Drizzle Studio

# Build & Deploy
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
```

## Key Principles

1. **Type Safety First**: Leverage TypeScript's type system fully
2. **Server-First Architecture**: Use Server Components by default
3. **Security**: Always authenticate and authorize
4. **Performance**: Optimize for speed and user experience
5. **Consistency**: Follow established patterns
6. **Maintainability**: Write clean, documented code
7. **User Experience**: Handle loading states and errors gracefully

## File Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Routes**: lowercase with hyphens (e.g., `user-profile/`)
- **Types**: PascalCase (e.g., `UserData.ts`)
- **Database columns**: snake_case (e.g., `created_at`)

## Import Aliases

```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { links } from "@/db/schema"
```

## When to Reference Each Guide
**⚠️ CRITICAL: READ the relevant guide(s) BEFORE writing any code in these areas:**

- **Building new features** → Start with Architecture, then Component Patterns
- **Database operations** → Database Guidelines
- **Adding authentication** → **MUST READ** [Authentication Guidelines](docs/authentication.md)
- **Creating UI components** → **MUST READ** [UI Component Guidelines](docs/ui-components.md)
- **Creating forms/actions** → API & Server Actions
- **Styling components** → **MUST READ** [UI Component Guidelines](docs/ui-components.md)
- **Writing tests** → Testing Guidelines
- **Unclear about conventions** → Coding Standards

**Remember: Reading documentation is mandatory, not optional. Always read BEFORE you code.**
- **Unclear about conventions** → Coding Standards

## Getting Help

If you encounter something not covered in these guides:
1. Check existing implementations in the codebase
2. Refer to official documentation:
   - [Next.js Docs](https://nextjs.org/docs)
   - [Drizzle ORM Docs](https://orm.drizzle.team)
   - [Clerk Docs](https://clerk.com/docs)
   - [Tailwind CSS Docs](https://tailwindcss.com/docs)
   - [shadcn/ui Docs](https://ui.shadcn.com)

## Contributing to Documentation

When adding new patterns or standards:
1. Update the relevant guide in `/docs`
2. Keep examples practical and project-specific
3. Maintain consistency with existing documentation
4. Update this index if adding new guides

---

**Last Updated**: January 18, 2026
**Project Status**: Active Development
**Documentation Version**: 1.0
