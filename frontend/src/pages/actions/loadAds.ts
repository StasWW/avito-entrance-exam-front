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
}

export default async function loadAds(params: LoadAdsParams) {
  const query: any = {
    page: 1, // Всегда возвращать на первую страницу, чтобы не получать 400
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

  // Нельзя воспользоваться абстракциями, реакт плачет
  store.dispatch(setPagination(response.pagination));
  store.dispatch(replaceAds(response.ads));

  console.log(response);
}
