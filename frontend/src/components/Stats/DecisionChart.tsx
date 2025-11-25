import React, { useMemo } from "react";
import decisionChartGetStyle from "./styles/decisionChart.ts";

interface Props {
  data: {
    approved: number;
    rejected: number;
    requestChanges: number;
  };
}

export default function DecisionChart({ data }: Props) {
  const styles = decisionChartGetStyle();

  const items = useMemo(
    () => [
      { label: "Одобрено", key: "approved", value: data.approved, color: "#4caf50" },
      { label: "Отклонено", key: "rejected", value: data.rejected, color: "#f44336" },
      { label: "Доработка", key: "requestChanges", value: data.requestChanges, color: "#ff9800" },
    ],
    [data]
  );

  const total = Math.max(1, items.reduce((acc, i) => acc + i.value, 0));
  const percents = items.map((i) => ({ ...i, pct: (i.value / total) * 100 }));

  const pieStyle = useMemo(() => {
    let start = 0;
    const segments = percents
      .map((seg) => {
        const end = start + seg.pct;
        const css = `${seg.color} ${start}% ${end}%`;
        start = end;
        return css;
      })
      .join(", ");
    return { ...styles.pie, background: `conic-gradient(${segments})` };
  }, [percents, styles.pie]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Распределение решений</h2>
      <div style={pieStyle} />
      <div style={styles.legend}>
        {percents.map((item) => (
          <div key={item.key} style={styles.legendItem}>
            <span style={{ ...styles.legendSwatch, backgroundColor: item.color }} />
            <span style={styles.legendLabel}>{item.label}</span>
            <span style={styles.legendPct}>{item.pct.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
