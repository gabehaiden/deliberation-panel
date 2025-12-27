import { Elysia } from "elysia";
import { CouncilorController } from "./infra/controllers/councilor";
import { PartyController } from "./infra/controllers/party";
import { ProposalController } from "./infra/controllers/proposal";
import { ProposalCategoryController } from "./infra/controllers/proposal-category";
import { ProposalStatusController } from "./infra/controllers/proposal-status";
import { SessionController } from "./infra/controllers/session";
import { SessionTypeController } from "./infra/controllers/session-type";

const app = new Elysia()
  .use(PartyController)
  .use(ProposalCategoryController)
  .use(ProposalController)
  .use(ProposalStatusController)
  .use(SessionController)
  .use(SessionTypeController)
  .use(CouncilorController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
