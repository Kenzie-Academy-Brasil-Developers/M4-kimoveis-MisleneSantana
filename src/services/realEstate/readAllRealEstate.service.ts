import { TRealEstateRead } from '../../interfaces/realEstate.interface';
import { realEstateRepo } from '../../repositories';

export const readAllRealEstateService = async (): Promise<TRealEstateRead> => {
  return await realEstateRepo.find({ relations: { address: true } });
};
