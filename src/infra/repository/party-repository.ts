import { eq } from "drizzle-orm";
import { Party, PartyRepository } from "../../domain/repository/party-repository";
import db, { Database } from "../db";
import { parties } from "../db/schema";

export function createPartyRepository(db: Database): PartyRepository {
  return {
    create: async (newParty) => {
      try {
        const [party] = await db.insert(parties).values({
          ...newParty,
        }).returning();

        return party as Party;
      } catch (error) {
        throw error;
      }

    },
    findAll: () => {
      return db.query.parties.findMany();
    },
    findById: (id: number) => {
      return db.query.parties.findFirst({
        where: { id: { eq: id } },
      });
    },
    update: async (party: Party) => {
      const [updatedParty] = await db.insert(parties).values(party).onConflictDoUpdate({
        target: parties.id,
        set: {
          ...party,
        },
      }).returning();

      return updatedParty;
    },
    delete: async (id: number) => {
      await db.delete(parties).where(eq(parties.id, id));
    }
  }
}

export const partyRepository = createPartyRepository(db);