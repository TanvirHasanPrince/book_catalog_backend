import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';


const insertIntoDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });

  return result;
};
export const UserService = {
  insertIntoDB,
};

// const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
//   const { email, password } = payload;

//   const isUserExist = await prisma.user.findFirst({
//     where: {
//       email: email,
//     },
//   });


//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }

//   if (
//     isUserExist.password &&
//     !(await User.isPasswordMatched(password, isUserExist.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
//   }

//   //create access token & refresh token

//   const { id: userId, role, needsPasswordChange } = isUserExist;
//   const accessToken = jwtHelpers.createToken(
//     { userId, role },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );

//   const refreshToken = jwtHelpers.createToken(
//     { userId, role },
//     config.jwt.refresh_secret as Secret,
//     config.jwt.refresh_expires_in as string
//   );

//   return {
//     accessToken,
//     refreshToken,
//   };
// };
