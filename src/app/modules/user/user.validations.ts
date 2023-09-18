import { z } from 'zod';


const update = z.object({
  body: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const UserValidation = {
  update,
};
