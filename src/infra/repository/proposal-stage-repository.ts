import { eq } from "drizzle-orm";
import { ProposalStage, ProposalStageRepository } from "../../domain/repository/proposal-repository";
import { dbError } from "../../shared/errors";
import db, { Database } from "../db";
import { proprosalStages } from "../db/schema";

export function createProposalStageRepository(db: Database): ProposalStageRepository {
  return {
    create: async (newStage) => {
      try {
        const [stage] = await db.insert(proprosalStages).values({ ...newStage }).returning();
        return stage as ProposalStage;
      } catch (error) {
        throw dbError(error);
      }
    },
    findAll: async () => {
      try {
        return await db.query.proprosalStages.findMany();
      } catch (error) {
        throw dbError(error);
      }
    },
    findById: async (id: number) => {
      try {
        return await db.query.proprosalStages.findFirst({ where: { id: { eq: id } } });
      } catch (error) {
        throw dbError(error);
      }
    },
    update: async (stage: ProposalStage) => {
      try {
        const [updated] = await db.insert(proprosalStages).values(stage).onConflictDoUpdate({
          target: proprosalStages.id,
          set: {
            ...stage,
          },
        }).returning();

        return updated;
      } catch (error) {
        throw dbError(error);
      }
    },
    delete: async (id: number) => {
      try {
        await db.delete(proprosalStages).where(eq(proprosalStages.id, id));
      } catch (error) {
        throw dbError(error);
      }
    }
  }
}

export const proposalStageRepository = createProposalStageRepository(db);
