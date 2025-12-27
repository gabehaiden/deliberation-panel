import Elysia, { t } from "elysia";
import { councilorTermService } from "../../../application/services/councilor-term-service";

export const CouncilorTermController = new Elysia({ prefix: "/councilor-term" })
  .post("/", async (ctx) => {
    const newTerm = await councilorTermService.create(ctx.body);
    return ctx.status(201, newTerm);
  }, {
    body: t.Object({ councilorId: t.Number(), termStart: t.String(), termEnd: t.String() })
  })
  .get("/", async (ctx) => {
    const list = await councilorTermService.findAll();
    return ctx.status(200, list);
  })
  .get("/:id", async (ctx) => {
    const term = await councilorTermService.findById(Number(ctx.params.id));
    return ctx.status(200, term);
  }, {
    params: t.Object({ id: t.Number() })
  })
  .put("/", async (ctx) => {
    const incoming: { id: number; councilorId?: number; termStart?: string; termEnd?: string } = ctx.body;
    const existing = await councilorTermService.findById(incoming.id);
    const merged = { ...existing, ...incoming } as any;
    const updated = await councilorTermService.update(merged);
    return ctx.status(200, updated);
  }, {
    body: t.Object({ id: t.Number(), councilorId: t.Number(), termStart: t.String(), termEnd: t.String() })
  })
  .delete("/:id", async (ctx) => {
    await councilorTermService.delete(Number(ctx.params.id));
    return ctx.status(204);
  }, {
    params: t.Object({ id: t.Number() })
  });
