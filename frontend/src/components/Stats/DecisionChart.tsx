import React from "react";

interface Props {
  data: {
    approved: number;
    rejected: number;
    requestChanges: number;
  };
}

export default function DecisionChart({ data }: Props) {
  const items = [
    { label: "Одобрено", value: data.approved, color: "#4caf50" },
    { label: "Отклонено", value: data.rejected, color: "#f44336" },
    { label: "Доработка", value: data.requestChanges, color: "#ff9800" },
  ];

  return (
    <div className="decisionChart">
      <h3>Распределение решений</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ minWidth: "120px" }}>{item.label}</span>
            <div
              style={{
                height: "20px",
                width: `${item.value}%`,
                backgroundColor: item.color,
                borderRadius: "4px",
              }}
            />
            <span>{item.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
