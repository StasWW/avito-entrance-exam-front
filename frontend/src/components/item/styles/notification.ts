export default function getNotificationStyles(isDarkmode: boolean) {
  return {
    container: {
      position: "fixed" as const,
      bottom: "20px",
      right: "20px",
      minWidth: "250px",
      maxWidth: "350px",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      backgroundColor: isDarkmode ? "#2c2c2c" : "#ffffff",
      color: isDarkmode ? "#f0f0f0" : "#222222",
      fontFamily: "sans-serif",
      zIndex: 1000,
      transition: "opacity 0.3s ease, transform 0.3s ease",
    },
    title: {
      margin: 0,
      fontWeight: 600,
      fontSize: "16px",
    },
    text: {
      margin: "8px 0 0",
      fontSize: "14px",
      lineHeight: 1.4,
    },
  };
}
