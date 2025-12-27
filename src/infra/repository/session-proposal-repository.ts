import { eq } from "drizzle-orm";
import { SessionProposal, SessionProposalRepository } from "../../domain/repository/session-repository";
import db, { Database } from "../db";
import { sessionProposals } from "../db/schema";

export function createSessionProposalRepository(db: Database): SessionProposalRepository {
  return {
    create: async (newSessionProposal) => {
      const [sp] = await db.insert(sessionProposals).values({ ...newSessionProposal }).returning();
      return sp as SessionProposal;
    },
    findAll: () => db.query.sessionProposals.findMany(),
    findById: (id: number) => db.query.sessionProposals.findFirst({ where: { id: { eq: id } } }),
    update: async (sessionProposal: SessionProposal) => {
      const [updated] = await db.insert(sessionProposals).values(sessionProposal).onConflictDoUpdate({
        target: sessionProposals.id,
        set: {
          ...sessionProposal,
        },
      }).returning();

      return updated;
    },
    delete: async (id: number) => {
      await db.delete(sessionProposals).where(eq(sessionProposals.id, id));
    }
  }
}

export const sessionProposalRepository = createSessionProposalRepository(db);
