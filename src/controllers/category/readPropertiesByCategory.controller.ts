import { Request, Response } from 'express';
import { readAllRealStateFromCategoryService } from '../../services/categories/readAllRealStateFromCategory.service';

export const readAllRealStateFromCategoryController = async (req: Request, res: Response): Promise<Response> => {
  const categoryId: string = req.params.id;

  const allRealStateFromCategory = await readAllRealStateFromCategoryService(Number(categoryId));
  return res.status(200).json(allRealStateFromCategory);
};
