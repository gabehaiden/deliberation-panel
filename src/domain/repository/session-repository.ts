import { proposalVotes, sessionProposals, sessions, sessionTypes } from "../../infra/db/schema";

export type NewSession = typeof sessions.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSessionType = typeof sessionTypes.$inferInsert;
export type SessionType = typeof sessionTypes.$inferSelect;

export type NewSessionProposal = typeof sessionProposals.$inferInsert;
export type SessionProposal = typeof sessionProposals.$inferSelect;
export type NewProposalVote = typeof proposalVotes.$inferInsert;
export type ProposalVote = typeof proposalVotes.$inferSelect;
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

export interface SessionProposalRepository {
  create(newSessionProposal: NewSessionProposal): Promise<SessionProposal>;
  findAll(): Promise<SessionProposal[]>;
  findById(id: number): Promise<SessionProposal | undefined>;
  update(sessionProposal: SessionProposal): Promise<SessionProposal>;
  delete(id: number): Promise<void>;
}

export interface ProposalVoteRepository {
  create(newVote: NewProposalVote): Promise<ProposalVote>;
  findAll(): Promise<ProposalVote[]>;
  findById(id: number): Promise<ProposalVote | undefined>;
  update(vote: ProposalVote): Promise<ProposalVote>;
  delete(id: number): Promise<void>;
}
