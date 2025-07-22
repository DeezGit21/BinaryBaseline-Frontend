import { pgTable, text, varchar, timestamp, integer, boolean, jsonb, index, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email").unique().notNull(),
  password: varchar("password"), // null for OAuth users
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  googleId: varchar("google_id").unique(),
  authProvider: varchar("auth_provider").notNull().default("email"), // 'email' or 'google'
  emailVerified: boolean("email_verified").default(false),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  trialEnds: text("trial_ends"),
  isAdmin: boolean("is_admin").default(false),
  // License key information
  phone: varchar("phone"),
  address: varchar("address"),
  subscriptionTier: varchar("subscription_tier"), // 'new_trader', 'pro_trader', 'elite_trader'
  licenseKey: varchar("license_key").unique(),
  licenseKeyGeneratedAt: timestamp("license_key_generated_at"),
  licenseKeyGeneratedBy: varchar("license_key_generated_by"), // admin user id
  downloadEligible: boolean("download_eligible").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
  authProvider: true,
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export const downloadRequestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  subscriptionTier: z.enum(['new_trader', 'pro_trader', 'elite_trader'], {
    errorMap: () => ({ message: "Please select a subscription tier" })
  }),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type UpsertUser = typeof users.$inferInsert;
export type DownloadRequest = z.infer<typeof downloadRequestSchema>;

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  tier: text("tier").notNull(), // "new_trader", "pro_trader", "elite_trader"
  status: text("status").notNull(), // "active", "trial", "cancelled", "expired"
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  tradesRemaining: integer("trades_remaining"),
  chartsAllowed: integer("charts_allowed").notNull(),
  stripeCustomerId: text("stripe_customer_id"),
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions);

export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;

export const visits = pgTable("visits", {
  id: serial("id").primaryKey(),
  date: timestamp("date").defaultNow().notNull(),
  path: text("path").notNull(),
  count: integer("count").default(1).notNull(),
  ip: text("ip"),
  userAgent: text("user_agent"),
  displayThreshold: integer("display_threshold").default(1000).notNull(),
});

export const insertVisitSchema = createInsertSchema(visits);

export type InsertVisit = z.infer<typeof insertVisitSchema>;
export type Visit = typeof visits.$inferSelect;

// Downloads tracking table
export const downloads = pgTable("downloads", {
  id: serial("id").primaryKey(),
  date: timestamp("date").defaultNow().notNull(),
  ip: text("ip"),
  userAgent: text("user_agent"),
  userId: varchar("user_id").references(() => users.id),
  version: text("version"),
  platform: text("platform"),
  successful: boolean("successful").default(true),
});

export const insertDownloadSchema = createInsertSchema(downloads);

export type InsertDownload = z.infer<typeof insertDownloadSchema>;
export type Download = typeof downloads.$inferSelect;
