"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRelationalFieldsMapper = exports.userRelationalFields = exports.userSearchableFields = exports.userFilterableFields = void 0;
exports.userFilterableFields = ['searchTerm', 'role'];
exports.userSearchableFields = [
    'name',
    'email',
    'contactNo',
    'address',
];
exports.userRelationalFields = [
    'reviewAndRatings',
    'orders',
];
exports.userRelationalFieldsMapper = {
    reviewAndRatingsId: 'reviewAndRatings',
    ordersId: 'orders',
};
