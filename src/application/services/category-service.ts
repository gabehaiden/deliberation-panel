import { NotFoundError } from "elysia";
import { Category, CategoryRepository, NewCategory } from "../../domain/repository/category-repository";
import { categoryRepository } from "../../infra/repository/category-repository";

export function createCategoryService(repository: CategoryRepository) {
  return {
    create: (newCategory: NewCategory): Promise<Category> => {
      return repository.create(newCategory)
    },
    findAll: (): Promise<Category[]> => {
      return repository.findAll();
    },
    findById: async (id: number): Promise<Category> => {
      const category = await repository.findById(id);

      if (!category) throw new NotFoundError('Category not found');

      return category;
    },
    delete: async (id: number): Promise<void> => {
      await repository.delete(id);
    },
    update: async (category: Category): Promise<Category> => {
      return repository.update(category);
    }
  }
}

export const categoryService = createCategoryService(categoryRepository);
