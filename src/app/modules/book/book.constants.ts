export const bookFilterableFields: string[] = [
  'search',
  'title',
  'author',
  'genre',
  'publicationDate',
  'category',
];

export const bookSearchableFields: string[] = ['title', 'author', 'genre'];

export const bookRelationalFields: string[] = ['reviewAndRatings', 'orderedBooks'];
export const bookRelationalFieldsMapper: { [key: string]: string } = {
  reviewAndRatingsId: 'reviewAndRatings',
  orderedBooksId: 'orderedBooks',
};
