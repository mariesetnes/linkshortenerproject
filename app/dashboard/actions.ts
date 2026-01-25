"use server"

import { auth } from "@clerk/nextjs/server"
import { z } from "zod"
import { createLink, checkShortCodeExists } from "@/data/links"
import { revalidatePath } from "next/cache"

// Zod schema for validation
const createLinkSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  shortCode: z
    .string()
    .min(3, "Short code must be at least 3 characters")
    .max(20, "Short code must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Short code can only contain letters, numbers, hyphens, and underscores"),
})

type CreateLinkInput = z.infer<typeof createLinkSchema>

export async function createLinkAction(input: CreateLinkInput) {
  // Step 1: Check authentication FIRST
  const { userId } = await auth()
  if (!userId) {
    return { error: "Unauthorized" }
  }

  // Step 2: Validate with Zod
  const result = createLinkSchema.safeParse(input)
  if (!result.success) {
    return { error: "Invalid input", details: result.error.flatten() }
  }

  // Step 3: Check if short code already exists
  try {
    const exists = await checkShortCodeExists(result.data.shortCode)
    if (exists) {
      return { error: "This short code is already taken. Please choose another one." }
    }

    // Step 4: Create link using data layer helper
    const link = await createLink(userId, result.data)
    revalidatePath("/dashboard")
    return { success: true, data: link }
  } catch (error) {
    console.error("Failed to create link:", error)
    return { error: "Failed to create link. Please try again." }
  }
}
