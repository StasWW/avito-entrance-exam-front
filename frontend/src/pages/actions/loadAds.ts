import { getAds } from "../../serverCalls/ads.ts";
import { store } from "../../store/storage.ts";
import { replaceAds } from "../../store/adsSlice.ts";
import { setPagination } from "../../store/paginationSlice.ts";

interface LoadAdsParams {
  sortBy?: "createdAt" | "price" | "priority";
  sortOrder?: "asc" | "desc";
  status?: string[];
  categorySelected?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  currentPage?: number;
}

export default async function loadAds(params: LoadAdsParams) {
  const query: any = {
    page: params.currentPage ?? 1,
    limit: 10,
    sortBy: params.sortBy ?? "createdAt",
    sortOrder: params.sortOrder ?? "asc",
    ...(params.status ? { status: params.status } : {}),
    ...(params.categorySelected !== undefined ? { categoryId: params.categorySelected } : {}),
    ...(params.minPrice !== undefined ? { minPrice: params.minPrice } : {}),
    ...(params.maxPrice !== undefined ? { maxPrice: params.maxPrice } : {}),
    ...(params.search ? { search: params.search } : {}),
  };
  const response = await getAds(query);

  const currentAds = store.getState().ads.ads;
  const currentPagination = store.getState().pagination;

  const adsChanged =
    currentAds.length !== response.ads.length ||
    currentAds.some((ad, idx) => ad.id !== response.ads[idx].id);

  const paginationChanged =
    currentPagination.totalPages !== response.pagination.totalPages ||
    currentPagination.totalItems !== response.pagination.totalItems

  if (adsChanged) {
    store.dispatch(replaceAds(response.ads));
  }
  if (paginationChanged) {
    store.dispatch(setPagination(response.pagination));
  }
}
