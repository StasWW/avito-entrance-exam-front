import React, {useEffect, useMemo} from "react";
import { useDarkmode } from '../store/storage.ts';
import getNotificationStyles from "./item/styles/notification.ts";

interface Props {
  title: string;
  text: string;
  closingTime?: number;
  onClose: () => void;
}

export default function Notification({ title, text, onClose, closingTime }: Props) {
  const [isDarkmode] = useDarkmode();
  const styles = useMemo(() => getNotificationStyles(isDarkmode), [isDarkmode]);

  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, closingTime ?? 3000)
  }, []);

  return (
    <div style={styles.container}>
      <p style={styles.title}>{title}</p>
      <p style={styles.text}>{text}</p>
    </div>
  );
}
