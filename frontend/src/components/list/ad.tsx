import React, {useMemo} from "react";
import type {Ad} from "../../serverCalls/ads.ts";
import getAdStyles from "./styles/ad.ts";
import {useDarkmode} from "../../store/storage.ts";
import {useNavigate} from "react-router-dom";

export default function AdComponent(props: Ad) {

  /**
   * Parses text that is received from the server to a readable text
   * */
  const timeToText = (time: string): string => {
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
      return `${minutes} ${declOfNum(minutes, ["минута", "минуты", "минут"])} назад`;
    }

    if (timePassedSec < 60 * 60 * 24) {
      const hours = Math.floor(timePassedSec / 3600);
      return `${hours} ${declOfNum(hours, ["час", "часа", "часов"])} назад`;
    }

    if (timePassedSec < 60 * 60 * 24 * 30) {
      const days = Math.floor(timePassedSec / (60 * 60 * 24));
      return `${days} ${declOfNum(days, ["день", "дня", "дней"])} назад`;
    }

    if (timePassedSec < 60 * 60 * 24 * 365) {
      const months = Math.floor(timePassedSec / (60 * 60 * 24 * 30));
      return `${months} ${declOfNum(months, ["месяц", "месяца", "месяцев"])} назад`;
    }

    const years = Math.floor(timePassedSec / (60 * 60 * 24 * 365));
    return `${years} ${declOfNum(years, ["год", "года", "лет"])} назад`;
  };

  const [isDarkmode] = useDarkmode();
  const styles = useMemo(() => getAdStyles(isDarkmode), [isDarkmode]);
  const navigate = useNavigate();

  const redirectToItemPage = () => {
    navigate(`/item/${props.id}`);
  }

  return (
    <div style={styles.card}>
      <div>
        <img alt={`${props.id} ad image`} src={props.images[0]} style={styles.image} />
      </div>
      <div style={styles.content}>
        <div style={styles.titleBox}>
          <p style={styles.title}>{props.title}</p>
          <span style={{...styles.urgent, display: props.priority === 'urgent' ? 'flex' : 'none'}}>Срочно</span>
        </div>
        <div>
          <p style={styles.price}>{props.price} ₽</p>
          <p style={styles.meta}>
            <span>{props.category}</span> &middot; <span>{timeToText(props.createdAt)}</span>
          </p>
        </div>
        <button
          style={styles.button}
          onClick={redirectToItemPage}
        >Открыть</button>
      </div>
    </div>
  )
}