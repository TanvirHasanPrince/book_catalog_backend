import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse } from './auth.interface';
import { AuthService } from './auth.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.insertIntoDB(req.body);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...responseData } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: responseData,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User signin successfully!!',
    data: others,
  });
});

// const checkMyAuth = catchAsync(async (req: Request, res: Response) => {
//   const user = (req as any).user;
//  console.log(user);
// });

export const UserController = {
  insertIntoDB,
  loginUser,
  // checkMyAuth,
};
