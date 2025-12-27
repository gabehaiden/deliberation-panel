import { NotFoundError } from "elysia";
import { CouncilorTerm, CouncilorTermRepository, NewCouncilorTerm } from "../../domain/repository/councilor-repository";
import { councilorTermRepository } from "../../infra/repository/councilor-term-repository";

export function createCouncilorTermService(repository: CouncilorTermRepository) {
  return {
    create: (newTerm: NewCouncilorTerm): Promise<CouncilorTerm> => repository.create(newTerm),
    findAll: (): Promise<CouncilorTerm[]> => repository.findAll(),
    findById: async (id: number): Promise<CouncilorTerm> => {
      const term = await repository.findById(id);
      if (!term) throw new NotFoundError("Councilor term not found");
      return term;
    },
    update: async (term: CouncilorTerm): Promise<CouncilorTerm> => repository.update(term),
    delete: async (id: number): Promise<void> => { await repository.delete(id); },
  };
}

export const councilorTermService = createCouncilorTermService(councilorTermRepository);
