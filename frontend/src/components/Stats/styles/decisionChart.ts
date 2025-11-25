import type { CSSProperties } from "react";

interface DecisionChartStyle {
  container: CSSProperties;
  title: CSSProperties;
  pie: CSSProperties;
  legend: CSSProperties;
  legendItem: CSSProperties;
  legendSwatch: CSSProperties;
  legendLabel: CSSProperties;
  legendPct: CSSProperties;
  legendCount: CSSProperties;
}

export default function decisionChartGetStyle(): DecisionChartStyle {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
    },
    title: {
      margin: 0,
      marginTop: '1rem',
      fontSize: "1.5rem",
      fontWeight: 600,
      textAlign: "center",
    },
    pie: {
      width: 240,
      height: 240,
      borderRadius: "50%",
      boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
    },
    legend: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      width: "100%",
      maxWidth: 360,
      marginTop: 8,
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      justifyContent: "center",
    },
    legendSwatch: {
      display: "inline-block",
      width: 12,
      height: 12,
      borderRadius: 2,
      backgroundColor: "#ccc",
    },
    legendLabel: {
      minWidth: 120,
    },
    legendPct: {
      fontWeight: 600,
    },
    legendCount: {
      color: "#888",
    },
  };
}
