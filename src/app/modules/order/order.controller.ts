import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { OrderService } from "./order.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";


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

export const OrderController = {
  checkMyAuth,
};
