import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> },
) {
  try {
    const { shortcode } = await params;

    // Look up the link in the database
    const [link] = await db
      .select()
      .from(links)
      .where(eq(links.shortCode, shortcode))
      .limit(1);

    // If link not found, return 404
    if (!link) {
      return new NextResponse("Link not found", { status: 404 });
    }

    // Redirect to the full URL
    return NextResponse.redirect(link.url, { status: 307 });
  } catch (error) {
    console.error("Error redirecting:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
