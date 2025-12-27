import { councilors, councilorTerms } from "../../infra/db/schema";

export type NewCouncilor = typeof councilors.$inferInsert;
export type Councilor = typeof councilors.$inferSelect;

export interface CouncilorRepository {
  create(newCouncilor: NewCouncilor): Promise<Councilor>;
  findAll(): Promise<Councilor[]>;
  findById(id: number): Promise<Councilor | undefined>;
  update(councilor: Councilor): Promise<Councilor>;
  delete(id: number): Promise<void>;
}

export type NewCouncilorTerm = typeof councilorTerms.$inferInsert;
export type CouncilorTerm = typeof councilorTerms.$inferSelect;

export interface CouncilorTermRepository {
  create(newTerm: NewCouncilorTerm): Promise<CouncilorTerm>;
  findAll(): Promise<CouncilorTerm[]>;
  findById(id: number): Promise<CouncilorTerm | undefined>;
  update(term: CouncilorTerm): Promise<CouncilorTerm>;
  delete(id: number): Promise<void>;
}
