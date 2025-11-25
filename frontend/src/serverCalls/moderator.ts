type permission = "approve_ads" | "reject_ads" | "request_changes" | "view_stats"
  
export interface Moderator {
  id: number,
  "name": string,
  "email": string,
  "role": string,
  "statistics": {
    "totalReviewed": number,
    "todayReviewed": number,
    "thisWeekReviewed": number,
    "thisMonthReviewed": number,
    "averageReviewTime": number,
    "approvalRate": number
  },
  "permissions": permission[]
}

export async function getModeratorsMe() {
  const res = await fetch(`http://localhost:3001/api/v1/moderators/me`);
  if (!res.ok) throw res.status.toString();
  return await res.json() as Moderator;
}