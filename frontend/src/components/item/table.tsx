import type {Characteristics} from "../../serverCalls/ads.ts";
import React, {type JSX, useMemo} from "react";
import getTableStyles from "./styles/table.ts";
import {useDarkmode} from "../../store/storage.ts";

interface tableProps {
  table: Characteristics
}

export default function Table ({table}: tableProps): JSX.Element {
  const [isDarkmode] = useDarkmode();
  const styles = useMemo(() => getTableStyles(isDarkmode), [isDarkmode]);

  const rows = Object.entries(table).map(([key, value]) => (
    <tr key={key}>
      <th style={styles.th}>{key}</th>
      <td style={styles.td}>{value}</td>
    </tr>
  ));
  return <table style={styles.table}>{rows}</table>;
};