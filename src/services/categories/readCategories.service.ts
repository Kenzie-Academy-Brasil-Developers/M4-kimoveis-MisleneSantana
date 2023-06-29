import { TCategoryRead } from '../../interfaces/category.interface';
import { categoryRepo } from '../../repositories';

export const readCategoriesService = async (): Promise<TCategoryRead> => {
  return await categoryRepo.find();
};
