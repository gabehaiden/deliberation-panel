import Elysia, { t } from "elysia";
import { proposalVoteService } from "../../../application/services/proposal-vote-service";

export const ProposalVoteController = new Elysia({ prefix: "/proposal-vote" })
  .post("/", async (ctx) => {
    const newVote = await proposalVoteService.create(ctx.body);
    return ctx.status(201, newVote);
  }, {
    body: t.Object({ sessionProposalId: t.Number(), councilorId: t.Number(), vote: t.String(), notes: t.Optional(t.String()) })
  })
  .get("/", async (ctx) => {
    const list = await proposalVoteService.findAll();
    return ctx.status(200, list);
  })
  .get("/:id", async (ctx) => {
    const v = await proposalVoteService.findById(Number(ctx.params.id));
    return ctx.status(200, v);
  }, {
    params: t.Object({ id: t.Number() })
  })
  .put("/", async (ctx) => {
    const incoming: { id: number; sessionProposalId?: number; councilorId?: number; vote?: string; notes?: string } = ctx.body;
    const existing = await proposalVoteService.findById(incoming.id);
    const merged = { ...existing, ...incoming } as any;
    const updated = await proposalVoteService.update(merged);
    return ctx.status(200, updated);
  }, {
    body: t.Object({ id: t.Number(), sessionProposalId: t.Number(), councilorId: t.Number(), vote: t.String(), notes: t.Optional(t.String()) })
  })
  .delete("/:id", async (ctx) => {
    await proposalVoteService.delete(Number(ctx.params.id));
    return ctx.status(204);
  }, {
    params: t.Object({ id: t.Number() })
  });
