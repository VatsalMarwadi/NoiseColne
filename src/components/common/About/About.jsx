import React from "react";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.about} aria-label="About Noise">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Built for smart living</h2>
          <p className={styles.subtitle}>
            From fitness to productivity, Noise helps you stay connected with
            smart wearables designed for everyday life.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Smart Watches</h3>
            <p className={styles.cardText}>
              AMOLED displays, BT calling, health tracking and 100+ watch faces.
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Wireless Audio</h3>
            <p className={styles.cardText}>
              ANC earbuds, gaming modes and all-day comfort for every vibe.
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Trusted Experience</h3>
            <p className={styles.cardText}>
              Fast shipping, easy support and products loved by millions of
              users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
