import React from "react";

interface Props {
  styles: any;
  goHome: () => void;
  handlePrevAd: () => void;
  handleNextAd: () => void;
}

export default function ItemNav({ styles, goHome, handlePrevAd, handleNextAd }: Props) {
  return (
    <nav style={styles.nav.section}>
      <a style={styles.nav.link} onClick={goHome}>
        ← К списку
      </a>
      <span>
        <a style={styles.nav.link} onClick={handlePrevAd}>← Пред.</a> |{" "}
        <a style={styles.nav.link} onClick={handleNextAd}>След. →</a>
      </span>
    </nav>
  );
}
