import { eq } from "drizzle-orm";
import { SessionProposal, SessionProposalRepository } from "../../domain/repository/session-repository";
import { dbError } from "../../shared/errors";
import db, { Database } from "../db";
import { sessionProposals } from "../db/schema";

export function createSessionProposalRepository(db: Database): SessionProposalRepository {
  return {
    create: async (newSessionProposal) => {
      try {
        const [sp] = await db.insert(sessionProposals).values({ ...newSessionProposal }).returning();
        return sp as SessionProposal;
      } catch (error) {
        throw dbError(error);
      }
    },
    findAll: async () => {
      try {
        return await db.query.sessionProposals.findMany();
      } catch (error) {
        throw dbError(error);
      }
    },
    findById: async (id: number) => {
      try {
        return await db.query.sessionProposals.findFirst({ where: { id: { eq: id } } });
      } catch (error) {
        throw dbError(error);
      }
    },
    update: async (sessionProposal: SessionProposal) => {
      try {
        const [updated] = await db.insert(sessionProposals).values(sessionProposal).onConflictDoUpdate({
          target: sessionProposals.id,
          set: {
            ...sessionProposal,
          },
        }).returning();

        return updated;
      } catch (error) {
        throw dbError(error);
      }
    },
    delete: async (id: number) => {
      try {
        await db.delete(sessionProposals).where(eq(sessionProposals.id, id));
      } catch (error) {
        throw dbError(error);
      }
    }
  }
}

export const sessionProposalRepository = createSessionProposalRepository(db);
