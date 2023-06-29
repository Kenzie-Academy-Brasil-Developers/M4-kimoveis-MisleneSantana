import { RealEstate } from '../../entities/index';
import { AppError } from '../../errors/error';
import { categoryRepo } from '../../repositories';

export const readAllRealStateFromCategoryService = async (categoryId: number): Promise<RealEstate | null> => {
  const categoryEstate: any = await categoryRepo.findOne({
    where: { id: categoryId },
    relations: { realEstate: true },
  });

  if (!categoryEstate) throw new AppError('Category not found', 404);

  return categoryEstate;
};
