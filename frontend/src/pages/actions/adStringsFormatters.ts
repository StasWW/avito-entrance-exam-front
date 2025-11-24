/**
 * Parses text that is received from the server to a readable text
 * */
export const timeToText = (time: string): string => {
  const unixTime = Date.parse(time);
  const unixDateNow = Date.now();
  const timePassedSec = Math.floor((unixDateNow - unixTime) / 1000);

  // Сложная штука, для определения склонения
  const declOfNum = (n: number, titles: [string, string, string]) => {
    return titles[
      n % 10 === 1 && n % 100 !== 11
        ? 0
        : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
          ? 1
          : 2
      ];
  };

  if (timePassedSec < 60) return "Только что";

  if (timePassedSec < 3600) {
    const minutes = Math.floor(timePassedSec / 60);
    return `${minutes} ${declOfNum(minutes, ["минута", "минуты", "минут"])}`;
  }

  if (timePassedSec < 60 * 60 * 24) {
    const hours = Math.floor(timePassedSec / 3600);
    return `${hours} ${declOfNum(hours, ["час", "часа", "часов"])}`;
  }

  if (timePassedSec < 60 * 60 * 24 * 30) {
    const days = Math.floor(timePassedSec / (60 * 60 * 24));
    return `${days} ${declOfNum(days, ["день", "дня", "дней"])}`;
  }

  if (timePassedSec < 60 * 60 * 24 * 365) {
    const months = Math.floor(timePassedSec / (60 * 60 * 24 * 30));
    return `${months} ${declOfNum(months, ["месяц", "месяца", "месяцев"])}`;
  }

  const years = Math.floor(timePassedSec / (60 * 60 * 24 * 365));
  return `${years} ${declOfNum(years, ["год", "года", "лет"])}`;
};
