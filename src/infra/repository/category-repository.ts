import { eq } from "drizzle-orm";
import { Category, CategoryRepository } from "../../domain/repository/category-repository";
import { dbError } from "../../shared/errors";
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
        throw dbError(error);
      }
    },
    findAll: async () => {
      try {
        return await db.query.categories.findMany();
      } catch (error) {
        throw dbError(error);
      }
    },
    findById: async (id: number) => {
      try {
        return await db.query.categories.findFirst({
          where: { id: { eq: id } },
        });
      } catch (error) {
        throw dbError(error);
      }
    },
    update: async (category: Category) => {
      try {
        const [updatedCategory] = await db.insert(categories).values(category).onConflictDoUpdate({
          target: categories.id,
          set: {
            ...category,
          },
        }).returning();

        return updatedCategory;
      } catch (error) {
        throw dbError(error);
      }
    },
    delete: async (id: number) => {
      try {
        await db.delete(categories).where(eq(categories.id, id));
      } catch (error) {
        throw dbError(error);
      }
    }
  }
}

export const categoryRepository = createCategoryRepository(db);
