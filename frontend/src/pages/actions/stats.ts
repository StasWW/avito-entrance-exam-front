import {
  getSummary,
  getActivityStats,
  getDecisionStats,
  getCategoryStats,
  type Summary,
  type ActivityPoint,
  type DecisionStats
} from "../../serverCalls/stats";

export async function fetchSummary(
  period: "today" | "week" | "month" | "custom",
  startDate?: string,
  endDate?: string
): Promise<Summary | string> {
  try {
    const res = await getSummary(period, startDate, endDate);
    return res as Summary;
  } catch (e) {
    return e as string;
  }
}

export async function fetchActivityStats(
  period: "today" | "week" | "month" | "custom",
  startDate?: string,
  endDate?: string
): Promise<ActivityPoint[] | string> {
  try {
    const res = await getActivityStats(period, startDate, endDate);
    return res as ActivityPoint[];
  } catch (e) {
    return e as string;
  }
}

export async function fetchDecisionStats(
  period: "today" | "week" | "month" | "custom",
  startDate?: string,
  endDate?: string
): Promise<DecisionStats | string> {
  try {
    const res = await getDecisionStats(period, startDate, endDate);
    return res as DecisionStats;
  } catch (e) {
    return e as string;
  }
}

export async function fetchCategoryStats(
  period: "today" | "week" | "month" | "custom",
  startDate?: string,
  endDate?: string
): Promise<{ [key: string]: string } | string> {
  try {
    const res = await getCategoryStats(period, startDate, endDate);
    return res as { [key: string]: string };
  } catch (e) {
    return e as string;
  }
}
