import { eq } from "drizzle-orm";
import { ProposalVote, ProposalVoteRepository } from "../../domain/repository/session-repository";
import db, { Database } from "../db";
import { proposalVotes } from "../db/schema";

export function createProposalVoteRepository(db: Database): ProposalVoteRepository {
  return {
    create: async (newVote) => {
      const [v] = await db.insert(proposalVotes).values({ ...newVote }).returning();
      return v as ProposalVote;
    },
    findAll: () => db.query.proposalVotes.findMany(),
    findById: (id: number) => db.query.proposalVotes.findFirst({ where: { id: { eq: id } } }),
    update: async (vote: ProposalVote) => {
      const [updated] = await db.update(proposalVotes).set(vote).where(eq(proposalVotes.id, vote.id)).returning();
      return updated;
    },
    delete: async (id: number) => {
      await db.delete(proposalVotes).where(eq(proposalVotes.id, id));
    }
  }
}

export const proposalVoteRepository = createProposalVoteRepository(db);
