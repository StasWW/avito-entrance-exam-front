import React, {useMemo} from 'react';
import {useDarkmode} from "../../store/storage.ts";
import darkModeIcon from "../../../public/darkmodeIcon.png";
import lightModeIcon from "../../../public/lightmodeIcon.png";
import getHeaderStyle from "./styles/header.ts";
import {useNavigate} from "react-router-dom";
import defaultPfp from "../../../public/defaultPfp.jpg";

export default function Header() {
  const [isDarkmode, toggleDarkmode] = useDarkmode();
  const styles = useMemo(() => getHeaderStyle(isDarkmode), [isDarkmode]);
  const navigate = useNavigate();

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
      <button
        onClick={() => navigate('/stats')}
        style={styles.button}
      >
        <img src={defaultPfp} alt='Pfp' style={styles.pfp} />
      </button>
    </header>
  );
}

