"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRelationalFieldsMapper = exports.bookRelationalFields = exports.bookSearchableFields = exports.bookFilterableFields = void 0;
exports.bookFilterableFields = [
    'search',
    'title',
    'author',
    'genre',
    'publicationDate',
    'category',
];
exports.bookSearchableFields = ['title', 'author', 'genre'];
exports.bookRelationalFields = ['reviewAndRatings', 'orderedBooks'];
exports.bookRelationalFieldsMapper = {
    reviewAndRatingsId: 'reviewAndRatings',
    orderedBooksId: 'orderedBooks',
};
