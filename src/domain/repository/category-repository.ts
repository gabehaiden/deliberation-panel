import { categories } from "../../infra/db/schema";

export type NewCategory = typeof categories.$inferInsert;
export type Category = typeof categories.$inferSelect;

export interface CategoryRepository {
  create(newCategory: NewCategory): Promise<Category>;
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category | undefined>;
  update(category: Category): Promise<Category>;
  delete(id: number): Promise<void>;
}
