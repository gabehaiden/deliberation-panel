import { NotFoundError } from "elysia";
import { NewProposalStage, ProposalStage, ProposalStageRepository } from "../../domain/repository/proposal-repository";
import { proposalStageRepository } from "../../infra/repository/proposal-stage-repository";

export function createProposalStageService(repository: ProposalStageRepository) {
  return {
    create: (newStage: NewProposalStage): Promise<ProposalStage> => repository.create(newStage),
    findAll: (): Promise<ProposalStage[]> => repository.findAll(),
    findById: async (id: number): Promise<ProposalStage> => {
      const stage = await repository.findById(id);
      if (!stage) throw new NotFoundError("Proposal stage not found");
      return stage;
    },
    update: async (stage: ProposalStage): Promise<ProposalStage> => repository.update(stage),
    delete: async (id: number): Promise<void> => { await repository.delete(id); },
  };
}

export const proposalStageService = createProposalStageService(proposalStageRepository);
