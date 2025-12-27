import { eq } from "drizzle-orm";
import { Session, SessionRepository } from "../../domain/repository/session-repository";
import db, { Database } from "../db";
import { sessions } from "../db/schema";

export function createSessionRepository(db: Database): SessionRepository {
  return {
    create: async (newSession) => {
      const [session] = await db.insert(sessions).values({ ...newSession }).returning();
      return session as Session;
    },
    findAll: () => db.query.sessions.findMany(),
    findById: (id: number) => db.query.sessions.findFirst({ where: { id: { eq: id } } }),
    update: async (session: Session) => {
      const [updated] = await db.insert(sessions).values(session).onConflictDoUpdate({
        target: sessions.id,
        set: {
          ...session,
        },
      }).returning();

      return updated;
    },
    delete: async (id: number) => {
      await db.delete(sessions).where(eq(sessions.id, id));
    }
  }
}

export const sessionRepository = createSessionRepository(db);
