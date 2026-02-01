---
description: Read this before implementing data mutations or server actions in the project.
---

# Server Actions Guidelines

This document outlines the requirements for implementing server actions for data mutations.

## Core Rules

1. **Server Actions Only**: ALL data mutations MUST be done via server actions
2. **Client Component Invocation**: Server actions MUST be called from client components
3. **File Naming**: Server action files MUST be named `actions.ts` and colocated with calling component
4. **Type Safety**: Use proper TypeScript types (DO NOT use FormData type)
5. **Validation**: ALL data MUST be validated with Zod schemas
6. **Authentication**: MUST check for logged-in user FIRST before database operations
7. **Data Layer**: Use helper functions from `/data` directory (NO direct Drizzle queries)

## File Structure

```
app/
  dashboard/
    page.tsx          // Client component
    actions.ts        // Server actions for dashboard
  links/
    create/
      form.tsx        // Client component
      actions.ts      // Server actions
```

## Implementation Pattern

```typescript
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink } from "@/data/links";
import { revalidatePath } from "next/cache";

// 1. Define Zod schema
const createLinkSchema = z.object({
  url: z.string().url(),
  shortCode: z.string().min(3).max(20),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;

// 2. Implement server action
export async function createLinkAction(input: CreateLinkInput) {
  // Step 1: Check authentication FIRST
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  // Step 2: Validate with Zod
  const result = createLinkSchema.safeParse(input);
  if (!result.success) {
    return { error: "Invalid input", details: result.error.flatten() };
  }

  // Step 3: Use data layer helper (NOT direct Drizzle)
  try {
    const link = await createLink(userId, result.data);
    revalidatePath("/dashboard");
    return { success: true, data: link };
  } catch (error) {
    return { error: "Failed to create link" };
  }
}
```

## Client Component Usage

```typescript
"use client"

import { createLinkAction } from "./actions"

export function CreateLinkForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Create typed object (NOT FormData type)
    const input = {
      url: formData.get("url") as string,
      shortCode: formData.get("shortCode") as string,
    }

    const result = await createLinkAction(input)
    if (result.error) {
      // Handle error
    }
  }

  return <form onSubmit={handleSubmit}>{/* fields */}</form>
}
```

## Data Layer Integration

```typescript
// ✅ CORRECT: Use helper from /data
import { createLink } from "@/data/links";
const link = await createLink(userId, data);

// ❌ WRONG: Direct Drizzle queries
import { db } from "@/db";
await db.insert(links).values(data); // DON'T DO THIS
```

## Error Handling

Server actions MUST NOT throw errors. Always return structured response objects:

```typescript
// ✅ CORRECT: Return error object
export async function myAction(input: Input) {
  try {
    const result = await doSomething(input);
    return { success: true, data: result };
  } catch (error) {
    return { error: "Operation failed" };
  }
}

// ❌ WRONG: Throwing errors
export async function myAction(input: Input) {
  const result = await doSomething(input); // May throw
  return result; // DON'T DO THIS
}
```

Response types should be:

- Success: `{ success: true, data: T }`
- Error: `{ error: string, details?: unknown }`

## Checklist

- [ ] File named `actions.ts` and colocated with component
- [ ] `"use server"` directive at top
- [ ] Zod schema defined
- [ ] Proper TypeScript types (not FormData)
- [ ] Authentication check FIRST
- [ ] Input validation with Zod
- [ ] Use `/data` helper functions
- [ ] Structured error responses
- [ ] Called from client component

---

**Last Updated**: January 24, 2026
