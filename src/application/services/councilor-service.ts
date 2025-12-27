import { NotFoundError } from "elysia";
import { Councilor, CouncilorRepository, NewCouncilor } from "../../domain/repository/councilor-repository";
import { councilorRepository } from "../../infra/repository/councilor-repository";

export function createCouncilorService(repository: CouncilorRepository) {
  return {
    create: (newCouncilor: NewCouncilor): Promise<Councilor> => {
      return repository.create(newCouncilor)
    },
    findAll: (): Promise<Councilor[]> => {
      return repository.findAll();
    },
    findById: async (id: number): Promise<Councilor> => {
      const councilor = await repository.findById(id);

      if (!councilor) throw new NotFoundError('Councilor not found');

      return councilor;
    },
    delete: async (id: number): Promise<void> => {
      await repository.delete(id);
    },
    update: async (councilor: Councilor): Promise<Councilor> => {
      return repository.update(councilor);
    }
  }
}

export const councilorService = createCouncilorService(councilorRepository);
