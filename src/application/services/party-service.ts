import { NotFoundError } from "elysia";
import { NewParty, Party, PartyRepository } from "../../domain/repository/party-repository";
import { partyRepository } from "../../infra/repository/party-repository";

export function createPartyService(repository: PartyRepository) {
  return {
    create: (newParty: NewParty): Promise<Party> => {
      return repository.create(newParty)
    },
    findAll: (): Promise<Party[]> => {
      return repository.findAll();
    },
    findById: async (id: number): Promise<Party> => {
      const party = await repository.findById(id);

      if (!party) throw new NotFoundError('Party not found');

      return party;
    },
    delete: async (id: number): Promise<void> => {
      await repository.delete(id);
    },
    update: async (party: Party): Promise<Party> => {
      return repository.update(party);
    }
  }
}

export const partyService = createPartyService(partyRepository);