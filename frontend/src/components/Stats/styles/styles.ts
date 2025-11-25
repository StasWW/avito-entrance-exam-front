import type { CSSProperties } from "react";

interface ModBioStyle {
  container: CSSProperties;
  image: CSSProperties;
  name: CSSProperties;
  status: CSSProperties;
  mail: CSSProperties;
  permissionsContainer: CSSProperties;
  permissionPill: CSSProperties;
}

export default function getModBioStyles(isDarkmode: boolean): ModBioStyle {
  return {
    container: {
      margin: "10px auto",
      padding: "16px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      borderRadius: "8px",
      backgroundColor: isDarkmode ? "rgb(28, 28, 36)" : "#f5f5f5",
      color: isDarkmode ? "#eee" : "#333",
      maxWidth: "600px",
    },
    image: {
      width: 96,
      height: 96,
      borderRadius: "50%",
      objectFit: "cover",
      border: `2px solid ${isDarkmode ? "#444" : "#ccc"}`,
    },
    name: {
      fontSize: "2rem",
      fontWeight: "bold",
      margin: 0,
    },
    status: {
      fontSize: "14px",
      margin: 0,
      color: isDarkmode ? "#aaa" : "#666",
    },
    mail: {
      fontSize: "1rem",
      margin: "4px 0",
      color: isDarkmode ? "#dddddd" : "#a6a6a6",
      textDecorationStyle: 'solid',
    },
    permissionsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginTop: "8px",
    },
    permissionPill: {
      padding: "4px 10px",
      borderRadius: "20px",
      backgroundColor: isDarkmode ? "#555" : "#ddd",
      color: isDarkmode ? "#eee" : "#333",
      fontSize: "12px",
      fontWeight: 500,
    },
  };
}
