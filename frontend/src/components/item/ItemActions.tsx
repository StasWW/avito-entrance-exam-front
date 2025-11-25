import React from "react";

interface Props {
  styles: any;
  onApprove: () => void;
  onReject: () => void;
  onRequestChanges: () => void;
}

export default function ItemActions({ styles, onApprove, onReject, onRequestChanges }: Props) {
  return (
    <section style={styles.actions.section}>
      <button style={{ ...styles.actions.button, ...styles.actions.approve }} onClick={onApprove}>
        &#10003; Одобрить
      </button>
      <button style={{ ...styles.actions.button, ...styles.actions.reject }} onClick={onReject}>
        &#10005; Отклонить
      </button>
      <button style={{ ...styles.actions.button, ...styles.actions.reject }} onClick={onRequestChanges}>
        &#8635; Доработка
      </button>
    </section>
  );
}
