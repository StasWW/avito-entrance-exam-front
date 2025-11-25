import React, { useMemo } from "react";
import { useDarkmode } from "../../store/storage.ts";
import { blockStatsGetStyle } from "./styles/blockStats.ts";

interface BlockStatsProps {
  title: string;
  value: number | string;
  isPercentage?: boolean;
}

export default function BlockStats({ title, value, isPercentage = false }: BlockStatsProps) {
  const [isDarkmode] = useDarkmode();
  const styles = useMemo(() => blockStatsGetStyle(isDarkmode), [isDarkmode]);

  const displayValue = (isPercentage && typeof value === 'number') ? value.toFixed(2) : value

  return (
    <div style={styles.container}>
      <h4 style={styles.title}>{title}</h4>
      <p style={styles.value}>{displayValue}</p>
    </div>
  );
}
