import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

// Create Order → Only Allowed For Customer
const insertIntoDB = async (
  authUserId: string,
  orderedBooksData: any
): Promise<Order> => {
  const customerInfo = await prisma.user.findFirst({
    where: {
      id: authUserId,
    },
  });
  if (!customerInfo) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Customer Not Found!');
  }

  const order = await prisma.order.create({
    data: {
      userId: authUserId,
      orderedBooks: {
        create: orderedBooksData.orderedBooks.map((book: any) => ({
          bookId: book.bookId,
          quantity: book.quantity,
        })),
      },
    },
  });

  return order;
};

// Get all Order → Only Allowed For Admins
const getAllFromDB = async (): Promise<Order[] | null> => {
  const result = await prisma.order.findMany({});

  return result;
};

// Get all Order for specific Customers → Only Specific Customers
const getAllOrdersForSpecificCustomerFromDB = async (
  authUserId: string
): Promise<Order[] | null> => {
  const result = await prisma.order.findMany({
    where: {
      userId: authUserId,
    },
  });
  return result;
};

// Get single order by Id → Only for specific customer and admins
const getByIdFromDB = async (user: any, orderId: string) => {
  const isAdmin = (user.role = ENUM_USER_ROLE.ADMIN);

  if (isAdmin) {
    const result = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    return result;
  }
  if (!isAdmin) {
    const result = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId: user.userId,
      },
    });

    return result;
  }
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB,
  getAllOrdersForSpecificCustomerFromDB,
  getByIdFromDB,
};
