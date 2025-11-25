import React from "react";
import type { Ad } from "../../serverCalls/ads.ts";

interface Props {
  ad: Ad;
  styles: any;
  currentStatus: { ru: string; color: string };
}

export default function ItemHeader({ ad, styles, currentStatus }: Props) {
  return (
    <div style={styles.headerBox}>
      <h1 style={styles.title}>{ad.title}</h1>
      <div style={styles.labelBox}>
        <span
          style={{
            ...styles.status,
            backgroundColor: currentStatus.color ?? styles.status.backgroundColor,
          }}
        >
          {currentStatus.ru}
        </span>
        {ad.priority === "urgent" && (
          <span style={styles.urgency}>Срочно</span>
        )}
      </div>
    </div>
  );
}
