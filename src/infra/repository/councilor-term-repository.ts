import { eq } from "drizzle-orm";
import { CouncilorTerm, CouncilorTermRepository } from "../../domain/repository/councilor-repository";
import { dbError } from "../../shared/errors";
import db, { Database } from "../db";
import { councilorTerms } from "../db/schema";

export function createCouncilorTermRepository(db: Database): CouncilorTermRepository {
  return {
    create: async (newTerm) => {
      try {
        const [t] = await db.insert(councilorTerms).values({ ...newTerm }).returning();
        return t as CouncilorTerm;
      } catch (error) {
        throw dbError(error);
      }
    },
    findAll: async () => {
      try {
        return await db.query.councilorTerms.findMany();
      } catch (error) {
        throw dbError(error);
      }
    },
    findById: async (id: number) => {
      try {
        return await db.query.councilorTerms.findFirst({ where: { id: { eq: id } } });
      } catch (error) {
        throw dbError(error);
      }
    },
    update: async (term: CouncilorTerm) => {
      try {
        const [updated] = await db.insert(councilorTerms).values(term).onConflictDoUpdate({
          target: councilorTerms.id,
          set: {
            ...term,
          },
        }).returning();

        return updated;
      } catch (error) {
        throw dbError(error);
      }
    },
    delete: async (id: number) => {
      try {
        await db.delete(councilorTerms).where(eq(councilorTerms.id, id));
      } catch (error) {
        throw dbError(error);
      }
    }
  }
}

export const councilorTermRepository = createCouncilorTermRepository(db);
