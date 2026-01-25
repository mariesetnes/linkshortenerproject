# Agent Instructions for Link Shortener Project

## Overview

This document serves as the main entry point for AI coding assistants working on this project. The instructions are organized into separate, focused guides to help you understand and maintain consistent coding standards across the codebase.

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
## Getting Help

If you encounter something not covered in these guides:
1. Check existing implementations in the codebase
2. Refer to official documentation:
   - [Next.js Docs](https://nextjs.org/docs)
   - [Drizzle ORM Docs](https://orm.drizzle.team)
   - [Clerk Docs](https://clerk.com/docs)
   - [Tailwind CSS Docs](https://tailwindcss.com/docs)
   - [shadcn/ui Docs](https://ui.shadcn.com)

---

**Last Updated**: January 18, 2026
**Project Status**: Active Development
**Documentation Version**: 1.0
