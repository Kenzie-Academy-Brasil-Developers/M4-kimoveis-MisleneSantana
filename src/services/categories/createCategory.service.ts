import { Category } from '../../entities/index';
import { TCategoryCreate } from '../../interfaces/category.interface';
import { categoryRepo } from '../../repositories';

export const createCategoryService = async (categoryData: TCategoryCreate): Promise<Category> => {
  const category: Category = categoryRepo.create(categoryData);
  await categoryRepo.save(category);

  return category;
};
