import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { CouncilorController } from "./infra/controllers/councilor";
import { CouncilorTermController } from "./infra/controllers/councilor-term";
import { PartyController } from "./infra/controllers/party";
import { ProposalController } from "./infra/controllers/proposal";
import { ProposalCategoryController } from "./infra/controllers/proposal-category";
import { ProposalStageController } from "./infra/controllers/proposal-stage";
import { ProposalStatusController } from "./infra/controllers/proposal-status";
import { ProposalVoteController } from "./infra/controllers/proposal-vote";
import { SessionController } from "./infra/controllers/session";
import { SessionProposalController } from "./infra/controllers/session-proposal";
import { SessionTypeController } from "./infra/controllers/session-type";
import { DatabaseException } from "./shared/errors/db";

const app = new Elysia()
  .onError(({ error, status }) => {
    if (error instanceof DatabaseException) {
      return status(error.status, error.message);
    }
    return status(500, "Internal Server Error");
  })
  .use(openapi())
  .use(cors({ origin: ['*'] }))
  .use(
    jwt({
      secret: process.env.JWT_SECRET!
    })
  )
  .use(PartyController)
  .use(ProposalCategoryController)
  .use(ProposalController)
  .use(ProposalStatusController)
  .use(ProposalStageController)
  .use(SessionProposalController)
  .use(ProposalVoteController)
  .use(SessionController)
  .use(SessionTypeController)
  .use(CouncilorTermController)
  .use(CouncilorController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
