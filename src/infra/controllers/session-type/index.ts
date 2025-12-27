import Elysia, { t } from "elysia";
import { sessionTypeService } from "../../../application/services/session-type-service";

export const SessionTypeController = new Elysia({ prefix: "/session-type" })
  .post("/", async (ctx) => {
    const newType = await sessionTypeService.create(ctx.body);
    return ctx.status(201, newType);
  }, {
    body: t.Object({ description: t.String() })
  })
  .get("/", async (ctx) => {
    const types = await sessionTypeService.findAll();
    return ctx.status(200, types);
  })
  .get("/:id", async (ctx) => {
    const type = await sessionTypeService.findById(Number(ctx.params.id));
    return ctx.status(200, type);
  }, {
    params: t.Object({ id: t.Number() })
  })
  .put("/", async (ctx) => {
    const incoming: { id: number; description?: string } = ctx.body;
    const existing = await sessionTypeService.findById(incoming.id);
    const merged = { ...existing, ...incoming } as any;
    const updated = await sessionTypeService.update(merged);
    return ctx.status(200, updated);
  }, {
    body: t.Object({ id: t.Number(), description: t.String() })
  })
  .delete("/:id", async (ctx) => {
    await sessionTypeService.delete(Number(ctx.params.id));
    return ctx.status(204);
  }, {
    params: t.Object({ id: t.Number() })
  });
