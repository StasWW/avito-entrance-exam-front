import React, { useState } from "react";
import { approveAd, rejectAd, requestChangesAd } from "../../pages/actions/changeAdStatus.ts";
import getConfirmationModalStyles from "./styles/confirmationModal.ts";
import { useDarkmode } from "../../store/storage.ts";

interface Props {
  action: "approve" | "reject" | "request-changes";
  id: string;
  display: boolean;
}

export default function ConfirmationModal({ action, id, display }: Props) {
  const [isError, setIsError] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [comment, setComment] = useState("");
  const [isDarkmode] = useDarkmode();
  const styles = getConfirmationModalStyles(isDarkmode);

  if (!display) return null;

  const handleConfirm = () => {
    if (action === "approve") {
      approveAd(id).catch(() => setIsError(true));
    } else if (action === "reject") {
      const reason = rejectReason === "Другое" ? customReason : rejectReason;
      rejectAd(id, reason, comment).catch(() => setIsError(true));
    } else if (action === "request-changes") {
      requestChangesAd(id, comment ? "Изменения требуются" : "", comment).catch(() => setIsError(true));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {action === "reject" ? (
          <>
            <h1 style={styles.header}>Укажите причину отклонения</h1>
            <select
              style={styles.select}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            >
              <option value="">-- выберите причину --</option>
              <option value="Запрещенный товар">Запрещенный товар</option>
              <option value="Неверная категория">Неверная категория</option>
              <option value="Товар не соответствует фото">Товар не соответствует фото</option>
              <option value="Другое">Другое</option>
            </select>
            {rejectReason === "Другое" && (
              <input
                style={styles.input}
                type="text"
                placeholder="Введите причину"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
              />
            )}
            <textarea
              style={styles.input}
              placeholder="Комментарий (необязательно)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button style={styles.button} onClick={handleConfirm}>
              Отклонить
            </button>
          </>
        ) : action === "request-changes" ? (
          <>
            <h1 style={styles.header}>Укажите комментарий для изменений</h1>
            <textarea
              style={styles.input}
              placeholder="Комментарий"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button style={styles.button} onClick={handleConfirm}>
              Запросить изменения
            </button>
          </>
        ) : (
          <>
            <h1 style={styles.header}>Вы уверены?</h1>
            <button style={styles.button} onClick={handleConfirm}>
              Да
            </button>
          </>
        )}
        {isError && <p style={styles.error}>Ошибка при выполнении действия</p>}
      </div>
    </div>
  );
}
