import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import type { Ad } from "../serverCalls/ads.ts";
import { useAds, useDarkmode, usePagination } from "../store/storage.ts";
import { getAdById } from "../serverCalls/ads.ts";
import ErrorComponent from "../components/errorComponent.tsx";
import getItemStyle from "./styles/item.ts";
import { timeToText } from "./actions/adStringsFormatters.ts";
import ImageCarousel from "../components/item/imagesCarousel.tsx";
import ModerationHistory from "../components/item/moderationHistory.tsx";
import Table from "../components/item/table.tsx";
import ConfirmationModal from "../components/item/modalConfirmation.tsx";
import Notification from "../components/notification.tsx";

export default function ItemPage() {
  const [ads] = useAds();
  const [ad, setAd] = useState<Ad | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorCode, setErrorCode] = useState<string>("");
  const [notificationText, setNotificationText] = useState<{ title: string, text: string } | undefined>(undefined);
  const { id } = useParams();
  const { pagination } = usePagination();

  const navigate = useNavigate();

  const [isDarkmode] = useDarkmode();
  const styles = useMemo(() => getItemStyle(isDarkmode), [isDarkmode]);

  const statuses = [
    { ru: "Ожидание", value: "pending", color: isDarkmode ? "#252525" : "#cfcfcf" },
    { ru: "Просмотрено", value: "drafted", color: isDarkmode ? "#b59f00" : "#FFD700" },
    { ru: "Одобрено", value: "approved", color: isDarkmode ? "#2e8b57" : "#32CD32" },
    { ru: "Отклонено", value: "rejected", color: isDarkmode ? "#b22222" : "#FF4500" },
  ];

  const currentStatus = statuses.find((s) => s.value === ad?.status) ?? statuses[0];

  const loadItemById = async (id: string): Promise<Ad> => {
    for (let ad of ads) if (ad.id === Number(id)) return ad;
    return await getAdById(id);
  };

  const goHome = () => {
    navigate(`/?p=${pagination.currentPage}`);
  };


  const handleNextAd = () => {
    if (pagination.currentPage + 1 > pagination.totalPages) {
      setNotificationText({title: 'Нельзя!', text: 'Объявления закончились'});
    }
  }
  const handlePrevAd = () => {

  }

  useEffect(() => {
    if (!id) return;
    loadItemById(id)
      .then((result) => {
        setAd(result);
      })
      .catch((e) => {
        setErrorCode(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<"approve" | "reject" | "request-changes" | null>(null);

  return (
    <div style={styles.background}>
      {isLoading ? (
        <h1>loading...</h1>
      ) : ad ? (
        <div style={styles.container}>
          <div className="header" style={styles.headerBox}>
            <h1 style={styles.title}>{ad.title}</h1>
            <div style={styles.labelBox}>
              <span
                style={{
                  ...styles.status,
                  backgroundColor: currentStatus?.color ?? styles.status.backgroundColor,
                }}
              >
                {currentStatus.ru}
              </span>

              <span
                style={{
                  display: ad.priority === "urgent" ? "inline" : "none",
                  ...styles.urgency,
                }}
              >
                Срочно
              </span>
            </div>
          </div>

          <section style={styles.history.section}>
            <ImageCarousel images={ad.images} />
            <div style={{ width: "100%" }}>
              <h3 style={{ margin: 0 }}>История модерации</h3>
              <ModerationHistory history={ad.moderationHistory} />
            </div>
          </section>

          <section style={styles.description}>
            <h3>Полное описание</h3>
            <Table table={ad.characteristics} />
            <div style={styles.seller.info}>
              <p>{ad.description}</p>
              <h3>О продавце</h3>
              <p>
                Продавец: {ad.seller.name} | {ad.seller.rating}{" "}
                <span style={{ color: "yellow" }}>&#9733;</span>
              </p>
              <p>
                {ad.seller.totalAds} объявлений | На сайте: {timeToText(ad.seller.registeredAt)}
              </p>
            </div>
          </section>

          <section style={styles.actions.section}>
            <button
              style={{ ...styles.actions.button, ...styles.actions.approve }}
              onClick={() => {
                setModalAction("approve");
                setShowModal(true);
              }}
            >
              &#10003; Одобрить
            </button>
            <button
              style={{ ...styles.actions.button, ...styles.actions.reject }}
              onClick={() => {
                setModalAction("reject");
                setShowModal(true);
              }}
            >
              &#10005; Отклонить
            </button>
            <button
              style={{ ...styles.actions.button, ...styles.actions.reject }}
              onClick={() => {
                setModalAction("request-changes");
                setShowModal(true);
              }}
            >
              &#8635; Доработка
            </button>
          </section>

          {modalAction && (
            <ConfirmationModal
              action={modalAction}
              id={String(ad.id)}
              display={showModal}
              onClose={(msg) => {
                setShowModal(false)
                if (msg === 'success') {
                  goHome();
              }}}
              openNotification={(title, text) => setNotificationText({title, text})}
            />
          )}

          <nav style={styles.nav.section}>
            <a style={styles.nav.link} onClick={goHome}>
              ← К списку
            </a>
            <span>
              <a
                style={styles.nav.link}
                onClick={handlePrevAd}
              >← Пред.</a> |{" "}
              <a
                style={styles.nav.link}
                onClick={handleNextAd}
              >След. →</a>
            </span>
          </nav>
        { notificationText && <Notification title={notificationText.title} text={notificationText.text} /> }
        </div>
      ) : (
        <ErrorComponent
          subTitle="Не нашли такого элемента!"
          errorCode={errorCode ? errorCode : undefined}
          showGoHome={true}
        />
      )}
    </div>
  );
}
