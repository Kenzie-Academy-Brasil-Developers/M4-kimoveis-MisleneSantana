import { AppDataSource } from '../../data-source';
import { RealEstate } from '../../entities/index';
import { TRealEstateRead, TRealEstateRepo } from '../../interfaces/realEstate.interface';

export const readAllRealEstateService = async (): Promise<TRealEstateRead> => {
  const realEstateRepo: TRealEstateRepo = AppDataSource.getRepository(RealEstate);
  return await realEstateRepo.find({ relations: { address: true } });
};
