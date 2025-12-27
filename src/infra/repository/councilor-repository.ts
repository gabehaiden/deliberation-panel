import { eq } from "drizzle-orm";
import { Councilor, CouncilorRepository } from "../../domain/repository/councilor-repository";
import db, { Database } from "../db";
import { councilors } from "../db/schema";

export function createCouncilorRepository(db: Database): CouncilorRepository {
  return {
    create: async (newCouncilor) => {
      try {
        const [councilor] = await db.insert(councilors).values({
          ...newCouncilor,
        }).returning();

        return councilor as Councilor;
      } catch (error) {
        throw error;
      }
    },
    findAll: () => {
      return db.query.councilors.findMany();
    },
    findById: (id: number) => {
      return db.query.councilors.findFirst({
        where: { id: { eq: id } },
      });
    },
    update: async (councilor: Councilor) => {
      const [updated] = await db.insert(councilors).values(councilor).onConflictDoUpdate({
        target: councilors.id,
        set: {
          ...councilor,
        },
      }).returning();

      return updated;
    },
    delete: async (id: number) => {
      await db.delete(councilors).where(eq(councilors.id, id));
    }
  }
}

export const councilorRepository = createCouncilorRepository(db);
