import { eq } from "drizzle-orm";
import { SessionType, SessionTypeRepository } from "../../domain/repository/session-repository";
import { dbError } from "../../shared/errors";
import db, { Database } from "../db";
import { sessionTypes } from "../db/schema";

export function createSessionTypeRepository(db: Database): SessionTypeRepository {
  return {
    create: async (newType) => {
      try {
        const [type] = await db.insert(sessionTypes).values({ ...newType }).returning();
        return type as SessionType;
      } catch (error) {
        throw dbError(error);
      }
    },
    findAll: async () => {
      try {
        return await db.query.sessionTypes.findMany();
      } catch (error) {
        throw dbError(error);
      }
    },
    findById: async (id: number) => {
      try {
        return await db.query.sessionTypes.findFirst({ where: { id: { eq: id } } });
      } catch (error) {
        throw dbError(error);
      }
    },
    update: async (type: SessionType) => {
      try {
        const [updated] = await db.insert(sessionTypes).values(type).onConflictDoUpdate({
          target: sessionTypes.id,
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
        await db.delete(sessionTypes).where(eq(sessionTypes.id, id));
      } catch (error) {
        throw dbError(error);
      }
    }
  }
}

export const sessionTypeRepository = createSessionTypeRepository(db);
