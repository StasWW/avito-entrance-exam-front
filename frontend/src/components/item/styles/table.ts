import type {CSSProperties} from "react";

interface TableStyles {
  table: CSSProperties;
  th: CSSProperties;
  td: CSSProperties;
}

export default function getTableStyles(isDarkmode: boolean): TableStyles {
  const borderColor = isDarkmode ? "#444" : "#ccc";

  return {
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "1rem",
      marginBottom: "1rem",
    },
    th: {
      textAlign: "left",
      padding: "0.5rem 0.75rem",
      borderBottom: `1px solid ${borderColor}`,
      fontWeight: 600,
      width: "30%",
      background: isDarkmode ? "#2a2a33" : "#f9f9fb",
    },
    td: {
      padding: "0.5rem 0.75rem",
      borderBottom: `1px solid ${borderColor}`,
    },
  }
}