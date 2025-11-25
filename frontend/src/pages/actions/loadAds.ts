import { getAds } from "../../serverCalls/ads.ts";
import { store } from "../../store/storage.ts";
import { replaceAds, replaceIds } from "../../store/adsSlice.ts";
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
  limit?: number;
}

export function saveSearchParams(params: LoadAdsParams) {
  localStorage.setItem("searchParams", JSON.stringify(params));
}

export function getSavedSearchParams(): LoadAdsParams | null {
  const stored = localStorage.getItem("searchParams");
  if (stored) {
    try {
      return JSON.parse(stored) as LoadAdsParams;
    } catch {
      return null;
    }
  }
  return null;
}

export default async function loadAds(params: LoadAdsParams) {

  const query: any = {
    page: params.currentPage ?? 1,
    limit: params.limit ?? 10,
    sortBy: params.sortBy ?? "createdAt",
    sortOrder: params.sortOrder ?? "asc",
    ...(params.status ? { status: params.status } : {}),
    ...(params.categorySelected !== undefined ? { categoryId: params.categorySelected } : {}),
    ...(params.minPrice !== undefined ? { minPrice: params.minPrice } : {}),
    ...(params.maxPrice !== undefined ? { maxPrice: params.maxPrice } : {}),
    ...(params.search ? { search: params.search } : {}),
  };
  try {
    const response = await getAds(query);
    saveSearchParams(params);

    const currentAds = store.getState().ads.ads;
    const currentPagination = store.getState().pagination;

    const adsChanged =
      currentAds.length !== response.ads.length ||
      currentAds.some((ad, idx) => ad.id !== response.ads[idx].id);

    const paginationChanged =
      currentPagination.totalPages !== response.pagination.totalPages ||
      currentPagination.totalItems !== response.pagination.totalItems;

    if (adsChanged) {
      store.dispatch(replaceAds(response.ads));
      const allQuery: any = {
        ...query,
        page: 1,
        limit: response.pagination.totalItems,
      };
      const allResponse = await getAds(allQuery);
      store.dispatch(replaceIds(allResponse.ads.map(ad => ad.id)));
    }
    if (paginationChanged) {
      store.dispatch(setPagination(response.pagination));
    }
  } catch (e: any) {
    console.warn(e.status.toString())
  }
}
