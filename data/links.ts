import { db } from "@/db"
import { links } from "@/db/schema"
import { eq, desc } from "drizzle-orm"

export async function getUserLinks(userId: string) {
  return await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt))
}

export async function createLink(userId: string, data: { url: string; shortCode: string }) {
  const [link] = await db
    .insert(links)
    .values({
      userId,
      url: data.url,
      shortCode: data.shortCode,
    })
    .returning()
  
  return link
}

export async function checkShortCodeExists(shortCode: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1)
  
  return !!link
}
