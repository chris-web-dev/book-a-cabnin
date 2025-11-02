import { relations } from "drizzle-orm";
import { blogPosts } from "./blog-posts.schema";
import { blogComments } from "./blog-comments.schema";
import { users } from "../authentication/auth.schema";
import { blogPostTagsRelation } from "./blog.schema";

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
