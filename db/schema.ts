import {
  pgTable,
  integer,
  text,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const links = pgTable(
  "links",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: text("user_id").notNull(),
    url: text("url").notNull(),
    shortCode: text("short_code").notNull(),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    shortCodeIdx: uniqueIndex("short_code_idx").on(table.shortCode),
    userIdIdx: index("user_id_idx").on(table.userId),
  }),
);

export type Link = InferSelectModel<typeof links>;
export type NewLink = InferInsertModel<typeof links>;
