import { Repository } from 'typeorm';
import { RealEstate } from '../../entities/index';
import { AppDataSource } from '../../data-source';

export const readAllRealStateFromCategoryService = async (categoryId: number): Promise<RealEstate | null> => {
  const propertyRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
  const property: RealEstate | null = await propertyRepo.findOneBy({ id: categoryId });
  return property;
};
