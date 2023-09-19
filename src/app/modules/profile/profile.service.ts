import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

// Get User Profile Data → Only for specific user (customer and admin)
const getProfile = async (user: any): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });
  return result;
};

export const ProfileService = {
  getProfile,
};
