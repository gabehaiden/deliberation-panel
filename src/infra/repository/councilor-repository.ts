import { eq } from "drizzle-orm";
import { Councilor, CouncilorRepository } from "../../domain/repository/councilor-repository";
import { dbError } from "../../shared/errors";
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
        throw dbError(error);
      }
    },
    findAll: async () => {
      try {
        return await db.query.councilors.findMany();
      } catch (error) {
        throw dbError(error);
      }
    },
    findById: async (id: number) => {
      try {
        return await db.query.councilors.findFirst({
          where: { id: { eq: id } },
        });
      } catch (error) {
        throw dbError(error);
      }
    },
    update: async (councilor: Councilor) => {
      try {
        const [updated] = await db.insert(councilors).values(councilor).onConflictDoUpdate({
          target: councilors.id,
          set: {
            ...councilor,
          },
        }).returning();

        return updated;
      } catch (error) {
        throw dbError(error);
      }
    },
    delete: async (id: number) => {
      try {
        await db.delete(councilors).where(eq(councilors.id, id));
      } catch (error) {
        throw dbError(error);
      }
    }
  }
}

export const councilorRepository = createCouncilorRepository(db);
