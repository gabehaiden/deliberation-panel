import Elysia, { t } from "elysia";
import { proposalStatusService } from "../../../application/services/proposal-status-service";

export const ProposalStatusController = new Elysia({ prefix: "/proposal-status" })
  .post("/", async (ctx) => {
    const newType = await proposalStatusService.create(ctx.body);
    return ctx.status(201, newType);
  }, {
    body: t.Object({ description: t.String() })
  })
  .get("/", async (ctx) => {
    const types = await proposalStatusService.findAll();
    return ctx.status(200, types);
  })
  .get("/:id", async (ctx) => {
    const type = await proposalStatusService.findById(Number(ctx.params.id));
    return ctx.status(200, type);
  }, {
    params: t.Object({ id: t.Number() })
  })
  .put("/", async (ctx) => {
    const incoming: { id: number; description?: string } = ctx.body;
    const existing = await proposalStatusService.findById(incoming.id);
    const merged = { ...existing, ...incoming } as any;
    const updated = await proposalStatusService.update(merged);
    return ctx.status(200, updated);
  }, {
    body: t.Object({ id: t.Number(), description: t.String() })
  })
  .delete("/:id", async (ctx) => {
    await proposalStatusService.delete(Number(ctx.params.id));
    return ctx.status(204);
  }, {
    params: t.Object({ id: t.Number() })
  });
