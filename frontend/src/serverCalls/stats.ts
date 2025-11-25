export interface Summary {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

export interface ActivityPoint {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface DecisionStats {
  approved: number;
  rejected: number;
  requestChanges: number;
}

type Period = "today" | "week" | "month" | "custom";

export async function getSummary(
  period: Period,
  startDate?: string,
  endDate?: string
): Promise<Summary> {
  const query = new URLSearchParams();
  query.set("period", period);

  if (period === "custom") {
    if (startDate) query.set("startDate", startDate);
    if (endDate) query.set("endDate", endDate);
  }

  const res = await fetch(
    `http://localhost:3001/api/v1/stats/summary?${query.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw res.status.toString();
  }

  return (await res.json()) as Summary;
}

export async function getActivityStats(
  period: Period,
  startDate?: string,
  endDate?: string
): Promise<ActivityPoint[]> {
  const query = new URLSearchParams();
  query.set("period", period);

  if (period === "custom") {
    if (startDate) query.set("startDate", startDate);
    if (endDate) query.set("endDate", endDate);
  }

  const res = await fetch(
    `http://localhost:3001/api/v1/stats/chart/activity?${query.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw res.status.toString();
  }

  return (await res.json()) as ActivityPoint[];
}

export async function getDecisionStats(
  period: Period,
  startDate?: string,
  endDate?: string
): Promise<DecisionStats> {
  const query = new URLSearchParams();
  query.set("period", period);

  if (period === "custom") {
    if (startDate) query.set("startDate", startDate);
    if (endDate) query.set("endDate", endDate);
  }

  const res = await fetch(
    `http://localhost:3001/api/v1/stats/chart/decisions?${query.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw res.status.toString();
  }

  return (await res.json()) as DecisionStats;
}

export async function getCategoryStats(
  period: Period,
  startDate?: string,
  endDate?: string
): Promise<{ [key: string]: string }> {
  const query = new URLSearchParams();
  query.set("period", period);

  if (period === "custom") {
    if (startDate) query.set("startDate", startDate);
    if (endDate) query.set("endDate", endDate);
  }

  const res = await fetch(
    `http://localhost:3001/api/v1/stats/chart/categories?${query.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw res.status.toString();
  }

  return (await res.json()) as { [key: string]: string };
}