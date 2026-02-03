import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./Cart.module.css";
import {
  clearCart,
  getCart,
  getCartSubtotal,
  removeFromCart,
  updateQty,
} from "../../utils/cart";

export default function Cart() {
  const [items, setItems] = useState([]);

  const refresh = () => setItems(getCart());

  useEffect(() => {
    refresh();
    const onUpdate = () => refresh();
    window.addEventListener("cartUpdated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("cartUpdated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const subtotal = useMemo(() => getCartSubtotal(), [items]);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  const formatPrice = (n) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.headerRow}>
            <h1 className={styles.title}>Cart</h1>
            {items.length > 0 && (
              <button className={styles.clearBtn} onClick={() => clearCart()}>
                Clear cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>Your cart is empty</p>
              <p className={styles.emptyText}>
                Add your favourite Noise products and they’ll appear here.
              </p>
              <Link className={styles.shopBtn} to="/">
                Continue shopping
              </Link>
            </div>
          ) : (
            <div className={styles.layout}>
              <section className={styles.items} aria-label="Cart items">
                {items.map((item) => (
                  <div key={item.id} className={styles.item}>
                    <img
                      className={styles.itemImg}
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                    />
                    <div className={styles.itemInfo}>
                      <div className={styles.itemTop}>
                        <div>
                          <h3 className={styles.itemName}>{item.name}</h3>
                          <div className={styles.itemPriceRow}>
                            <span className={styles.itemPrice}>
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice > item.price && (
                              <span className={styles.itemMrp}>
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          className={styles.removeBtn}
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name}`}
                        >
                          Remove
                        </button>
                      </div>

                      <div className={styles.itemBottom}>
                        <div className={styles.qty}>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => updateQty(item.id, (item.qty || 1) - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className={styles.qtyVal}>{item.qty}</span>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => updateQty(item.id, (item.qty || 0) + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <div className={styles.lineTotal}>
                          {formatPrice(item.price * (item.qty || 0))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              <aside className={styles.summary} aria-label="Order summary">
                <h2 className={styles.summaryTitle}>Order Summary</h2>
                <div className={styles.row}>
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className={styles.row}>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <button className={styles.checkoutBtn}>Checkout</button>
                <p className={styles.note}>
                  Free shipping on orders above ₹999.
                </p>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

