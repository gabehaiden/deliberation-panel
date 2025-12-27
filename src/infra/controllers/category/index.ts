import Elysia, { t } from "elysia";
import { categoryService } from "../../../application/services/category-service";


export const CategoryController = new Elysia({ prefix: "/category" })
  .post("/", async (ctx) => {
    const newCategory = await categoryService.create(ctx.body);

    return ctx.status(201, newCategory);
  }, {
    body: t.Object({
      description: t.String(),
    })
  })
  .get("/", async (ctx) => {
    const categories = await categoryService.findAll();

    return ctx.status(200, categories);
  })
  .get("/:id", async (ctx) => {
    const category = await categoryService.findById(Number(ctx.params.id));

    return ctx.status(200, category);
  }, {
    params: t.Object({
      id: t.Number(),
    })
  })
  .put("/", async (ctx) => {
    const updated = await categoryService.update(ctx.body);

    return ctx.status(200, updated);
  }, {
    body: t.Object({
      id: t.Number(),
      description: t.String(),
    })
  })
  .delete("/:id", async (ctx) => {
    await categoryService.delete(Number(ctx.params.id));

    return ctx.status(204);
  }, {
    params: t.Object({
      id: t.Number(),
    })
  })
