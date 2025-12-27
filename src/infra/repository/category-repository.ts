import { eq } from "drizzle-orm";
import { Category, CategoryRepository } from "../../domain/repository/category-repository";
import db, { Database } from "../db";
import { categories } from "../db/schema";

export function createCategoryRepository(db: Database): CategoryRepository {
  return {
    create: async (newCategory) => {
      try {
        const [category] = await db.insert(categories).values({
          ...newCategory,
        }).returning();

        return category as Category;
      } catch (error) {
        throw error;
      }
    },
    findAll: () => {
      return db.query.categories.findMany();
    },
    findById: (id: number) => {
      return db.query.categories.findFirst({
        where: { id: { eq: id } },
      });
    },
    update: async (category: Category) => {
      const [updatedCategory] = await db.update(categories).set(category).where(
        eq(categories.id, category.id)
      ).returning();

      return updatedCategory;
    },
    delete: async (id: number) => {
      await db.delete(categories).where(eq(categories.id, id));
    }
  }
}

export const categoryRepository = createCategoryRepository(db);
