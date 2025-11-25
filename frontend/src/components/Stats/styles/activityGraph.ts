import type { CSSProperties } from "react";

interface ActivityGraphStyle {
  scrollContainer: CSSProperties;
  title: CSSProperties;
  chartWrapper: CSSProperties;
  chart: CSSProperties;
  barContainer: CSSProperties;
  bar: CSSProperties;
  tooltip: CSSProperties;
  dateLabel: CSSProperties;
}

export default function getActivityGraphStyles(): ActivityGraphStyle {
  return {
    scrollContainer: {
      overflowX: "auto",
      width: "100%",
    },
    title: {
      marginBottom: "16px",
    },
    chartWrapper: {
      paddingTop: "8px",
    },
    chart: {
      display: "flex",
      alignItems: "flex-end",
      gap: "16px",
      borderBottom: "1px solid #ccc",
    },
    barContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
    },
    bar: {
      width: "40px",
      backgroundColor: "#2196f3",
      borderRadius: "4px 4px 0 0",
      transition: "height 0.3s ease",
      position: "relative",
    },
    tooltip: {
      position: "absolute",
      top: "-24px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#333",
      color: "#fff",
      padding: "2px 6px",
      borderRadius: "4px",
      fontSize: "12px",
      whiteSpace: "nowrap",
    },
    dateLabel: {
      fontSize: "12px",
    },
  };
}
