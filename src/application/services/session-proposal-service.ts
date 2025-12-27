import { NotFoundError } from "elysia";
import { NewSessionProposal, SessionProposal, SessionProposalRepository } from "../../domain/repository/session-repository";
import { sessionProposalRepository } from "../../infra/repository/session-proposal-repository";

export function createSessionProposalService(repository: SessionProposalRepository) {
  return {
    create: (newSessionProposal: NewSessionProposal): Promise<SessionProposal> => repository.create(newSessionProposal),
    findAll: (): Promise<SessionProposal[]> => repository.findAll(),
    findById: async (id: number): Promise<SessionProposal> => {
      const sp = await repository.findById(id);
      if (!sp) throw new NotFoundError("Session proposal not found");
      return sp;
    },
    update: async (sessionProposal: SessionProposal): Promise<SessionProposal> => repository.update(sessionProposal),
    delete: async (id: number): Promise<void> => { await repository.delete(id); },
  };
}

export const sessionProposalService = createSessionProposalService(sessionProposalRepository);
