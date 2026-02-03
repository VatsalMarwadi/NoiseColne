import React, { useState, useEffect } from "react";
import styles from "./Banner.module.css";

import slider1 from "../../assets/slider1.png";
import slider2 from "../../assets/slider2.png";
import slider3 from "../../assets/slider3.png";
import slider4 from "../../assets/slider4.png";

const SLIDES = [
  { image: slider1, link: "#smart-watches" },
  { image: slider2, link: "#amoled" },
  { image: slider3, link: "#earbuds" },
  { image: slider4, link: "#new" },
];

const AUTOPLAY_MS = 5000;

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index) => setActiveIndex(index);
  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setActiveIndex((prev) => (prev + 1) % SLIDES.length);

  return (
    <section className={styles.banner} aria-label="Hero slider">
      <div className={styles.slider}>
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === activeIndex ? styles.slideActive : ""
            }`}
            aria-hidden={index !== activeIndex}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={styles.slideImage}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className={styles.dots} role="tablist" aria-label="Slide navigation">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to slide ${index + 1}`}
            className={`${styles.dot} ${
              index === activeIndex ? styles.dotActive : ""
            }`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
