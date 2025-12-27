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
}, (r) => ({
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