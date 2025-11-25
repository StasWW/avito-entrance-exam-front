import React, { useState } from "react";
import { approveAd, rejectAd, requestChangesAd } from "../../pages/actions/changeAdStatus.ts";
import getConfirmationModalStyles from "./styles/confirmationModal.ts";
import { useDarkmode } from "../../store/storage.ts";

interface Props {
  action: "approve" | "reject" | "request-changes";
  id: string;
  display: boolean;
  onClose: (msg?: string) => void;
  openNotification: (title: string, text: string) => void;
}

export default function ConfirmationModal({ action, id, display, onClose, openNotification }: Props) {
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');
  const [rejectReason, setRejectReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [comment, setComment] = useState("");
  const [isDarkmode] = useDarkmode();
  const styles = getConfirmationModalStyles(isDarkmode);

  if (!display) return null;

  const handleErrorResponses = (e: string) => {
    if (e === '404') setErrorText('Такого объявления не существует!');
    else if (e === '500') setErrorText('Ошибка сервиса, повторите попытку позже')
    else setErrorText(`${e}, Что-то не так, обратитесь в поддержку`)
  }


  const handleConfirm = async () => {
    let success = false;

    try {
      if (action === "approve") {
        await approveAd(id);
        success = true;
      } else if (action === "reject") {
        const reason = rejectReason === "Другое" ? customReason : rejectReason;
        await rejectAd(id, reason, comment);
        success = true;
      } else if (action === "request-changes") {
        await requestChangesAd(id, comment);
        success = true;
      }
    } catch (e: any) {
      handleErrorResponses(e);
      success = false;
    }

    if (success) {
      setSuccessText('Перенаправляем вас дальше')
      setTimeout(() => {
        onClose("success");
      }, 1000)
    }
  };

  if (successText) openNotification('Успешно', successText);

  const handleCancel = () => {
    onClose();
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <button style={styles.cross} onClick={handleCancel}>
          &#10005;
        </button>

        {action === "reject" ? (
          <>
            <h1 style={styles.header}>Укажите причину отклонения</h1>
            <select
              style={styles.select}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              required
            >
              <option value="">-- Выберите причину --</option>
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

        {errorText && <p style={styles.error}>{errorText}</p>}
      </div>
    </div>
  );
}
