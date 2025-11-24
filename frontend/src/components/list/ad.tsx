import React, {useMemo} from "react";
import type {Ad} from "../../serverCalls/ads.ts";
import getAdStyles from "./styles/ad.ts";
import {useDarkmode} from "../../store/storage.ts";
import {useNavigate} from "react-router-dom";
import {timeToText} from "../../pages/actions/adStringsFormatters.ts";

export default function AdComponent(props: Ad) {

  const [isDarkmode] = useDarkmode();
  const styles = useMemo(() => getAdStyles(isDarkmode), [isDarkmode]);
  const navigate = useNavigate();

  const statuses = [
    { value: "pending", color: isDarkmode ? "#252525" : "#cfcfcf" },
    { value: "drafted", color: isDarkmode ? "#b59f00" : "#FFD700" },
    { value: "approved", color: isDarkmode ? "#2e8b57" : "#32CD32" },
    { value: "rejected", color: isDarkmode ? "#b22222" : "#FF4500" },
  ];

  const currentStatus = statuses.find(s => s.value === props?.status);


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
          <div style={styles.labelBox}>
            <span style={{...styles.urgent, display: props.priority === 'urgent' ? 'flex' : 'none'}}>Срочно</span>
            <div
              style={{
                ...styles.status,
                backgroundColor: currentStatus?.color ?? styles.status.backgroundColor,
              }}
            >
            </div>
          </div>
        </div>
        <div>
          <p style={styles.price}>{props.price} ₽</p>
          <p style={styles.meta}>
            <span>{props.category}</span> &middot; <span>{timeToText(props.createdAt)} назад</span>
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