import { Request, Response } from 'express';
import { TCategoryRead } from '../../interfaces/category.interface';
import { readCategoriesService } from '../../services/categories/readCategories.service';

export const readCategoriesController = async (req: Request, res: Response): Promise<Response> => {
  const allCategories: TCategoryRead = await readCategoriesService();
  return res.status(200).json(allCategories);
};
