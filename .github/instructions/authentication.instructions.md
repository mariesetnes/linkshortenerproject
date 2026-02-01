---
description: Read this before implementing or modifying authentication in the project.
---

# Authentication Guidelines

## Overview

This application uses **Clerk** exclusively for all authentication and user management. No other authentication methods should be implemented.

## Core Principles

1. **Clerk Only**: All authentication must use Clerk SDK - no custom auth, no alternative providers
2. **Modal-Based Auth**: Sign in and sign up always launch as modals, never as separate pages
3. **Protected Routes**: Dashboard requires authentication
4. **Smart Redirects**: Logged-in users accessing homepage redirect to dashboard

## Route Protection

### Protected Routes

The `/dashboard` route is protected and requires authentication:

```typescript
// In server components/actions
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Protected content
}
```

### Homepage Redirect Logic

Users already logged in should be redirected to `/dashboard` when accessing the homepage:

```typescript
// In app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  // Show homepage to unauthenticated users
}
```

## Authentication Patterns

### Server Components

Use Clerk's `auth()` for server-side authentication:

```typescript
import { auth } from "@clerk/nextjs/server";

export default async function ServerComponent() {
  const { userId } = await auth();

  if (!userId) {
    // Handle unauthenticated state
  }

  // userId is guaranteed to exist here
}
```

### Server Actions

Always authenticate server actions that modify user data:

```typescript
"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { links } from "@/db/schema";

export async function createLink(data: LinkData) {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  await db.insert(links).values({
    ...data,
    userId, // Always associate with user
  });

  return { success: true };
}
```

### Client Components

Use Clerk's client-side hooks for UI and interactivity:

```typescript
"use client"

import { useUser } from "@clerk/nextjs"

export function UserProfile() {
  const { user, isLoaded, isSignedIn } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <div>Please sign in</div>
  }

  return <div>Hello {user.firstName}</div>
}
```

## Modal Authentication

### Sign In Modal

```typescript
import { SignInButton } from "@clerk/nextjs"

<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>
```

### Sign Up Modal

```typescript
import { SignUpButton } from "@clerk/nextjs"

<SignUpButton mode="modal">
  <button>Get Started</button>
</SignUpButton>
```

### User Button

Display user menu with account management:

```typescript
import { UserButton } from "@clerk/nextjs"

<UserButton
  afterSignOutUrl="/"
  appearance={{
    elements: {
      avatarBox: "w-10 h-10"
    }
  }}
/>
```

## Database Integration

### Storing User Data

Always link user data to Clerk's `userId`:

```typescript
// db/schema.ts
export const links = pgTable("links", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // Clerk userId
  // other fields...
});
```

### Querying User Data

Filter by `userId` for user-specific data:

```typescript
const { userId } = await auth();

if (!userId) {
  throw new Error("Unauthorized");
}

const userLinks = await db.select().from(links).where(eq(links.userId, userId));
```

## Security Best Practices

1. **Always Check Auth**: Never assume authentication in protected routes/actions
2. **Associate Data**: Always link created records to `userId`
3. **Validate Ownership**: Verify user owns data before allowing modifications
4. **No Exposed Endpoints**: All data-modifying endpoints must check authentication
5. **Use Type Safety**: Leverage TypeScript to ensure `userId` is always checked

## Common Patterns

### Protecting API Routes

```typescript
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Handle authenticated request
}
```

### Conditional Rendering

```typescript
"use client"

import { useAuth } from "@clerk/nextjs"
import { SignInButton } from "@clerk/nextjs"

export function Navigation() {
  const { isSignedIn } = useAuth()

  return (
    <nav>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <SignInButton mode="modal">
          <button>Sign In</button>
        </SignInButton>
      )}
    </nav>
  )
}
```

## Environment Variables

Required Clerk environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

## Middleware (Optional)

For route-level protection with Clerk middleware:

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

## Error Handling

```typescript
try {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Authentication required");
  }

  // Perform operation
} catch (error) {
  console.error("Auth error:", error);
  return { error: "Failed to authenticate" };
}
```

## Testing Authentication

When testing authenticated features:

1. Use Clerk's testing tokens for development
2. Never mock auth in production code
3. Test both authenticated and unauthenticated states
4. Verify proper redirects and error handling

---

**Remember**: Clerk handles all authentication. Never implement custom auth logic or use alternative authentication providers.
