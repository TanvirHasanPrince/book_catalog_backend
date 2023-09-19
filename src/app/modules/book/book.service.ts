import { Book, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IBookFilterRequest } from "./book.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { bookRelationalFields, bookRelationalFieldsMapper, bookSearchableFields } from "./book.constants";

// Create Books
const insertIntoDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
     category: true
    }
  });

  return result;
};

const getAllFromDB = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookRelationalFields.includes(key)) {
          return {
            [bookRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      reviewAndRatings: true,
      orderedBooks: true,
    },
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {},
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });

  // Calculate the total number of pages
  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
};

// Get Books By CategoryId
const getBooksByCategoryIdFromDB = async (
  id: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[] | null>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);

  const total = await prisma.book.count({
    where: {
      categoryId: id,
    },
  });

  const result = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
    skip,
    take: size,
    include: {
      reviewAndRatings: true,
      orderedBooks: true,
    },
  });

  // Calculate the total number of pages
  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      reviewAndRatings: true,
      orderedBooks: true,
    },
  });
  return result;
};

// Update a Single Book → Only Allowed For Admin: Route: /api/v1/books/:id (PATCH)

const updateByIDFromDB = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      reviewAndRatings: true,
      orderedBooks: true,
    },
  });
  return result;
};


export const BookService = {
  insertIntoDB,
  getAllFromDB,
  getBooksByCategoryIdFromDB,
  getByIdFromDB,
  updateByIDFromDB,
};
