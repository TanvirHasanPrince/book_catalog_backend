import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { ProfileService } from "./profile.service";


const getProfile = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await ProfileService.getProfile(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

export const ProfileController = {
getProfile
}