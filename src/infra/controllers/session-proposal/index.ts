import Elysia, { t } from "elysia";
import { sessionProposalService } from "../../../application/services/session-proposal-service";

export const SessionProposalController = new Elysia({ prefix: "/session-proposal" })
  .post("/", async (ctx) => {
    const newSp = await sessionProposalService.create(ctx.body);
    return ctx.status(201, newSp);
  }, {
    body: t.Object({ sessionId: t.Number(), proposalId: t.Number(), stageId: t.Number(), order: t.Number(), notes: t.Optional(t.String()) })
  })
  .get("/", async (ctx) => {
    const list = await sessionProposalService.findAll();
    return ctx.status(200, list);
  })
  .get("/:id", async (ctx) => {
    const sp = await sessionProposalService.findById(Number(ctx.params.id));
    return ctx.status(200, sp);
  }, {
    params: t.Object({ id: t.Number() })
  })
  .put("/", async (ctx) => {
    const incoming: { id: number; sessionId?: number; proposalId?: number; stageId?: number; order?: number; notes?: string } = ctx.body;
    const existing = await sessionProposalService.findById(incoming.id);
    const merged = { ...existing, ...incoming } as any;
    const updated = await sessionProposalService.update(merged);
    return ctx.status(200, updated);
  }, {
    body: t.Object({ id: t.Number(), sessionId: t.Number(), proposalId: t.Number(), stageId: t.Number(), order: t.Number(), notes: t.Optional(t.String()) })
  })
  .delete("/:id", async (ctx) => {
    await sessionProposalService.delete(Number(ctx.params.id));
    return ctx.status(204);
  }, {
    params: t.Object({ id: t.Number() })
  });
