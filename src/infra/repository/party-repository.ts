import { eq } from "drizzle-orm";
import { Party, PartyRepository } from "../../domain/repository/party-repository";
import { dbError } from "../../shared/errors";
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
        throw dbError(error);
      }

    },
    findAll: async () => {
      try {
        return await db.query.parties.findMany();
      } catch (error) {
        throw dbError(error);
      }
    },
    findById: async (id: number) => {
      try {
        return await db.query.parties.findFirst({
          where: { id: { eq: id } },
        });
      } catch (error) {
        throw dbError(error);
      }
    },
    update: async (party: Party) => {
      try {
        const [updatedParty] = await db.insert(parties).values(party).onConflictDoUpdate({
          target: parties.id,
          set: {
            ...party,
          },
        }).returning();

        return updatedParty;
      } catch (error) {
        throw dbError(error);
      }
    },
    delete: async (id: number) => {
      try {
        await db.delete(parties).where(eq(parties.id, id));
      } catch (error) {
        throw dbError(error);
      }
    }
  }
}

export const partyRepository = createPartyRepository(db);