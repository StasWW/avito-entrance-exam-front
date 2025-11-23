import { type CSSProperties } from "react";

interface AdsPlaceholderStyles {
  errorTitle: CSSProperties;
  errorSubTitle: CSSProperties;
  errorImg: CSSProperties,
}

export default function getAdsPlaceholderStyles(isDarkmode: boolean): AdsPlaceholderStyles {
  const colors = {
    title: isDarkmode ? "#ff6b6b" : "#d32f2f",
    subTitle: isDarkmode ? "#aaa" : "#555",
  };

  return {
    errorTitle: {
      color: colors.title,
      margin: "0 0 12px 0",
      fontSize: "4rem",
      fontWeight: 700,
      fontFamily: "'Inter','Segoe UI',sans-serif",
      textAlign: "center",
      letterSpacing: "0.5px",

    },
    errorSubTitle: {
      color: colors.subTitle,
      fontSize: "1.2rem",
      fontWeight: 400,
      fontFamily: "'Inter','Segoe UI',sans-serif",
      textAlign: "center",
      lineHeight: 1.5,
    },
    errorImg: {
      display: 'block',
      margin: '20px auto',
      width: 200,
      height: 'auto',
    }
  };
}
