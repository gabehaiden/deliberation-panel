import { sessions, sessionTypes } from "../../infra/db/schema";

export type NewSession = typeof sessions.$inferInsert;
export type Session = typeof sessions.$inferSelect;

export type NewSessionType = typeof sessionTypes.$inferInsert;
export type SessionType = typeof sessionTypes.$inferSelect;

export interface SessionRepository {
  create(newSession: NewSession): Promise<Session>;
  findAll(): Promise<Session[]>;
  findById(id: number): Promise<Session | undefined>;
  update(session: Session): Promise<Session>;
  delete(id: number): Promise<void>;
}

export interface SessionTypeRepository {
  create(newType: NewSessionType): Promise<SessionType>;
  findAll(): Promise<SessionType[]>;
  findById(id: number): Promise<SessionType | undefined>;
  update(type: SessionType): Promise<SessionType>;
  delete(id: number): Promise<void>;
}
