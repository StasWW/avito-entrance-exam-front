import React, {useEffect} from "react";
import Filters from "../components/list/filters.tsx";
import Ads from "../components/list/ads.tsx";
import Footer from "../components/list/footer.tsx";
import listGetStyle from "./styles/list.ts";
import {useDarkmode} from "../store/storage.ts";

export default function List() {
  const isDarkmode = useDarkmode();

  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.backgroundColor = isDarkmode ? "#121212" : "#ffffff";
      root.style.transition = "background-color 0.3s ease";
    }
  }, [isDarkmode]);

  const style = listGetStyle();
  return (
    <div id='app' style={style.container}>
      <Filters />
      <Ads />
      <Footer />
    </div>
  )
}