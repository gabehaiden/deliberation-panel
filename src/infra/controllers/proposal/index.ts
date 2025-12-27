import Elysia, { t } from "elysia";
import { proposalService } from "../../../application/services/proposal-service";

export const ProposalController = new Elysia({ prefix: "/proposal" })
  .post("/", async (ctx) => {
    const newProposal = await proposalService.create(ctx.body);
    return ctx.status(201, newProposal);
  }, {
    body: t.Object({
      title: t.String(),
      description: t.String(),
      authorId: t.Number(),
      statusId: t.Number(),
      categoryId: t.Number(),
      protocol: t.String(),
    })
  })
  .get("/", async (ctx) => {
    const proposals = await proposalService.findAll();
    return ctx.status(200, proposals);
  })
  .get("/:id", async (ctx) => {
    const proposal = await proposalService.findById(Number(ctx.params.id));
    return ctx.status(200, proposal);
  }, {
    params: t.Object({ id: t.Number() })
  })
  .put("/", async (ctx) => {
    const incoming: { id: number; title?: string; description?: string; authorId?: number; statusId?: number; categoryId?: number; protocol?: string } = ctx.body;
    const existing = await proposalService.findById(incoming.id);
    const merged = { ...existing, ...incoming } as any;
    const updated = await proposalService.update(merged);
    return ctx.status(200, updated);
  }, {
    body: t.Object({ id: t.Number(), title: t.String(), description: t.String(), authorId: t.Number(), statusId: t.Number(), categoryId: t.Number(), protocol: t.String() })
  })
  .delete("/:id", async (ctx) => {
    await proposalService.delete(Number(ctx.params.id));
    return ctx.status(204);
  }, {
    params: t.Object({ id: t.Number() })
  });
