import { eq } from "drizzle-orm";
import { Proposal, ProposalRepository } from "../../domain/repository/proposal-repository";
import { dbError } from "../../shared/errors";
import db, { Database } from "../db";
import { proposals } from "../db/schema";

export function createProposalRepository(db: Database): ProposalRepository {
  return {
    create: async (newProposal) => {
      try {
        const [proposal] = await db.insert(proposals).values({ ...newProposal }).returning();
        return proposal as Proposal;
      } catch (error) {
        throw dbError(error);
      }
    },
    findAll: async () => {
      try {
        return await db.query.proposals.findMany();
      } catch (error) {
        throw dbError(error);
      }
    },
    findById: async (id: number) => {
      try {
        return await db.query.proposals.findFirst({ where: { id: { eq: id } } });
      } catch (error) {
        throw dbError(error);
      }
    },
    update: async (proposal: Proposal) => {
      try {
        const [updated] = await db.insert(proposals).values(proposal).onConflictDoUpdate({
          target: proposals.id,
          set: {
            ...proposal,
          },
        }).returning();

        return updated;
      } catch (error) {
        throw dbError(error);
      }
    },
    delete: async (id: number) => {
      try {
        await db.delete(proposals).where(eq(proposals.id, id));
      } catch (error) {
        throw dbError(error);
      }
    }
  }
}

export const proposalRepository = createProposalRepository(db);
