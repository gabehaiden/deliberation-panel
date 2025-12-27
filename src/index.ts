import { Elysia } from "elysia";
import { CategoryController } from "./infra/controllers/category";
import { CouncilorController } from "./infra/controllers/councilor";
import { PartyController } from "./infra/controllers/party";

const app = new Elysia()
  .use(PartyController)
  .use(CategoryController)
  .use(CouncilorController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
