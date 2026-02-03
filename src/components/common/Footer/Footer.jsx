import React, { useState } from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setMsg("");
    const value = email.trim();
    if (!value) {
      setMsg("Please enter your email.");
      return;
    }
    const list = JSON.parse(localStorage.getItem("noise_newsletter") || "[]");
    list.unshift({ email: value, createdAt: new Date().toISOString() });
    localStorage.setItem("noise_newsletter", JSON.stringify(list.slice(0, 50)));
    setEmail("");
    setMsg("Subscribed! You'll receive updates soon.");
  };

  return (
    <footer className={styles.footer} aria-label="Footer">
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img
              src="/logoTitle.png"
              alt="Noise"
              className={styles.logo}
              loading="lazy"
            />
            <p className={styles.tagline}>
              India’s trusted smart wearable brand. Discover smart watches,
              earbuds and more.
            </p>

            <form className={styles.newsletter} onSubmit={onSubmit}>
              <label className={styles.newsLabel}>Get updates & offers</label>
              <div className={styles.newsRow}>
                <input
                  className={styles.newsInput}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
                <button className={styles.newsBtn} type="submit">
                  Subscribe
                </button>
              </div>
              {msg && <p className={styles.newsMsg}>{msg}</p>}
            </form>

            <div className={styles.social}>
              <a className={styles.socialLink} href="#" aria-label="Instagram">
                IG
              </a>
              <a className={styles.socialLink} href="#" aria-label="YouTube">
                YT
              </a>
              <a className={styles.socialLink} href="#" aria-label="Facebook">
                FB
              </a>
              <a className={styles.socialLink} href="#" aria-label="Twitter">
                X
              </a>
            </div>
          </div>

          <div className={styles.cols}>
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Products</h4>
              <a className={styles.link} href="#smart-watches">
                Smart Watches
              </a>
              <a className={styles.link} href="#earbuds">
                Earbuds
              </a>
              <a className={styles.link} href="#new">
                New Arrivals
              </a>
              <a className={styles.link} href="#bestsellers">
                Bestsellers
              </a>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Support</h4>
              <a className={styles.link} href="#track">
                Track Order
              </a>
              <a className={styles.link} href="#support">
                Help Center
              </a>
              <a className={styles.link} href="#warranty">
                Warranty
              </a>
              <a className={styles.link} href="#returns">
                Returns
              </a>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Company</h4>
              <a className={styles.link} href="#about">
                About Noise
              </a>
              <a className={styles.link} href="#careers">
                Careers
              </a>
              <a className={styles.link} href="#stores">
                Stores
              </a>
              <a className={styles.link} href="#press">
                Press
              </a>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Policies</h4>
              <a className={styles.link} href="#privacy">
                Privacy Policy
              </a>
              <a className={styles.link} href="#terms">
                Terms & Conditions
              </a>
              <a className={styles.link} href="#shipping">
                Shipping Policy
              </a>
              <a className={styles.link} href="#refund">
                Refund Policy
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Noise (Demo). All rights reserved.
          </p>
          <div className={styles.payments}>
            <span className={styles.pay}>VISA</span>
            <span className={styles.pay}>Mastercard</span>
            <span className={styles.pay}>UPI</span>
            <span className={styles.pay}>RuPay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
