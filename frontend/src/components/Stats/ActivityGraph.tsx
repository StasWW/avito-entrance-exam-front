import React, { useState, useMemo } from "react";
import getActivityGraphStyles from "./styles/activityGraph.ts";

interface Props {
  data: {
    date: string;
    approved: number;
    rejected: number;
    requestChanges: number;
  }[];
}

export default function ActivityGraph({ data }: Props) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const styles = useMemo(() => getActivityGraphStyles(), []);
  const max = Math.max(...data.map(d => d.approved + d.rejected + d.requestChanges));
  const chartHeight = 200;

  return (
    <div style={styles.scrollContainer} className={'scroll-container'}>
      <h3 style={styles.title}>График активности</h3>
      <div style={{ ...styles.chartWrapper, minWidth: `${data.length * 60}px` }}>
        <div style={{ ...styles.chart, height: `${chartHeight}px` }}>
          {data.map((point, index) => {
            const total = point.approved + point.rejected + point.requestChanges;
            const barHeight = (total / max) * chartHeight;
            const formattedDate = new Intl.DateTimeFormat("ru-RU", {
              day: "2-digit",
              month: "2-digit",
            }).format(new Date(point.date));

            return (
              <div key={point.date} style={styles.barContainer}>
                <div
                  style={{ ...styles.bar, height: `${barHeight}px` }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {hoverIndex === index && (
                    <div style={styles.tooltip}>{total}</div>
                  )}
                </div>
                <span style={styles.dateLabel}>{formattedDate}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
