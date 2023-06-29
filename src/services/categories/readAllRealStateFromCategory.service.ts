import { Category, RealEstate } from '../../entities/index';
import { AppDataSource } from '../../data-source';
import { TCategoryRepo } from '../../interfaces/category.interface';
import { AppError } from '../../errors/error';

export const readAllRealStateFromCategoryService = async (categoryId: number): Promise<RealEstate | null> => {
  const categoryRepo: TCategoryRepo = AppDataSource.getRepository(Category);
  const categoryEstate: any = await categoryRepo.findOne({
    where: { id: categoryId },
    relations: { realEstate: true },
  });

  if (!categoryEstate) throw new AppError('Category not found', 404);

  return categoryEstate;
};
