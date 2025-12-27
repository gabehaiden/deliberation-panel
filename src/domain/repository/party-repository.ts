import { parties } from "../../infra/db/schema";

export type NewParty = typeof parties.$inferInsert;
export type Party = typeof parties.$inferSelect;

export interface PartyRepository {
  create(newParty: NewParty): Promise<Party>;
  findAll(): Promise<Party[]>;
  findById(id: number): Promise<Party | undefined>;
  update(party: Party): Promise<Party>;
  delete(id: number): Promise<void>;
}