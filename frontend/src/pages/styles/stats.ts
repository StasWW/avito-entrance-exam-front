import type { CSSProperties } from "react";

interface StatsStyle {
  bgContainer: CSSProperties;
  page: CSSProperties;
  filters: CSSProperties;
  button: CSSProperties;
  activeButton: CSSProperties;
  error: CSSProperties;
  loading: CSSProperties;
  backButton: CSSProperties;
  dateInput: CSSProperties;
  dateGroup: CSSProperties;
}

export default function statsGetStyle(isDarkmode: boolean): StatsStyle {
  return {
    bgContainer: {
      minHeight: "100vh",
      width: "100%",
      backgroundColor: isDarkmode ? "rgb(18, 18, 18)" : "#f0f0f0",
    },
    page: {
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "20px",
      color: isDarkmode ? "#eee" : "#333",
      backgroundColor: isDarkmode ? "#121212" : "#fff",
      position: "relative",
    },
    filters: {
      display: "flex",
      gap: "10px",
      margin: "20px 0",
      alignItems: "center",
    },
    button: {
      padding: "8px 16px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      backgroundColor: isDarkmode ? "#333" : "#f5f5f5",
      color: isDarkmode ? "#eee" : "#333",
      cursor: "pointer",
      transition: "background-color 0.2s ease, color 0.2s ease",
    },
    activeButton: {
      backgroundColor: "#2196f3",
      color: "#fff",
    },
    error: {
      color: "red",
    },
    loading: {
      color: isDarkmode ? "#aaa" : "#666",
    },
    backButton: {
      position: "absolute",
      top: "20px",
      left: "20px",
      padding: "8px 14px",
      borderRadius: "6px",
      backgroundColor: isDarkmode ? "#444" : "#e0e0e0",
      color: isDarkmode ? "#fff" : "#333",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      transition: "background-color 0.2s ease",
    },
    dateGroup: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
    },
    dateInput: {
      boxSizing: 'border-box',
      height: '100%',
      padding: "6px 10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      backgroundColor: isDarkmode ? "#222" : "#fff",
      color: isDarkmode ? "#eee" : "#333",
      cursor: "pointer",
    },
  };
}
