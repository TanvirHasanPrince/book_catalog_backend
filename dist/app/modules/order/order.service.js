"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Create Order → Only Allowed For Customer
const insertIntoDB = (authUserId, orderedBooksData) => __awaiter(void 0, void 0, void 0, function* () {
    const customerInfo = yield prisma_1.default.user.findFirst({
        where: {
            id: authUserId,
        },
    });
    if (!customerInfo) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Customer Not Found!');
    }
    const order = yield prisma_1.default.order.create({
        data: {
            userId: authUserId,
            orderedBooks: {
                create: orderedBooksData.orderedBooks.map((book) => ({
                    bookId: book.bookId,
                    quantity: book.quantity,
                })),
            },
        },
    });
    return order;
});
// Get all Order → Only Allowed For Admins
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({});
    return result;
});
// Get all Order for specific Customers → Only Specific Customers
const getAllOrdersForSpecificCustomerFromDB = (authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({
        where: {
            userId: authUserId,
        },
    });
    return result;
});
// Get single order by Id → Only for specific customer and admins
const getByIdFromDB = (user, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user.role);
    if (user.role === user_1.ENUM_USER_ROLE.ADMIN) {
        const result = yield prisma_1.default.order.findUnique({
            where: {
                id: orderId,
            },
        });
        return result;
    }
    if (user.role === user_1.ENUM_USER_ROLE.CUSTOMER) {
        const result = yield prisma_1.default.order.findUnique({
            where: {
                id: orderId,
                userId: user.userId,
            },
        });
        return result;
    }
});
exports.OrderService = {
    insertIntoDB,
    getAllFromDB,
    getAllOrdersForSpecificCustomerFromDB,
    getByIdFromDB,
};
