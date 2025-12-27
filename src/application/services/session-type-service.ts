import { NotFoundError } from "elysia";
import { NewSessionType, SessionType, SessionTypeRepository } from "../../domain/repository/session-repository";
import { sessionTypeRepository } from "../../infra/repository/session-type-repository";

export function createSessionTypeService(repository: SessionTypeRepository) {
  return {
    create: (newType: NewSessionType): Promise<SessionType> => repository.create(newType),
    findAll: (): Promise<SessionType[]> => repository.findAll(),
    findById: async (id: number): Promise<SessionType> => {
      const type = await repository.findById(id);
      if (!type) throw new NotFoundError("Session type not found");
      return type;
    },
    update: async (type: SessionType): Promise<SessionType> => repository.update(type),
    delete: async (id: number): Promise<void> => { await repository.delete(id); },
  };
}

export const sessionTypeService = createSessionTypeService(sessionTypeRepository);
