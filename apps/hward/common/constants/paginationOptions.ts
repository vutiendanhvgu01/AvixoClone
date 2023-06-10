type PaginationOptions = {
  page: number;
  perPage: number;
};

const DEFAULT_PAGINATION_OPTIONS: PaginationOptions = {
  page: 0,
  perPage: 20,
};

export { type PaginationOptions };
export default DEFAULT_PAGINATION_OPTIONS;
