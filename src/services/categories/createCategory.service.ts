import { AppDataSource } from '../../data-source';
import { Category } from '../../entities/index';
import { TCategoryCreate, TCategoryRepo } from '../../interfaces/category.interface';

export const createCategoryService = async (categoryData: TCategoryCreate): Promise<Category> => {
  const categoryRepo: TCategoryRepo = AppDataSource.getRepository(Category);
  const category: Category = categoryRepo.create(categoryData);
  await categoryRepo.save(category);

  return category;
};
