import { NotFoundError } from "elysia";
import { NewProposal, Proposal, ProposalRepository } from "../../domain/repository/proposal-repository";
import { proposalRepository } from "../../infra/repository/proposal-repository";

export function createProposalService(repository: ProposalRepository) {
  return {
    create: (newProposal: NewProposal): Promise<Proposal> => repository.create(newProposal),
    findAll: (): Promise<Proposal[]> => repository.findAll(),
    findById: async (id: number): Promise<Proposal> => {
      const proposal = await repository.findById(id);
      if (!proposal) throw new NotFoundError("Proposal not found");
      return proposal;
    },
    update: async (proposal: Proposal): Promise<Proposal> => repository.update(proposal),
    delete: async (id: number): Promise<void> => { await repository.delete(id); },
  };
}

export const proposalService = createProposalService(proposalRepository);
