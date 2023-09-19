import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const checkMyAuth = catchAsync(async (req: Request, res: Response) => {
  const orderedBooksData = req.body;
  const user = (req as any).user;

  const result = await OrderService.insertIntoDB(user.userId, orderedBooksData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Created Successfully',
    data: result,
  });
});

// const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
//   const result = await OrderService.getAllFromDB();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Orders retrieved successfully',
//     data: result,
//   });
// });

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (user.role === ENUM_USER_ROLE.CUSTOMER) {
    const result = await OrderService.getAllOrdersForSpecificCustomerFromDB(
      user.userId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Your orders have been retrieved successfully',
      data: result,
    });
  }

  if (user.role === ENUM_USER_ROLE.ADMIN) {
    const result = await OrderService.getAllFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Orders have been retrieved successfully',
      data: result,
    });
  }
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { orderId } = req.params;
    const result = await OrderService.getByIdFromDB(user, orderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
  
  
});

export const OrderController = {
  checkMyAuth,
  getAllFromDB,
  getByIdFromDB,
};
