import { NotFoundError } from "elysia";
import { NewProposalStatus, ProposalStatus, ProposalStatusRepository } from "../../domain/repository/proposal-repository";
import { proposalStatusRepository } from "../../infra/repository/proposal-status-repository";

export function createProposalStatusService(repository: ProposalStatusRepository) {
  return {
    create: (newType: NewProposalStatus): Promise<ProposalStatus> => repository.create(newType),
    findAll: (): Promise<ProposalStatus[]> => repository.findAll(),
    findById: async (id: number): Promise<ProposalStatus> => {
      const type = await repository.findById(id);
      if (!type) throw new NotFoundError("Proposal status not found");
      return type;
    },
    update: async (type: ProposalStatus): Promise<ProposalStatus> => repository.update(type),
    delete: async (id: number): Promise<void> => { await repository.delete(id); },
  };
}

export const proposalStatusService = createProposalStatusService(proposalStatusRepository);
