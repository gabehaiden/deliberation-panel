import Elysia, { t } from "elysia";
import { proposalStageService } from "../../../application/services/proposal-stage-service";

export const ProposalStageController = new Elysia({ prefix: "/proposal-stage" })
  .post("/", async (ctx) => {
    const newStage = await proposalStageService.create(ctx.body);
    return ctx.status(201, newStage);
  }, {
    body: t.Object({ description: t.String() })
  })
  .get("/", async (ctx) => {
    const list = await proposalStageService.findAll();
    return ctx.status(200, list);
  })
  .get("/:id", async (ctx) => {
    const stage = await proposalStageService.findById(Number(ctx.params.id));
    return ctx.status(200, stage);
  }, {
    params: t.Object({ id: t.Number() })
  })
  .put("/", async (ctx) => {
    const incoming: { id: number; description?: string } = ctx.body;
    const existing = await proposalStageService.findById(incoming.id);
    const merged = { ...existing, ...incoming } as any;
    const updated = await proposalStageService.update(merged);
    return ctx.status(200, updated);
  }, {
    body: t.Object({ id: t.Number(), description: t.String() })
  })
  .delete("/:id", async (ctx) => {
    await proposalStageService.delete(Number(ctx.params.id));
    return ctx.status(204);
  }, {
    params: t.Object({ id: t.Number() })
  });
