import {getAds} from "../../serverCalls/ads.ts";

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
    page: 1,
    limit: 10,
    sortBy: params.sortBy ?? "createdAt",
    sortOrder: params.sortOrder ?? "asc",
    ...(params.status ? { status: params.status } : {}),
    ...(params.categorySelected !== undefined ? { categoryId: params.categorySelected } : {}),
    ...(params.minPrice !== undefined ? { minPrice: params.minPrice } : {}),
    ...(params.maxPrice !== undefined ? { maxPrice: params.maxPrice } : {}),
    ...(params.search ? { search: params.search } : {}),
  };

  const ads = await getAds(query);
  console.log(ads);
}