import React, {useEffect, useState} from "react";
import Filters from "../components/list/filters.tsx";
import AdsPlaceholder from "../components/list/adsPlaceholder.tsx";
import Footer from "../components/list/footer.tsx";
import listGetStyle from "./styles/list.ts";
import {useDarkmode} from "../store/storage.ts";
import Header from "../components/list/header.tsx";
import loadAds, { getSavedSearchParams } from "./actions/loadAds.ts";

export default function List() {
  const [isDarkmode] = useDarkmode();
  const [savedParams] = useState(getSavedSearchParams());

  useEffect(() => {
    const root = document.getElementById("root");
    const body = document.getElementById("body");
    if (root) {
      root.style.backgroundColor = isDarkmode ? "#121212" : "#ffffff";
      root.style.transition = "background-color 0.3s ease";
    }
    if (body) {
      body.style.backgroundColor = isDarkmode ? "#121212" : "#ffffff";
      body.style.transition = "background-color 0.3s ease";
    }
  }, [isDarkmode]);

  useEffect(() => {
    loadAds(savedParams ?? {});
  }, []);

  const style = listGetStyle();
  return (
    <div id="app" style={style.container}>
      <Header />
      <Filters />
      <AdsPlaceholder />
      <Footer />
    </div>
  );
}
