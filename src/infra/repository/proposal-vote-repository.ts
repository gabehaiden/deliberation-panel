import { eq } from "drizzle-orm";
import { ProposalVote, ProposalVoteRepository } from "../../domain/repository/session-repository";
import { dbError } from "../../shared/errors";
import db, { Database } from "../db";
import { proposalVotes } from "../db/schema";

export function createProposalVoteRepository(db: Database): ProposalVoteRepository {
  return {
    create: async (newVote) => {
      try {
        const [v] = await db.insert(proposalVotes).values({ ...newVote }).returning();
        return v as ProposalVote;
      } catch (error) {
        throw dbError(error);
      }
    },
    findAll: async () => {
      try {
        return await db.query.proposalVotes.findMany();
      } catch (error) {
        throw dbError(error);
      }
    },
    findById: async (id: number) => {
      try {
        return await db.query.proposalVotes.findFirst({ where: { id: { eq: id } } });
      } catch (error) {
        throw dbError(error);
      }
    },
    update: async (vote: ProposalVote) => {
      try {
        const [updated] = await db.insert(proposalVotes).values(vote).onConflictDoUpdate({
          target: proposalVotes.id,
          set: {
            ...vote,
          },
        }).returning();

        return updated;
      } catch (error) {
        throw dbError(error);
      }
    },
    delete: async (id: number) => {
      try {
        await db.delete(proposalVotes).where(eq(proposalVotes.id, id));
      } catch (error) {
        throw dbError(error);
      }
    }
  }
}

export const proposalVoteRepository = createProposalVoteRepository(db);
