import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Ad } from "../serverCalls/ads.ts";
import { useAds, useAdIds, useDarkmode, usePagination } from "../store/storage.ts";
import { getAdById } from "../serverCalls/ads.ts";
import ErrorComponent from "../components/errorComponent.tsx";
import getItemStyle from "./styles/item.ts";
import ConfirmationModal from "../components/item/modalConfirmation.tsx";
import Notification from "../components/notification.tsx";

import ItemHeader from "../components/item/ItemHeader.tsx";
import ItemHistory from "../components/item/ItemHistory.tsx";
import ItemDescription from "../components/item/ItemDescription.tsx";
import ItemActions from "../components/item/ItemActions.tsx";
import ItemNav from "../components/item/ItemNav.tsx";

export default function ItemPage() {
  const [ads] = useAds();
  const ids = useAdIds();
  const [ad, setAd] = useState<Ad | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [errorCode, setErrorCode] = useState("");
  const [notificationText, setNotificationText] = useState<{ title: string; text: string } | undefined>(undefined);
  const { id } = useParams();
  const { pagination, setCurrentPage } = usePagination();
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
    const found = ads.find((a) => a.id === Number(id));
    if (found) return found;
    return await getAdById(id);
  };

  const goHome = () => navigate(`/?p=${pagination.currentPage}`);

  const goToAd = (adId: number) => {
    navigate(`/item/${adId}`);
  };

  const handleNextAd = () => {
    if (!ad) return;
    const currentIndex = ids.findIndex((adId) => adId === ad.id);
    if (currentIndex !== -1 && currentIndex < ids.length - 1) {
      const nextId = ids[currentIndex + 1];
      goToAd(nextId);
    } else {
      if (pagination.currentPage < pagination.totalPages) {
        setCurrentPage(pagination.currentPage + 1);
        navigate(`/?p=${pagination.currentPage + 1}`);
      } else {
        setNotificationText({ title: "Нельзя!", text: "Объявления закончились" });
      }
    }
  };

  const handlePrevAd = () => {
    if (!ad) return;
    const currentIndex = ids.findIndex((adId) => adId === ad.id);
    if (currentIndex > 0) {
      const prevId = ids[currentIndex - 1];
      goToAd(prevId);
    } else {
      if (pagination.currentPage > 1) {
        setCurrentPage(pagination.currentPage - 1);
        navigate(`/?p=${pagination.currentPage - 1}`);
      } else {
        setNotificationText({ title: "Нельзя!", text: "Это первая страница" });
      }
    }
  };

  useEffect(() => {
    if (!id) return;
    loadItemById(id)
      .then(setAd)
      .catch(setErrorCode)
      .finally(() => setIsLoading(false));
  }, [id, ads]);

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<"approve" | "reject" | "request-changes" | null>(null);

  return (
    <div style={styles.background}>
      {isLoading ? (
        <h1>loading...</h1>
      ) : ad ? (
        <div style={styles.container}>
          <ItemHeader ad={ad} styles={styles} currentStatus={currentStatus} />
          <ItemHistory ad={ad} styles={styles} />
          <ItemDescription ad={ad} styles={styles} />
          <ItemActions
            styles={styles}
            onApprove={() => { setModalAction("approve"); setShowModal(true); }}
            onReject={() => { setModalAction("reject"); setShowModal(true); }}
            onRequestChanges={() => { setModalAction("request-changes"); setShowModal(true); }}
          />
          {modalAction && (
            <ConfirmationModal
              action={modalAction}
              id={String(ad.id)}
              display={showModal}
              onClose={(msg) => { setShowModal(false); if (msg === "success") goHome(); }}
              openNotification={(title, text) => setNotificationText({ title, text })}
            />
          )}
          <ItemNav styles={styles} goHome={goHome} handlePrevAd={handlePrevAd} handleNextAd={handleNextAd} />
          {notificationText && <Notification title={notificationText.title} text={notificationText.text} onClose={() => {
            setNotificationText(undefined)
          }} />}
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
