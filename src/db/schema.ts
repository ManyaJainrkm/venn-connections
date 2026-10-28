import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// The eight (fictional, for now) people a visitor can match with. Scores are the
// two axes the Work/Personal slider blends between.
export const people = sqliteTable("people", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  descriptor: text("descriptor").notNull(),
  work: integer("work").notNull(),
  personal: integer("personal").notNull(),
  color: text("color").notNull().default(""),
  whyWork: text("why_work").notNull(),
  whyPersonal: text("why_personal").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

// Each person answers the three prompts; promptIndex is 0..2. The highlight is the
// phrase the match surfaces inside the answer.
export const personAnswers = sqliteTable("person_answers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  personId: integer("person_id")
    .notNull()
    .references(() => people.id, { onDelete: "cascade" }),
  promptIndex: integer("prompt_index").notNull(),
  body: text("body").notNull(),
  highlight: text("highlight").notNull().default(""),
});

// A visitor completing onboarding. No auth yet, so a submission IS the visitor:
// their three answers plus where they left the Work/Personal blend.
export const submissions = sqliteTable("submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  blend: integer("blend").notNull().default(50),
  activityPreferences: text("activity_preferences").notNull().default("[]"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const submissionAnswers = sqliteTable("submission_answers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  submissionId: integer("submission_id")
    .notNull()
    .references(() => submissions.id, { onDelete: "cascade" }),
  promptIndex: integer("prompt_index").notNull(),
  body: text("body").notNull(),
});

// A "Connect" request from a visitor toward a person. Toggleable, so we keep the
// row and flip `active` rather than deleting history.
export const connectionRequests = sqliteTable("connection_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  submissionId: integer("submission_id").references(() => submissions.id, {
    onDelete: "cascade",
  }),
  personId: integer("person_id")
    .notNull()
    .references(() => people.id, { onDelete: "cascade" }),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export type PersonRow = typeof people.$inferSelect;
export type PersonAnswerRow = typeof personAnswers.$inferSelect;
