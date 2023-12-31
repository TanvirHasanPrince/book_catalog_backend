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
  const result = await prisma.category.findMany({
    include: {
      books: true,
    },
  });

  return result;
};

const getByIdFromDB = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

const updateByIDFromDB = async (
  id: string,
  payload: Partial<Category>
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
    include: {
      books: true,
    },
  });
  return result;
};

const deleteByIDFromDB = async (id: string): Promise<Category> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIDFromDB,
  deleteByIDFromDB,
};
