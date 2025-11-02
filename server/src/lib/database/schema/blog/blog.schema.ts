import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { users } from "../authentication/auth.schema";
import { blogComments } from "./blog-comments.schema";

export const blogPosts = sqliteTable("blog_posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content", { mode: "text" }).notNull(),
  featuredImage: text("featured_image"),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("draft"),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  viewCount: integer("view_count").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const blogPostTags = sqliteTable("blog_post_tags", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const blogPostTagsRelation = sqliteTable("blog_post_tags_relation", {
  id: text("id").primaryKey(),
  postId: text("post_id")
    .notNull()
    .references(() => blogPosts.id, { onDelete: "cascade" }),
  tagId: text("tag_id")
    .notNull()
    .references(() => blogPostTags.id, { onDelete: "cascade" }),
});

// Relations
export const blogPostsRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
  comments: many(blogComments),
  tags: many(blogPostTagsRelation),
}));

export const blogCommentsRelations = relations(blogComments, ({ one, many }) => ({
  post: one(blogPosts, {
    fields: [blogComments.postId],
    references: [blogPosts.id],
  }),
  author: one(users, {
    fields: [blogComments.authorId],
    references: [users.id],
  }),
  parent: one(blogComments, {
    fields: [blogComments.parentId],
    references: [blogComments.id],
    relationName: "comment_replies",
  }),
  replies: many(blogComments, {
    relationName: "comment_replies",
  }),
}));

export const blogPostTagsRelations = relations(blogPostTags, ({ many }) => ({
  posts: many(blogPostTagsRelation),
}));

export const blogPostTagsRelationRelations = relations(blogPostTagsRelation, ({ one }) => ({
  post: one(blogPosts, {
    fields: [blogPostTagsRelation.postId],
    references: [blogPosts.id],
  }),
  tag: one(blogPostTags, {
    fields: [blogPostTagsRelation.tagId],
    references: [blogPostTags.id],
  }),
}));
