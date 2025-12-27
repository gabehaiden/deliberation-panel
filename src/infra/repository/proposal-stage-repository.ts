import { eq } from "drizzle-orm";
import { ProposalStage, ProposalStageRepository } from "../../domain/repository/proposal-repository";
import db, { Database } from "../db";
import { proprosalStages } from "../db/schema";

export function createProposalStageRepository(db: Database): ProposalStageRepository {
  return {
    create: async (newStage) => {
      const [stage] = await db.insert(proprosalStages).values({ ...newStage }).returning();
      return stage as ProposalStage;
    },
    findAll: () => db.query.proprosalStages.findMany(),
    findById: (id: number) => db.query.proprosalStages.findFirst({ where: { id: { eq: id } } }),
    update: async (stage: ProposalStage) => {
      const [updated] = await db.update(proprosalStages).set(stage).where(eq(proprosalStages.id, stage.id)).returning();
      return updated;
    },
    delete: async (id: number) => {
      await db.delete(proprosalStages).where(eq(proprosalStages.id, id));
    }
  }
}

export const proposalStageRepository = createProposalStageRepository(db);
