import { eq } from "drizzle-orm";
import { ProposalStatus, ProposalStatusRepository } from "../../domain/repository/proposal-repository";
import { dbError } from "../../shared/errors";
import db, { Database } from "../db";
import { proposalStatus } from "../db/schema";

export function createProposalStatusRepository(db: Database): ProposalStatusRepository {
  return {
    create: async (newType) => {
      try {
        const [type] = await db.insert(proposalStatus).values({ ...newType }).returning();
        return type as ProposalStatus;
      } catch (error) {
        throw dbError(error);
      }
    },
    findAll: async () => {
      try {
        return await db.query.proposalStatus.findMany();
      } catch (error) {
        throw dbError(error);
      }
    },
    findById: async (id: number) => {
      try {
        return await db.query.proposalStatus.findFirst({ where: { id: { eq: id } } });
      } catch (error) {
        throw dbError(error);
      }
    },
    update: async (type: ProposalStatus) => {
      try {
        const [updated] = await db.insert(proposalStatus).values(type).onConflictDoUpdate({
          target: proposalStatus.id,
          set: {
            ...type,
          },
        }).returning();

        return updated;
      } catch (error) {
        throw dbError(error);
      }
    },
    delete: async (id: number) => {
      try {
        await db.delete(proposalStatus).where(eq(proposalStatus.id, id));
      } catch (error) {
        throw dbError(error);
      }
    }
  }
}

export const proposalStatusRepository = createProposalStatusRepository(db);
