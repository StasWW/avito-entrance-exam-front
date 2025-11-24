import React, {useMemo} from "react";
import OopsieCat from "../../public/oopsieCat.jpg";
import geErrorComponentStyles from "./list/styles/errorComponent.ts";
import {useDarkmode} from "../store/storage.ts";
import {useNavigate} from "react-router-dom";

interface ErrorComponentProps {
  title?: string,
  subTitle?: string,
  errorCode?: string | number,
  showGoHome?: boolean,
}

export default function ErrorComponent(props: ErrorComponentProps) {
  const [isDarkmode] =  useDarkmode();
  const styles = useMemo(() => geErrorComponentStyles(isDarkmode), [isDarkmode]);
  const navigate = useNavigate();

  const redirectToHomePage = () => {
    navigate('/');
  }

  return (
    <div>
      <p style={styles.errorTitle}>{props.title ?? 'Упси!'} {props.errorCode ?? ''}</p>
      <p style={styles.errorSubTitle}>{props.subTitle ?? 'По вашему запросу ничего не нашли'}</p>
      <img src={OopsieCat} alt='Oopsie cat' style={styles.errorImg}/>
      <button
        style={{...styles.button, display: props.showGoHome ? 'block' : 'none'}}
        onClick={redirectToHomePage}
      >Домой</button>
    </div>
  );
}