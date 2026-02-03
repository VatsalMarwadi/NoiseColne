import React, { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus("");

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setStatus("Please fill all fields.");
      return;
    }

    // Store contact queries locally (demo)
    const key = "noise_contact_messages";
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    prev.unshift({
      id: crypto?.randomUUID?.() || String(Date.now()),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(key, JSON.stringify(prev.slice(0, 50)));

    setForm({ name: "", email: "", message: "" });
    setStatus("Thanks! We received your message.");
  };

  return (
    <section className={styles.contact} aria-label="Contact and Support">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Need help?</h2>
          <p className={styles.subtitle}>
            Reach out to us for support, order queries, or product help.
          </p>
        </div>

        <div className={styles.layout}>
          <div className={styles.info}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Support</h3>
              <p className={styles.infoText}>
                Mon–Sat, 10:00 AM – 7:00 PM
              </p>
              <a className={styles.infoLink} href="mailto:support@example.com">
                support@example.com
              </a>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Call Us</h3>
              <p className={styles.infoText}>Quick help for orders & service</p>
              <a className={styles.infoLink} href="tel:+919876543210">
                +91 98765 43210
              </a>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Address</h3>
              <p className={styles.infoText}>
                Noise (Demo)
                <br />
                123, Main Street, Mumbai
              </p>
            </div>
          </div>

          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Write to us</h3>
              <p className={styles.formSubtitle}>
                We’ll get back within 24–48 hours.
              </p>
            </div>

            {status && <p className={styles.status}>{status}</p>}

            <label className={styles.label}>
              Name
              <input
                className={styles.input}
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your name"
              />
            </label>

            <label className={styles.label}>
              Email
              <input
                className={styles.input}
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
              />
            </label>

            <label className={styles.label}>
              Message
              <textarea
                className={styles.textarea}
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="How can we help?"
                rows={5}
              />
            </label>

            <button type="submit" className={styles.submit}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
