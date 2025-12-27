import Elysia, { t } from "elysia";
import { councilorService } from "../../../application/services/councilor-service";

export const CouncilorController = new Elysia({ prefix: "/councilor" })
  .post("/", async (ctx) => {
    const newCouncilor = await councilorService.create(ctx.body);

    return ctx.status(201, newCouncilor);
  }, {
    body: t.Object({
      name: t.String(),
      partyId: t.Number(),
    })
  })
  .get("/", async (ctx) => {
    const councilors = await councilorService.findAll();

    return ctx.status(200, councilors);
  })
  .get("/:id", async (ctx) => {
    const councilor = await councilorService.findById(Number(ctx.params.id));

    return ctx.status(200, councilor);
  }, {
    params: t.Object({
      id: t.Number(),
    })
  })
  .put("/", async (ctx) => {
    const updated = await councilorService.update(ctx.body);

    return ctx.status(200, updated);
  }, {
    body: t.Object({
      id: t.Number(),
      name: t.String(),
      partyId: t.Number(),
    })
  })
  .delete("/:id", async (ctx) => {
    await councilorService.delete(Number(ctx.params.id));

    return ctx.status(204);
  }, {
    params: t.Object({
      id: t.Number(),
    })
  })
