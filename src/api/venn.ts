import { createServerFn } from "@tanstack/react-start";
import { and, asc, desc, eq } from "drizzle-orm";

import { db } from "../db/client";
import {
  connectionRequests,
  people,
  personAnswers,
  submissionAnswers,
  submissions,
} from "../db/schema";

export type MatchPerson = {
  id: number;
  name: string;
  descriptor: string;
  work: number;
  personal: number;
  color: string;
  whyWork: string;
  whyPersonal: string;
  answers: string[];
  highlights: string[];
};

// Read every person with their three answers, shaped exactly how the matches
// screen expects. Runs on the server (route loader / SSR), so the DB never
// reaches the client bundle.
export const getPeople = createServerFn({ method: "GET" }).handler(
  async (): Promise<MatchPerson[]> => {
    const rows = await db
      .select()
      .from(people)
      .leftJoin(personAnswers, eq(personAnswers.personId, people.id))
      .orderBy(asc(people.id), asc(personAnswers.promptIndex));

    const byId = new Map<number, MatchPerson>();
    for (const { people: person, person_answers: answer } of rows) {
      let match = byId.get(person.id);
      if (!match) {
        match = {
          id: person.id,
          name: person.name,
          descriptor: person.descriptor,
          work: person.work,
          personal: person.personal,
          color: person.color,
          whyWork: person.whyWork,
          whyPersonal: person.whyPersonal,
          answers: [],
          highlights: [],
        };
        byId.set(person.id, match);
      }
      if (answer) {
        match.answers[answer.promptIndex] = answer.body;
        match.highlights[answer.promptIndex] = answer.highlight;
      }
    }

    return [...byId.values()];
  },
);

function clampBlend(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 50;
  return Math.max(0, Math.min(100, Math.round(n)));
}

// Persist a visitor's onboarding: their three answers, the blend they landed on,
// and optional activity preferences. Returns the new submission id so the client
// can attach later connection requests to it.
export const submitOnboarding = createServerFn({ method: "POST" })
  .validator((input: { answers: string[]; blend: number; activityPreferences: (number | null)[] }) => {
    if (!input || !Array.isArray(input.answers)) {
      throw new Error("answers are required");
    }
    const answers = input.answers.slice(0, 3).map((a) => String(a ?? "").trim());
    if (answers.length < 3 || answers.some((a) => a.length === 0)) {
      throw new Error("all three answers are required");
    }
    return {
      answers,
      blend: clampBlend(input.blend),
      activityPreferences: Array.isArray(input.activityPreferences)
        ? input.activityPreferences.slice(0, 20)
        : [],
    };
  })
  .handler(async ({ data }): Promise<{ submissionId: number }> => {
    const [submission] = await db
      .insert(submissions)
      .values({
        blend: data.blend,
        activityPreferences: JSON.stringify(data.activityPreferences),
      })
      .returning({ id: submissions.id });

    if (!submission) throw new Error("failed to create submission");

    await db.insert(submissionAnswers).values(
      data.answers.map((body, promptIndex) => ({
        submissionId: submission.id,
        promptIndex,
        body,
      })),
    );

    return { submissionId: submission.id };
  });

// Toggle a visitor's "Connect" request toward a person. Keeps one row per
// (submission, person) pair and flips `active` so history is preserved.
export const setConnection = createServerFn({ method: "POST" })
  .validator((input: { submissionId: number | null; personId: number; active: boolean }) => {
    const personId = Number(input?.personId);
    if (!Number.isInteger(personId) || personId <= 0) {
      throw new Error("a valid personId is required");
    }
    const submissionId =
      input?.submissionId == null ? null : Number(input.submissionId);
    return {
      submissionId:
        submissionId != null && Number.isInteger(submissionId) ? submissionId : null,
      personId,
      active: Boolean(input?.active),
    };
  })
  .handler(async ({ data }): Promise<{ active: boolean }> => {
    const whereClause =
      data.submissionId == null
        ? and(eq(connectionRequests.personId, data.personId))
        : and(
            eq(connectionRequests.personId, data.personId),
            eq(connectionRequests.submissionId, data.submissionId),
          );

    const [existing] = await db
      .select({ id: connectionRequests.id })
      .from(connectionRequests)
      .where(whereClause)
      .limit(1);

    if (existing) {
      await db
        .update(connectionRequests)
        .set({ active: data.active })
        .where(eq(connectionRequests.id, existing.id));
    } else if (data.active) {
      await db.insert(connectionRequests).values({
        submissionId: data.submissionId,
        personId: data.personId,
        active: true,
      });
    }

    return { active: data.active };
  });

export type ConnectionRequest = {
  id: number;
  personId: number;
  personName: string;
  personDescriptor: string;
  submissionId: number | null;
  createdAt: string;
};

// List the active "Connect" requests, newest first, with the person each one
// points at. Powers the /connections page.
export const getConnectionRequests = createServerFn({ method: "GET" }).handler(
  async (): Promise<ConnectionRequest[]> => {
    const rows = await db
      .select({
        id: connectionRequests.id,
        personId: connectionRequests.personId,
        personName: people.name,
        personDescriptor: people.descriptor,
        submissionId: connectionRequests.submissionId,
        createdAt: connectionRequests.createdAt,
      })
      .from(connectionRequests)
      .innerJoin(people, eq(people.id, connectionRequests.personId))
      .where(eq(connectionRequests.active, true))
      .orderBy(desc(connectionRequests.createdAt), desc(connectionRequests.id));

    return rows;
  },
);
