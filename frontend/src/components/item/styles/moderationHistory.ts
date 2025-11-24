import type { CSSProperties } from "react";

export interface ModerationHistoryStyles {
  container: CSSProperties;
  entry: CSSProperties;
  header: CSSProperties;
  moderator: CSSProperties;
  date: CSSProperties;
  status: CSSProperties;
  reason: CSSProperties;
  comment: CSSProperties;
}

export default function getModerationHistoryStyles(isDarkmode: boolean): ModerationHistoryStyles {
  const baseText = isDarkmode ? "#f5f5f5" : "#222";
  const borderColor = isDarkmode ? "#444" : "#ccc";

  return {
    container: {
      boxSizing: 'border-box',
      width: "100%",
      marginTop: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      maxHeight: "135px",
      overflowY: "auto",
      paddingRight: "0.5rem",
    },
    entry: {
      padding: "1rem",
      borderRadius: "8px",
      border: `1px solid ${borderColor}`,
      backgroundColor: isDarkmode ? "#1e1e24" : "#fafafa",
      color: baseText,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "0",
      fontSize: "0.9rem",
      fontWeight: 600,
    },
    moderator: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    date: {
      fontStyle: "italic",
      color: isDarkmode ? "#aaa" : "#555",
    },
    status: {
      fontWeight: 600,
      marginBottom: "0.5rem",
    },
    reason: {
      marginBottom: "0.25rem",
      fontSize: "0.9rem",
    },
    comment: {
      fontSize: "0.9rem",
      color: isDarkmode ? "#ddd" : "#333",
    },
  };
}
