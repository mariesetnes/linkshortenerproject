import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { links } from "@/db/schema";

// Load environment variables
config();

async function seedExampleLinks() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  
  // Create database connection with Neon client
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);
  const userId = "user_38gYbeHIKeMI9HKzDU8V5UiSjn0";
  
  const exampleLinks = [
    {
      userId,
      url: "https://www.figma.com/",
      shortCode: "figma",
    },
    {
      userId,
      url: "https://stripe.com/docs/api",
      shortCode: "stripe",
    },
    {
      userId,
      url: "https://www.freecodecamp.org/",
      shortCode: "fcc",
    },
    {
      userId,
      url: "https://web.dev/",
      shortCode: "webdev",
    },
    {
      userId,
      url: "https://www.producthunt.com/",
      shortCode: "ph",
    },
    {
      userId,
      url: "https://firebase.google.com/docs",
      shortCode: "firebase",
    },
    {
      userId,
      url: "https://aws.amazon.com/documentation/",
      shortCode: "aws",
    },
    {
      userId,
      url: "https://www.udemy.com/",
      shortCode: "udemy",
    },
    {
      userId,
      url: "https://dev.to/",
      shortCode: "devto",
    },
    {
      userId,
      url: "https://hashnode.com/",
      shortCode: "hashnode",
    },
  ];

  try {
    console.log("Seeding example links...");
    
    const result = await db.insert(links).values(exampleLinks).returning();
    
    console.log(`✅ Successfully inserted ${result.length} example links`);
    console.log("\nCreated links:");
    result.forEach((link) => {
      console.log(`- /${link.shortCode} → ${link.url}`);
    });
  } catch (error) {
    console.error("❌ Error seeding links:", error);
    throw error;
  }
}

seedExampleLinks()
  .then(() => {
    console.log("\n✅ Seeding complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  });
