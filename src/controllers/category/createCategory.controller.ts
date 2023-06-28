import { Request, Response } from 'express';
import { TCategoryCreate } from '../../interfaces/category.interface';
import { createCategoryService } from '../../services/categories/createCategory.service';

export const createCategoryController = async (req: Request, res: Response): Promise<Response> => {
  const newCategory: TCategoryCreate = await createCategoryService(req.body);
  return res.status(201).json(newCategory);
};
