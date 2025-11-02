import { int, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const testTable = sqliteTable("test_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text().notNull(),
});
