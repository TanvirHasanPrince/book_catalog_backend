export const userFilterableFields: string[] = ['searchTerm', 'role'];

export const userSearchableFields: string[] = [
  'name',
  'email',
  'contactNo',
  'address',
];

export const userRelationalFields: string[] = [
  'reviewAndRatings',
  'orders',
];
export const userRelationalFieldsMapper: { [key: string]: string } = {
  reviewAndRatingsId: 'reviewAndRatings',
  ordersId: 'orders',
};
