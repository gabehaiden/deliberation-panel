import { eq } from "drizzle-orm";
import { Proposal, ProposalRepository } from "../../domain/repository/proposal-repository";
import db, { Database } from "../db";
import { proposals } from "../db/schema";

export function createProposalRepository(db: Database): ProposalRepository {
  return {
    create: async (newProposal) => {
      const [proposal] = await db.insert(proposals).values({ ...newProposal }).returning();
      return proposal as Proposal;
    },
    findAll: () => db.query.proposals.findMany(),
    findById: (id: number) => db.query.proposals.findFirst({ where: { id: { eq: id } } }),
    update: async (proposal: Proposal) => {
      const [updated] = await db.insert(proposals).values(proposal).onConflictDoUpdate({
        target: proposals.id,
        set: {
          ...proposal,
        },
      }).returning();

      return updated;
    },
    delete: async (id: number) => {
      await db.delete(proposals).where(eq(proposals.id, id));
    }
  }
}

export const proposalRepository = createProposalRepository(db);
