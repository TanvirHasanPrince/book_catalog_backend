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
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
const checkMyAuth = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderedBooksData = req.body;
    const user = req.user;
    const result = yield order_service_1.OrderService.insertIntoDB(user.userId, orderedBooksData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order Created Successfully',
        data: result,
    });
}));
// const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
//   const result = await OrderService.getAllFromDB();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Orders retrieved successfully',
//     data: result,
//   });
// });
const getAllFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user.role === user_1.ENUM_USER_ROLE.CUSTOMER) {
        const result = yield order_service_1.OrderService.getAllOrdersForSpecificCustomerFromDB(user.userId);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Your orders have been retrieved successfully',
            data: result,
        });
    }
    if (user.role === user_1.ENUM_USER_ROLE.ADMIN) {
        const result = yield order_service_1.OrderService.getAllFromDB();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Orders have been retrieved successfully',
            data: result,
        });
    }
}));
const getByIdFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user.role);
    const { orderId } = req.params;
    const result = yield order_service_1.OrderService.getByIdFromDB(user, orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order fetched successfully',
        data: result,
    });
}));
exports.OrderController = {
    checkMyAuth,
    getAllFromDB,
    getByIdFromDB,
};
