import React, { useState } from "react";
import getImageCarouselStyles from "./styles/imagesCarousel.ts";

interface Props {
  images: string[];
}

export default function ImageCarousel({ images }: Props) {
  const [index, setIndex] = useState(0);
  const styles = getImageCarouselStyles();

  const prevImage = () => setIndex(i => (i > 0 ? i - 1 : images.length - 1));
  const nextImage = () => setIndex(i => (i < images.length - 1 ? i + 1 : 0));

  return (
    <div style={styles.container}>
      <div style={styles.dotsBox}>
        { images.map( (_, i) => {
          return (<div style={{...styles.dots, backgroundColor: i === index ? 'white' : 'gray'}}></div>);
        } )}

      </div>
      <img src={images[index]} alt="ad image" style={styles.image} key={index} />
      <button onClick={prevImage} style={styles.buttonLeft} />
      <button onClick={nextImage} style={styles.buttonRight} />
    </div>
  );
}
