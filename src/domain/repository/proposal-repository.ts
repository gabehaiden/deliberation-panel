import { proposals, proposalStatus, proprosalStages } from "../../infra/db/schema";

export type NewProposal = typeof proposals.$inferInsert;
export type Proposal = typeof proposals.$inferSelect;

export type NewProposalStatus = typeof proposalStatus.$inferInsert;
export type ProposalStatus = typeof proposalStatus.$inferSelect;

export interface ProposalRepository {
  create(newProposal: NewProposal): Promise<Proposal>;
  findAll(): Promise<Proposal[]>;
  findById(id: number): Promise<Proposal | undefined>;
  update(proposal: Proposal): Promise<Proposal>;
  delete(id: number): Promise<void>;
}

export interface ProposalStatusRepository {
  create(newType: NewProposalStatus): Promise<ProposalStatus>;
  findAll(): Promise<ProposalStatus[]>;
  findById(id: number): Promise<ProposalStatus | undefined>;
  update(type: ProposalStatus): Promise<ProposalStatus>;
  delete(id: number): Promise<void>;
}

export type NewProposalStage = typeof proprosalStages.$inferInsert;
export type ProposalStage = typeof proprosalStages.$inferSelect;

export interface ProposalStageRepository {
  create(newStage: NewProposalStage): Promise<ProposalStage>;
  findAll(): Promise<ProposalStage[]>;
  findById(id: number): Promise<ProposalStage | undefined>;
  update(stage: ProposalStage): Promise<ProposalStage>;
  delete(id: number): Promise<void>;
}
