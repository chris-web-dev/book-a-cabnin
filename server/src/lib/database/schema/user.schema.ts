import { relations } from "drizzle-orm";
import { users } from "./authentication/auth.schema";
import { domainEmails } from "./org.schema";
import { listings } from "./booking/listings.schema";
import { bookings } from "./booking/bookings.schema";
import { reviews } from "./booking/reviews.schema";

export const usersRelations = relations(users, ({ many }) => ({
  domainEmails: many(domainEmails),
  listings: many(listings),
  bookings: many(bookings),
  reviews: many(reviews),
}));
