import { eq } from "drizzle-orm";
import { SessionType, SessionTypeRepository } from "../../domain/repository/session-repository";
import db, { Database } from "../db";
import { sessionTypes } from "../db/schema";

export function createSessionTypeRepository(db: Database): SessionTypeRepository {
  return {
    create: async (newType) => {
      const [type] = await db.insert(sessionTypes).values({ ...newType }).returning();
      return type as SessionType;
    },
    findAll: () => db.query.sessionTypes.findMany(),
    findById: (id: number) => db.query.sessionTypes.findFirst({ where: { id: { eq: id } } }),
    update: async (type: SessionType) => {
      const [updated] = await db.update(sessionTypes).set(type).where(eq(sessionTypes.id, type.id)).returning();
      return updated;
    },
    delete: async (id: number) => {
      await db.delete(sessionTypes).where(eq(sessionTypes.id, id));
    }
  }
}

export const sessionTypeRepository = createSessionTypeRepository(db);
