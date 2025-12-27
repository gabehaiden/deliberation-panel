import Elysia, { t } from "elysia";
import { sessionService } from "../../../application/services/session-service";

export const SessionController = new Elysia({ prefix: "/session" })
  .post("/", async (ctx) => {
    const body: any = ctx.body;
    // coerce ISO strings to Date to match DB types
    const payload = {
      ...body,
      startedAt: body.startedAt ? new Date(body.startedAt) : undefined,
      finishedAt: body.finishedAt ? new Date(body.finishedAt) : undefined,
    };

    const newSession = await sessionService.create(payload as any);

    return ctx.status(201, newSession);
  }, {
    body: t.Object({
      presidentId: t.Number(),
      sessionType: t.Number(),
      notes: t.Optional(t.String()),
      startedAt: t.String(),
      finishedAt: t.Optional(t.String()),
    })
  })
  .get("/", async (ctx) => {
    const sessions = await sessionService.findAll();
    return ctx.status(200, sessions);
  })
  .get("/:id", async (ctx) => {
    const session = await sessionService.findById(Number(ctx.params.id));
    return ctx.status(200, session);
  }, {
    params: t.Object({ id: t.Number() })
  })
  .put("/", async (ctx) => {
    const incoming: { id: number; presidentId?: number; sessionType?: number; notes?: string; startedAt?: string; finishedAt?: string } = ctx.body;
    const existing = await sessionService.findById(incoming.id);
    const merged = { ...existing, ...incoming } as any;
    const updated = await sessionService.update(merged);
    return ctx.status(200, updated);
  }, {
    body: t.Object({
      id: t.Number(),
      presidentId: t.Optional(t.Number()),
      sessionType: t.Optional(t.Number()),
      notes: t.Optional(t.String()),
      startedAt: t.Optional(t.String()),
      finishedAt: t.Optional(t.String()),
    })
  })
  .delete("/:id", async (ctx) => {
    await sessionService.delete(Number(ctx.params.id));
    return ctx.status(204);
  }, {
    params: t.Object({ id: t.Number() })
  });
