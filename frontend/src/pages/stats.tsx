import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Moderator } from "../serverCalls/moderator.ts";
import ModBio from "../components/Stats/modBio.tsx";
import BlockStats from "../components/Stats/BlockStats.tsx";
import ActivityGraph from "../components/Stats/ActivityGraph.tsx";
import DecisionChart from "../components/Stats/DecisionChart.tsx";
import CategoryChart from "../components/Stats/CategoryChart.tsx";
import defaultPfp from "../../public/defaultPfp.jpg";
import { getModerator } from "./actions/getModerator.ts";
import {
  fetchSummary,
  fetchActivityStats,
  fetchDecisionStats,
  fetchCategoryStats
} from "./actions/stats.ts";
import type { ActivityPoint } from "../serverCalls/stats.ts";
import { useDarkmode } from "../store/storage.ts";
import statsGetStyle from "./styles/stats.ts";

export default function Stats() {
  const navigate = useNavigate();
  const [isDarkmode] = useDarkmode();
  const styles = useMemo(() => statsGetStyle(isDarkmode), [isDarkmode]);

  const [moderatorInfo, setModeratorInfo] = useState<Moderator | undefined>(undefined);
  const [error, setError] = useState("");

  const [approvalRate, setApprovalRate] = useState<number>(0);
  const [rejectionRate, setRejectionRate] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [averageReviewTime, setAverageReviewTime] = useState<number>(0);

  const [activityData, setActivityData] = useState<ActivityPoint[]>([]);
  const [decisionData, setDecisionData] = useState({ approved: 0, rejected: 0, requestChanges: 0 });
  const [categoryData, setCategoryData] = useState<{ [key: string]: string }>({});

  const [period, setPeriod] = useState<"today" | "week" | "month" | "custom">("week");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    getModerator().then((value) => {
      if (typeof value !== "string") {
        setModeratorInfo(value);
      } else {
        setError(value);
      }
    });
  }, []);

  useEffect(() => {
    if (endDate === '' && startDate !== '') {
      const today = new Date();
      const formatted = today.toISOString().split("T")[0];
      setEndDate(formatted);
    }
  }, [startDate]);
  useEffect(() => {
    fetchSummary(period, startDate, endDate).then((res) => {
      if (typeof res !== "string") {
        setApprovalRate(res.approvedPercentage);
        setRejectionRate(res.rejectedPercentage);
        setTotalReviews(res.totalReviewed);
        setAverageReviewTime(res.averageReviewTime);
      }
    });

    fetchActivityStats(period, startDate, endDate).then((res) => {
      if (typeof res !== "string") {
        setActivityData(res);
      }
    });

    fetchDecisionStats(period, startDate, endDate).then((res) => {
      if (typeof res !== "string") {
        setDecisionData(res);
      }
    });

    fetchCategoryStats(period, startDate, endDate).then((res) => {
      if (typeof res !== "string") {
        setCategoryData(res);
      }
    });
  }, [period, startDate, endDate]);

  const emptyDates = () => {
    setEndDate('');
    setStartDate('');
  }

  return (
    <div style={styles.bgContainer}>
      <div style={styles.page}>
        <button style={styles.backButton} onClick={() => navigate("/")}>
          ← Назад
        </button>

        {moderatorInfo ? (
          <>
            <ModBio
              image={defaultPfp}
              name={moderatorInfo.name}
              email={moderatorInfo.email}
              status={moderatorInfo.role}
              permissions={moderatorInfo.permissions}
            />

            <div style={styles.filters}>
              <button
                style={{ ...styles.button, ...(period === "today" ? styles.activeButton : {}) }}
                onClick={() => {
                  setPeriod("today");
                  emptyDates();
                }}
              >
                Сегодня
              </button>
              <button
                style={{ ...styles.button, ...(period === "week" ? styles.activeButton : {}) }}
                onClick={() => {
                  setPeriod("week");
                  emptyDates();
                }}
              >
                7д
              </button>
              <button
                style={{ ...styles.button, ...(period === "month" ? styles.activeButton : {}) }}
                onClick={() => {
                  setPeriod("month");
                  emptyDates();
                }}
              >
                30д
              </button>
              <div style={{ display: "flex", gap: "8px", marginLeft: "16px" }}>
                <input
                  type="date"
                  value={startDate}
                  style={styles.dateInput}
                  max={endDate}
                  onChange={(e) => { setStartDate(e.target.value); setPeriod("custom"); }}
                />
                <input
                  type="date"
                  value={endDate}
                  style={styles.dateInput}
                  onChange={(e) => { setEndDate(e.target.value); setPeriod("custom"); }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
              <BlockStats title="Проверено" value={totalReviews} />
              <BlockStats title="Одобрено" value={approvalRate} isPercentage={true} />
              <BlockStats title="Отклонено" value={rejectionRate} isPercentage={true} />
              <BlockStats title="Среднее время в мин." value={averageReviewTime / 60} isPercentage={true} />
            </div>

            <ActivityGraph data={activityData} />
            <DecisionChart data={decisionData} />
            <CategoryChart data={categoryData} />
          </>
        ) : error ? (
          <h1 style={styles.error}>Ошибка {error}</h1>
        ) : (
          <h1 style={styles.loading}>Загрузка...</h1>
        )}
      </div>
    </div>
  );
}
