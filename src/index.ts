import { Elysia } from "elysia";
import { CategoryController } from "./infra/controllers/category";
import { CouncilorController } from "./infra/controllers/councilor";
import { PartyController } from "./infra/controllers/party";
import { SessionController } from "./infra/controllers/session";
import { SessionTypeController } from "./infra/controllers/session-type";

const app = new Elysia()
  .use(PartyController)
  .use(CategoryController)
  .use(SessionController)
  .use(SessionTypeController)
  .use(CouncilorController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
