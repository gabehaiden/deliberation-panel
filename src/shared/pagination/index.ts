export type Pagination<T> = {
  data: T;
  rows: number;
  pages: number;
  pageSize: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}