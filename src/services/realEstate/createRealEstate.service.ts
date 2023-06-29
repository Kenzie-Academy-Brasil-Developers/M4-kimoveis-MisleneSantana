import { Category, RealEstate } from '../../entities';
import { AppError } from '../../errors/error';
import { TAddressCreate } from '../../interfaces/address.interface';
import { TRealEstateCreate } from '../../interfaces/realEstate.interface';
import { addressRepo, categoryRepo, realEstateRepo } from '../../repositories';

export const createRealEstateService = async ({
  address,
  categoryId,
  ...realEstateData
}: TRealEstateCreate): Promise<RealEstate> => {
  const realEstateAddress: TAddressCreate = await addressRepo.save(address);

  const foundCategory: Category | null = await categoryRepo.findOneBy({ id: categoryId });
  if (!foundCategory) throw new AppError('Category not found', 404);

  const realEstate: RealEstate = realEstateRepo.create({
    ...realEstateData,
    address: realEstateAddress,
    category: foundCategory,
  });

  await realEstateRepo.save(realEstate);

  return realEstate;
};
