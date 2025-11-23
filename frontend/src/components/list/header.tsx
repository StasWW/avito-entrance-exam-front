import React, {useMemo} from 'react';
import {useDarkmode} from "../../store/storage.ts";
import darkModeIcon from "../../../public/darkmodeIcon.png";
import lightModeIcon from "../../../public/lightmodeIcon.png";
import getHeaderStyle from "./styles/header.ts";

export default function Header() {
  const [isDarkmode, toggleDarkmode] = useDarkmode();
  const styles = useMemo(() => getHeaderStyle(isDarkmode), [isDarkmode]);

  return (
    <header style={styles.container}>
      <label style={styles.switch}>
        <input
          type="checkbox"
          checked={isDarkmode}
          onChange={toggleDarkmode}
          style={styles.input}
        />
        <span style={{ ...styles.slider, ...styles.round }}>
          <span style={styles.sliderBefore} />
          <img
            src={darkModeIcon}
            alt="Moon icon"
            style={styles.iconLeft}
          />
          <img
            src={lightModeIcon}
            alt="Sun icon"
            style={styles.iconRight}
          />
        </span>
      </label>
    </header>
  );
}

