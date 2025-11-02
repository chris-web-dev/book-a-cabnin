import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "../authentication/auth.schema";
import { blogPosts } from "./blog-posts.schema";

export const blogComments = sqliteTable("blog_comments", {
  id: text("id").primaryKey(),
  postId: text("post_id")
    .notNull()
    .references(() => blogPosts.id, { onDelete: "cascade" }),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  parentId: text("parent_id"),
  content: text("content").notNull(),
  isApproved: integer("is_approved", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
