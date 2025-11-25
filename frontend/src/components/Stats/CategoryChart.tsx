import React from "react";

interface Props {
  data: { [key: string]: string };
}

export default function CategoryChart({ data }: Props) {
  const max = Math.max(...Object.values(data).map(Number));

  return (
    <div className="categoryChart">
      <h3>Категории объявлений</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {Object.entries(data).map(([category, value]) => {
          const widthPercent = (Number(value) / max) * 100;
          return (
            <div key={category} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ minWidth: "120px" }}>{category}</span>
              <div
                style={{
                  height: "20px",
                  width: `${widthPercent}%`,
                  backgroundColor: "#4caf50",
                  borderRadius: "4px",
                }}
              />
              <span>{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
