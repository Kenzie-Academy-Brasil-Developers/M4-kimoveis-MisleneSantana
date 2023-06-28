import { AppDataSource } from '../../data-source';
import { Category } from '../../entities';
import { TCategoryRead, TCategoryRepo } from '../../interfaces/category.interface';

export const readCategoriesService = async (): Promise<TCategoryRead> => {
  const categoryRepo: TCategoryRepo = AppDataSource.getRepository(Category);
  return await categoryRepo.find();
};
