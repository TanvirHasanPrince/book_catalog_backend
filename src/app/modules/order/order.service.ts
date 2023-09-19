import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { Order } from '@prisma/client';

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

export const OrderService = {
  insertIntoDB,
};
