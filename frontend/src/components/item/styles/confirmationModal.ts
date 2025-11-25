import type { CSSProperties } from "react";

export interface ConfirmationModalStyles {
  cross: CSSProperties;
  container: CSSProperties;
  content: CSSProperties;
  header: CSSProperties;
  button: CSSProperties;
  error: CSSProperties;
  select: CSSProperties;
  input: CSSProperties;
}

export default function getConfirmationModalStyles(isDarkmode: boolean): ConfirmationModalStyles {
  const baseText = isDarkmode ? "#f5f5f5" : "#222";
  const bg = isDarkmode ? "#1e1e24" : "#fafafa";
  const borderColor = isDarkmode ? "#555" : "#ccc";

  return {
    cross: {
      position: "absolute",
      top: 10,
      right: 10,
      width: 40,
      height: 40,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: bg,
      color: baseText,
      borderRadius: "50%",
      fontSize: "1.2rem",
      fontWeight: 700,
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
    },
    container: {
      boxSizing: 'border-box',
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
    },
    content: {
      width: "90%",
      maxWidth: "600px",
      backgroundColor: bg,
      color: baseText,
      borderRadius: "8px",
      padding: "2rem",
      boxSizing: "border-box",
      boxShadow: isDarkmode ? "0 0 20px rgba(0,0,0,0.8)" : "0 0 20px rgba(0,0,0,0.2)",
    },
    header: {
      fontSize: "1.4rem",
      fontWeight: 600,
      marginBottom: "1rem",
    },
    button: {
      marginTop: "1rem",
      padding: "0.75rem 1.25rem",
      borderRadius: "4px",
      cursor: "pointer",
      backgroundColor: isDarkmode ? "#2e8b57" : "#32CD32",
      color: "#fff",
      transition: "background-color 0.3s ease, transform 0.2s ease",
    },
    error: {
      marginTop: "0.5rem",
      color: "red",
      fontSize: "0.9rem",
    },
    select: {
      width: "100%",
      height: "40px",
      padding: "0 0.5rem",
      marginBottom: "0.5rem",
      borderRadius: "4px",
      border: `1px solid ${borderColor}`,
      backgroundColor: isDarkmode ? "#2a2a2a" : "#fff",
      color: baseText,
      transition: "border-color 0.3s ease, background-color 0.3s ease",
    },
    input: {
      boxSizing: 'border-box',
      width: "100%",
      height: "40px",
      padding: "0.5rem 0.5rem",
      marginTop: "0.5rem",
      borderRadius: "4px",
      border: `1px solid ${borderColor}`,
      backgroundColor: isDarkmode ? "#2a2a2a" : "#fff",
      color: baseText,
      transition: "border-color 0.3s ease, background-color 0.3s ease",
    },
  };
}
