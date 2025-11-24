import React from "react";
import type { ModerationHistory } from "../../serverCalls/ads.ts";
import getModerationHistoryStyles from "./styles/moderationHistory.ts";
import { useDarkmode } from "../../store/storage.ts";

interface Props {
  history: ModerationHistory[];
}

export default function ModerationHistory({ history }: Props) {
  const [isDarkmode] = useDarkmode();
  const styles = getModerationHistoryStyles(isDarkmode);

  const getPrettyDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getDate()}.${String(date.getMonth() + 1)}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };

  const getPrettyStatus = (stat: ModerationHistory["action"]) => {
    const enToRuPretty = new Map<string, string>([
      ["requestChanges", "Запрошены изменения"],
      ["approved", "Одобрено"],
      ["rejected", "Отклонено"],
    ]);
    return enToRuPretty.get(stat) ?? "";
  };

  if (history.length === 0) {
    return (
      <div style={styles.container}>
        <p>Объявление не модерировалось</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {history.map((ad, idx) => (
        <div key={idx} style={styles.entry}>
          <div style={styles.header}>
            <span style={styles.moderator}>Модератор: {ad.moderatorName}</span>
            <span style={styles.date}>{getPrettyDate(ad.timestamp)}</span>
          </div>
          <p style={styles.status}>Статус: {getPrettyStatus(ad.action)}</p>
          <p style={styles.reason}><b>Причина:</b> {ad.reason}</p>
          <p style={styles.comment}>{ad.comment}</p>
        </div>
      ))}
    </div>
  );
}
