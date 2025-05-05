interface Pagination {
  current_page: number;
  total_count: number;
  total_pages: number;
  next_page: number | null;
  prev_page: number | null;
  count: number;
  per_page: number;
}

interface ApiResponse<T> {
  collection: T[];
  pagination: Pagination;
}

export type { ApiResponse };
