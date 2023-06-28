import { AppDataSource } from '../../data-source';
import { Address, Category, RealEstate } from '../../entities';
import { AppError } from '../../errors/error';
import { TAddressCreate, TAddressRepo } from '../../interfaces/address.schema';
import { TCategoryRepo } from '../../interfaces/category.interface';
import { TRealEstateCreate, TRealEstateRepo } from '../../interfaces/realEstate.interface';

export const createRealEstateService = async ({
  address,
  categoryId,
  ...realEstateData
}: TRealEstateCreate): Promise<RealEstate> => {
  const addressRepo: TAddressRepo = AppDataSource.getRepository(Address);
  const realEstateAddress: TAddressCreate = await addressRepo.save(address);

  const categoryRepo: TCategoryRepo = AppDataSource.getRepository(Category);
  const foundCategory: Category | null = await categoryRepo.findOneBy({ id: categoryId });

  if (!foundCategory) throw new AppError('Category not found', 404);

  const realEstateRepo: TRealEstateRepo = AppDataSource.getRepository(RealEstate);
  const realEstate: RealEstate = realEstateRepo.create({
    ...realEstateData,
    address: realEstateAddress,
    category: foundCategory,
  });

  await realEstateRepo.save(realEstate);

  return realEstate;
};
