export interface GetAdsParams {
  page: number
  limit: number
  sortBy: "createdAt" | "price" | "priority"
  sortOrder: "asc" | "desc"
  status?: string[]
  categoryId?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  minPrice?: number
  maxPrice?: number
  search?: string
}

export interface ModerationHistory {
  id: number
  moderatorId: number
  moderatorName: string
  action: "approved" | "rejected" | "requestChanges"
  reason?: string | null
  comment: string
  timestamp: string // "2025-09-25T15:28:23.826Z"
}

export interface Seller {
  id: number
  name: string
  rating: string
  totalAds: number
  registeredAt: string // "2025-02-23T15:28:23.826Z"
}

export interface Characteristics {
  [key: string]: string
}

export interface Ad {
  id: number
  title: string
  description: string
  price: number
  category: 'Электроника' | 'Недвижимость' | 'Транспорт' | 'Работа' | 'Услуги' | 'Животные' | 'Мода' | 'Детское'
  categoryId: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  status: "pending" | "approved" | "rejected" | "draft"
  priority: "normal" | "urgent"
  createdAt: string // "2025-09-25T15:28:23.826Z"
  updatedAt: string // "2025-09-25T15:28:23.826Z"
  images: string[]
  seller: Seller
  characteristics: Characteristics
  moderationHistory: ModerationHistory[]
}

interface GetAdsResponse {
  ads: Ad[],
  pagination: {
    currentPage: number,
    totalPages: number,
    totalItems: number,
    itemsPerPage: number
  }
}

interface moderationAction {
  ad: Ad,
  message: string,
}

export async function getAds(params: GetAdsParams): Promise<GetAdsResponse> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (Array.isArray(value)) {
      value.forEach(v => query.append(key, String(v)));
    } else {
      query.append(key, String(value));
    }
  });

  const res = await fetch(
    `http://localhost:3001/api/v1/ads?${query.toString()}`,
    { headers: { Accept: "application/json" } }
  );
  if (!res.ok) throw res.status.toString();
  return await res.json() as GetAdsResponse;
}

export async function getAdById(id: string): Promise<Ad> {
  const res = await fetch(`http://localhost:3001/api/v1/ads/${id}`,
    { headers: { Accept: "application/json" } });
  if (!res.ok) throw res.status.toString();
  return await res.json() as Ad;
}

export async function approveById(id: string): Promise<moderationAction> {
  const res = await fetch(`http://localhost:3001/api/v1/ads/${id}/approve`,
    {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json",
      },
      body: '',
    });
  if (!res.ok) throw res.status.toString();
  return await res.json() as moderationAction;
}
// curl -X 'POST' \
//   'http://localhost:3001/api/v1/ads/123/reject' \
//   -H 'accept: application/json' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "reason": "Запрещенный товар",
//   "comment": ""
// }'
export async function rejectById(id: string, reason: string, comment?: string): Promise<moderationAction> {
  const res = await fetch(`http://localhost:3001/api/v1/ads/${id}/reject`,
    {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        reason,
        comment: comment ?? '',
      })
    },

    );
  if (!res.ok) throw res.status.toString();
  return await res.json() as moderationAction;
}
export async function requestChangesById(id: string, reason: string, comment?: string): Promise<moderationAction> {
  const res = await fetch(`http://localhost:3001/api/v1/ads/${id}/request-changes`,
    {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        reason,
        comment: comment ?? '',
      })
    });
  if (!res.ok) throw res.status.toString();
  return await res.json() as moderationAction;
}