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
  const userId = "user_38Y7rbRS0kwR8W3GpeU1ike2y53";
  
  const exampleLinks = [
    {
      userId,
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      shortCode: "mdn-js",
    },
    {
      userId,
      url: "https://www.typescriptlang.org/docs/",
      shortCode: "ts-docs",
    },
    {
      userId,
      url: "https://react.dev/learn",
      shortCode: "react",
    },
    {
      userId,
      url: "https://nodejs.org/en/docs/",
      shortCode: "nodejs",
    },
    {
      userId,
      url: "https://stackoverflow.com/questions/tagged/typescript",
      shortCode: "so-ts",
    },
    {
      userId,
      url: "https://www.postgresql.org/docs/",
      shortCode: "pg-docs",
    },
    {
      userId,
      url: "https://vitejs.dev/guide/",
      shortCode: "vite",
    },
    {
      userId,
      url: "https://code.visualstudio.com/docs",
      shortCode: "vscode",
    },
    {
      userId,
      url: "https://www.reddit.com/r/webdev/",
      shortCode: "r-webdev",
    },
    {
      userId,
      url: "https://css-tricks.com/",
      shortCode: "css-tricks",
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
