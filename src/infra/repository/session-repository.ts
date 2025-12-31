import { eq } from "drizzle-orm";
import { Session, SessionRepository } from "../../domain/repository/session-repository";
import { dbError } from "../../shared/errors";
import db, { Database } from "../db";
import { sessions } from "../db/schema";

export function createSessionRepository(db: Database): SessionRepository {
  return {
    create: async (newSession) => {
      try {
        const [session] = await db.insert(sessions).values({ ...newSession }).returning();
        return session as Session;
      } catch (error) {
        throw dbError(error);
      }
    },
    findAll: async () => {
      try {
        return await db.query.sessions.findMany();
      } catch (error) {
        throw dbError(error);
      }
    },
    findById: async (id: number) => {
      try {
        return await db.query.sessions.findFirst({ where: { id: { eq: id } } });
      } catch (error) {
        throw dbError(error);
      }
    },
    update: async (session: Session) => {
      try {
        const [updated] = await db.insert(sessions).values(session).onConflictDoUpdate({
          target: sessions.id,
          set: {
            ...session,
          },
        }).returning();

        return updated;
      } catch (error) {
        throw dbError(error);
      }
    },
    delete: async (id: number) => {
      try {
        await db.delete(sessions).where(eq(sessions.id, id));
      } catch (error) {
        throw dbError(error);
      }
    }
  }
}

export const sessionRepository = createSessionRepository(db);
