import { eq } from "drizzle-orm";
import { ProposalStatus, ProposalStatusRepository } from "../../domain/repository/proposal-repository";
import db, { Database } from "../db";
import { proposalStatus } from "../db/schema";

export function createProposalStatusRepository(db: Database): ProposalStatusRepository {
  return {
    create: async (newType) => {
      const [type] = await db.insert(proposalStatus).values({ ...newType }).returning();
      return type as ProposalStatus;
    },
    findAll: () => db.query.proposalStatus.findMany(),
    findById: (id: number) => db.query.proposalStatus.findFirst({ where: { id: { eq: id } } }),
    update: async (type: ProposalStatus) => {
      const [updated] = await db.insert(proposalStatus).values(type).onConflictDoUpdate({
        target: proposalStatus.id,
        set: {
          ...type,
        },
      }).returning();

      return updated;
    },
    delete: async (id: number) => {
      await db.delete(proposalStatus).where(eq(proposalStatus.id, id));
    }
  }
}

export const proposalStatusRepository = createProposalStatusRepository(db);
