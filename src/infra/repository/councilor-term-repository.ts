import { eq } from "drizzle-orm";
import { CouncilorTerm, CouncilorTermRepository } from "../../domain/repository/councilor-repository";
import db, { Database } from "../db";
import { councilorTerms } from "../db/schema";

export function createCouncilorTermRepository(db: Database): CouncilorTermRepository {
  return {
    create: async (newTerm) => {
      const [t] = await db.insert(councilorTerms).values({ ...newTerm }).returning();
      return t as CouncilorTerm;
    },
    findAll: () => db.query.councilorTerms.findMany(),
    findById: (id: number) => db.query.councilorTerms.findFirst({ where: { id: { eq: id } } }),
    update: async (term: CouncilorTerm) => {
      const [updated] = await db.update(councilorTerms).set(term).where(eq(councilorTerms.id, term.id)).returning();
      return updated;
    },
    delete: async (id: number) => {
      await db.delete(councilorTerms).where(eq(councilorTerms.id, id));
    }
  }
}

export const councilorTermRepository = createCouncilorTermRepository(db);
