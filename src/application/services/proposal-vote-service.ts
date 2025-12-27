import { NotFoundError } from "elysia";
import { NewProposalVote, ProposalVote, ProposalVoteRepository } from "../../domain/repository/session-repository";
import { proposalVoteRepository } from "../../infra/repository/proposal-vote-repository";

export function createProposalVoteService(repository: ProposalVoteRepository) {
  return {
    create: (newVote: NewProposalVote): Promise<ProposalVote> => repository.create(newVote),
    findAll: (): Promise<ProposalVote[]> => repository.findAll(),
    findById: async (id: number): Promise<ProposalVote> => {
      const vote = await repository.findById(id);
      if (!vote) throw new NotFoundError("Proposal vote not found");
      return vote;
    },
    update: async (vote: ProposalVote): Promise<ProposalVote> => repository.update(vote),
    delete: async (id: number): Promise<void> => { await repository.delete(id); },
  };
}

export const proposalVoteService = createProposalVoteService(proposalVoteRepository);
