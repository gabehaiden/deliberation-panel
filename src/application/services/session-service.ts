import { NotFoundError } from "elysia";
import {
  NewSession,
  Session,
  SessionRepository,
} from "../../domain/repository/session-repository";
import { sessionRepository } from "../../infra/repository/session-repository";

export function createSessionService(repository: SessionRepository) {
  return {
    create: (newSession: NewSession): Promise<Session> => repository.create(newSession),
    findAll: (): Promise<Session[]> => repository.findAll(),
    findById: async (id: number): Promise<Session> => {
      const session = await repository.findById(id);
      if (!session) throw new NotFoundError("Session not found");
      return session;
    },
    update: async (session: Session): Promise<Session> => repository.update(session),
    delete: async (id: number): Promise<void> => { await repository.delete(id); },
  };
}

export const sessionService = createSessionService(sessionRepository);
