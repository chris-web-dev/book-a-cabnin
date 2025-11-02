import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./authentication/auth.schema";
import { relations } from "drizzle-orm";

export const domainEmails = sqliteTable("domain_emails", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(), // Domene-e-post (christopher.tonnesland@grindatunet.no)
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  isPrimary: integer("is_primary", { mode: "boolean" }).notNull().default(false), // Hoved-e-post for innlogging
  isVerified: integer("is_verified", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const domainEmailsRelations = relations(domainEmails, ({ one }) => ({
  user: one(users, {
    fields: [domainEmails.userId],
    references: [users.id],
  }),
}));
