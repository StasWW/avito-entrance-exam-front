import React, { useMemo } from "react";
import { useDarkmode } from "../../store/storage.ts";
import getModBioStyles from "./styles/styles.ts";

type Permission = "approve_ads" | "reject_ads" | "request_changes" | "view_stats";

interface Props {
  image: string;
  name: string;
  email: string;
  status: string;
  permissions: Permission[];
}

const permissionLabels: Record<Permission, string> = {
  approve_ads: "Одобрение объявлений",
  reject_ads: "Отклонение объявлений",
  request_changes: "Запрос изменений",
  view_stats: "Просмотр статистики",
};

export default function ModBio({ image, name, email, status, permissions }: Props) {
  const [isDarkmode] = useDarkmode();
  const styles = useMemo(() => getModBioStyles(isDarkmode), [isDarkmode]);

  return (
    <div style={styles.container}>
      <img src={image} alt="pfp" style={styles.image} />
      <div>
        <h1 style={styles.name}>{name}</h1>
        <p style={styles.status}>{status}</p>
        <a href={`mailto:${email}`} style={styles.mail}>{email}</a>
        <div style={styles.permissionsContainer}>
          {permissions.map((perm) => (
            <span key={perm} style={styles.permissionPill}>
              {permissionLabels[perm]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
