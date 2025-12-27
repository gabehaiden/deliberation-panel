import { councilors } from "../../infra/db/schema";

export type NewCouncilor = typeof councilors.$inferInsert;
export type Councilor = typeof councilors.$inferSelect;

export interface CouncilorRepository {
  create(newCouncilor: NewCouncilor): Promise<Councilor>;
  findAll(): Promise<Councilor[]>;
  findById(id: number): Promise<Councilor | undefined>;
  update(councilor: Councilor): Promise<Councilor>;
  delete(id: number): Promise<void>;
}
