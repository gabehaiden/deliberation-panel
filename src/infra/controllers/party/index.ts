import Elysia, { t } from "elysia";
import { partyService } from "../../../application/services/party-service";


export const PartyController = new Elysia({ prefix: "/party" })
  .post("/", async (ctx) => {
    const newParty = await partyService.create(ctx.body);

    return ctx.status(201, newParty);
  }, {
    body: t.Object({
      name: t.String(),
      acronym: t.String(),
      code: t.String(),
    })
  })
  .get("/", async (ctx) => {
    const parties = await partyService.findAll();

    return ctx.status(200, parties);
  })
  .get("/:id", async (ctx) => {
    const party = await partyService.findById(Number(ctx.params.id));

    return ctx.status(200, party);
  }, {
    params: t.Object({
      id: t.Number(),
    })
  })
  .put("/", async (ctx) => {
    const incoming: { id: number; name?: string; acronym?: string; code?: string } = ctx.body;
    const existing = await partyService.findById(incoming.id);

    const merged = { ...existing, ...incoming } as any;

    const updated = await partyService.update(merged);

    return ctx.status(200, updated);
  }, {
    body: t.Object({
      id: t.Number(),
      name: t.String(),
      acronym: t.String(),
      code: t.String(),
    })
  })
  .delete("/:id", async (ctx) => {
    await partyService.delete(Number(ctx.params.id));

    return ctx.status(204);
  }, {
    params: t.Object({
      id: t.Number(),
    })
  })