import React, { useMemo } from "react";
import { useDarkmode } from '../store/storage.ts';
import getNotificationStyles from "./item/styles/notification.ts";

interface Props {
  title: string;
  text: string;
}

export default function Notification({ title, text }: Props) {
  const [isDarkmode] = useDarkmode();
  const styles = useMemo(() => getNotificationStyles(isDarkmode), [isDarkmode]);

  return (
    <div style={styles.container}>
      <p style={styles.title}>{title}</p>
      <p style={styles.text}>{text}</p>
    </div>
  );
}
