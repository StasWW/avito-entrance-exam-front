import type {CSSProperties} from "react";

interface BlockStatsStyle {
  container: CSSProperties;
  title: CSSProperties;
  value: CSSProperties;
}

export const blockStatsGetStyle = (isDarkmode: boolean): BlockStatsStyle => ({
  container: {
    flex: 1,
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: isDarkmode ? "rgb(28, 28, 36)" : "#f5f5f5",
    textAlign: "center",
  },
  title: {
    margin: "0 0 8px",
    fontSize: "14px",
    color: isDarkmode ? "#aaa" : "#666",
  },
  value: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2196f3",
  },
});
