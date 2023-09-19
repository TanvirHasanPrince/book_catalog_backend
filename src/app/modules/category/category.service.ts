import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

// Create Category
const insertIntoDB = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });

  return result;
};

// Get All Categories

const getAllFromDB = async (): Promise<Category[] | null> => {
  const result = await prisma.category.findMany({});

  return result;
};

export const CategoryService = {
  insertIntoDB,
  getAllFromDB,
};
