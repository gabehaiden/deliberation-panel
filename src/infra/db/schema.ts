import { defineRelations, sql } from "drizzle-orm";
import * as p from "drizzle-orm/pg-core";

const timestamps = {
  updatedAt: p.timestamp().$onUpdate(() => sql`NOW()`),
  createdAt: p.timestamp().default(sql`NOW()`),
}

export const categories = p.pgTable('categories', {
  id: p.serial().primaryKey(),
  description: p.varchar().notNull(),
})

export const parties = p.pgTable('parties', {
  id: p.serial().primaryKey(),
  name: p.varchar().notNull(),
  code: p.varchar().notNull(),
  acronym: p.varchar().notNull(),
  ...timestamps,
})

export const councilors = p.pgTable('councilors', {
  id: p.serial().primaryKey(),
  name: p.varchar().notNull(),
  partyId: p.integer().notNull().references(() => parties.id),
  ...timestamps,
});

export const councilorTerms = p.pgTable('councilor_terms', {
  id: p.serial().primaryKey(),
  councilorId: p.integer().notNull().references(() => councilors.id),
  termStart: p.date().notNull(),
  termEnd: p.date().notNull(),
  ...timestamps,
});

export const proposalStatus = p.pgTable('proposal_status', {
  id: p.serial().primaryKey(),
  description: p.varchar().notNull(),
})

export const proprosalStages = p.pgTable('proposal_stages', {
  id: p.serial().primaryKey(),
  description: p.varchar().notNull(),
})

export const proposals = p.pgTable('proposals', {
  id: p.serial().primaryKey(),
  title: p.varchar().notNull(),
  description: p.text().notNull(),
  authorId: p.integer().notNull().references(() => councilors.id),
  statusId: p.integer().notNull().references(() => proposalStatus.id),
  categoryId: p.integer().notNull().references(() => categories.id),
  protocol: p.varchar().notNull(),
  ...timestamps,
});

export const sessionTypes = p.pgTable('session_types', {
  id: p.serial().primaryKey(),
  description: p.varchar().notNull(),
})

export const sessions = p.pgTable('sessions', {
  id: p.serial().primaryKey(),
  presidentId: p.integer().notNull().references(() => councilors.id),
  sessionType: p.integer().notNull().references(() => sessionTypes.id),
  notes: p.text(),
  startedAt: p.timestamp().notNull(),
  finishedAt: p.timestamp(),
  ...timestamps,
});

export const sessionProposals = p.pgTable('session_proposals', {
  id: p.serial().primaryKey(),
  sessionId: p.integer().notNull().references(() => sessions.id),
  proposalId: p.integer().notNull().references(() => proposals.id),
  stageId: p.integer().notNull().references(() => proprosalStages.id),
  order: p.integer().notNull(),
  notes: p.text(),
  ...timestamps,
});

export const voteEnum = p.pgEnum('vote_enum', ['yes', 'no', 'abstain']);

export const proposalVotes = p.pgTable('proposal_votes', {
  id: p.serial().primaryKey(),
  sessionProposalId: p.integer().notNull().references(() => sessionProposals.id),
  councilorId: p.integer().notNull().references(() => councilors.id),
  vote: voteEnum(),
  notes: p.text(),
  ...timestamps,
});

export const user = p.pgTable("user", {
  id: p.text("id").primaryKey(),
  name: p.text("name").notNull(),
  email: p.text("email").notNull().unique(),
  emailVerified: p.boolean("email_verified").default(false).notNull(),
  image: p.text("image"),
  createdAt: p.timestamp("created_at").defaultNow().notNull(),
  updatedAt: p.timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const userSession = p.pgTable(
  "user_session",
  {
    id: p.text("id").primaryKey(),
    expiresAt: p.timestamp("expires_at").notNull(),
    token: p.text("token").notNull().unique(),
    createdAt: p.timestamp("created_at").defaultNow().notNull(),
    updatedAt: p.timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: p.text("ip_address"),
    userAgent: p.text("user_agent"),
    userId: p.text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [p.index("session_userId_idx").on(table.userId)],
);

export const account = p.pgTable(
  "account",
  {
    id: p.text("id").primaryKey(),
    accountId: p.text("account_id").notNull(),
    providerId: p.text("provider_id").notNull(),
    userId: p.text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: p.text("access_token"),
    refreshToken: p.text("refresh_token"),
    idToken: p.text("id_token"),
    accessTokenExpiresAt: p.timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: p.timestamp("refresh_token_expires_at"),
    scope: p.text("scope"),
    password: p.text("password"),
    createdAt: p.timestamp("created_at").defaultNow().notNull(),
    updatedAt: p.timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [p.index("account_userId_idx").on(table.userId)],
);

export const verification = p.pgTable(
  "verification",
  {
    id: p.text("id").primaryKey(),
    identifier: p.text("identifier").notNull(),
    value: p.text("value").notNull(),
    expiresAt: p.timestamp("expires_at").notNull(),
    createdAt: p.timestamp("created_at").defaultNow().notNull(),
    updatedAt: p.timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [p.index("verification_identifier_idx").on(table.identifier)],
);

export const relations = defineRelations({
  councilors,
  councilorTerms,
  parties,
  proposals,
  categories,
  proposalStatus,
  proposalVotes,
  proprosalStages,
  sessions,
  sessionProposals,
  sessionTypes,
  user,
  account,
  userSession,
}, (r) => ({
  user: {
    sessions: r.many.userSession({
      from: r.user.id,
      to: r.userSession.userId,
    })
  },
  userSession: {
    user: r.one.user({
      from: r.userSession.userId,
      to: r.user.id,
    }),
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },
  councilors: {
    party: r.one.parties({
      from: r.councilors.partyId,
      to: r.parties.id,
    }),
    terms: r.many.councilorTerms({
      from: r.councilors.id,
      to: r.councilorTerms.councilorId,
    }),
  },
  proposals: {
    status: r.one.proposalStatus({
      from: r.proposals.statusId,
      to: r.proposalStatus.id,
    }),
    author: r.one.councilors({
      from: r.proposals.authorId,
      to: r.councilors.id,
    }),
    votes: r.many.proposalVotes({
      from: r.proposals.id,
      to: r.proposalVotes.sessionProposalId,
    }),
    category: r.one.categories({
      from: r.proposals.categoryId,
      to: r.categories.id,
    }),
  },
  sessions: {
    president: r.one.councilors({
      from: r.sessions.presidentId,
      to: r.councilors.id,
    }),
    type: r.one.sessionTypes({
      from: r.sessions.sessionType,
      to: r.sessionTypes.id,
    }),
    sessionProposals: r.many.sessionProposals({
      from: r.sessions.id,
      to: r.sessionProposals.sessionId,
    }),
  }
}))