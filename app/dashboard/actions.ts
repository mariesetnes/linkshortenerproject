"use server"

import { auth } from "@clerk/nextjs/server"
import { z } from "zod"
import { createLink, checkShortCodeExists, updateLink, deleteLink, getLinkById } from "@/data/links"
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

const updateLinkSchema = z.object({
  linkId: z.number(),
  url: z.string().url("Please enter a valid URL"),
  shortCode: z
    .string()
    .min(3, "Short code must be at least 3 characters")
    .max(20, "Short code must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Short code can only contain letters, numbers, hyphens, and underscores"),
})

const deleteLinkSchema = z.object({
  linkId: z.number(),
})

type CreateLinkInput = z.infer<typeof createLinkSchema>
type UpdateLinkInput = z.infer<typeof updateLinkSchema>
type DeleteLinkInput = z.infer<typeof deleteLinkSchema>

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

export async function updateLinkAction(input: UpdateLinkInput) {
  // Step 1: Check authentication FIRST
  const { userId } = await auth()
  if (!userId) {
    return { error: "Unauthorized" }
  }

  // Step 2: Validate with Zod
  const result = updateLinkSchema.safeParse(input)
  if (!result.success) {
    return { error: "Invalid input", details: result.error.flatten() }
  }

  // Step 3: Verify link ownership
  try {
    const existingLink = await getLinkById(result.data.linkId, userId)
    if (!existingLink || existingLink.userId !== userId) {
      return { error: "Link not found or unauthorized" }
    }

    // Step 4: Check if short code is taken by another link
    const shortCodeExists = await checkShortCodeExists(result.data.shortCode)
    if (shortCodeExists && existingLink.shortCode !== result.data.shortCode) {
      return { error: "This short code is already taken. Please choose another one." }
    }

    // Step 5: Update link using data layer helper
    const link = await updateLink(result.data.linkId, userId, {
      url: result.data.url,
      shortCode: result.data.shortCode,
    })
    revalidatePath("/dashboard")
    return { success: true, data: link }
  } catch (error) {
    console.error("Failed to update link:", error)
    return { error: "Failed to update link. Please try again." }
  }
}

export async function deleteLinkAction(input: DeleteLinkInput) {
  // Step 1: Check authentication FIRST
  const { userId } = await auth()
  if (!userId) {
    return { error: "Unauthorized" }
  }

  // Step 2: Validate with Zod
  const result = deleteLinkSchema.safeParse(input)
  if (!result.success) {
    return { error: "Invalid input", details: result.error.flatten() }
  }

  // Step 3: Verify link ownership
  try {
    const existingLink = await getLinkById(result.data.linkId, userId)
    if (!existingLink || existingLink.userId !== userId) {
      return { error: "Link not found or unauthorized" }
    }

    // Step 4: Delete link using data layer helper
    await deleteLink(result.data.linkId, userId)
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete link:", error)
    return { error: "Failed to delete link. Please try again." }
  }
}

