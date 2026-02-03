import React from 'react';
import styles from './Product.module.css';
import { addToCart } from '../../utils/cart';
import { PRODUCTS } from '../../data/products';


const Product = ({ title = 'Featured Products', subtitle }) => {
  const formatPrice = (n) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <section className={styles.section} aria-label="Products">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>

        <div className={styles.grid}>
          {PRODUCTS.map((product) => (
            <article key={product.id} className={styles.card}>
              <a href={`#product-${product.id}`} className={styles.cardLink}>
                <div className={styles.imageWrap}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.image}
                    loading="lazy"
                  />
                  {product.badge && (
                    <span
                      className={`${styles.badge} ${
                        product.badge === 'Sale' ? styles.badgeSale : ''
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className={styles.body}>
                  <span className={styles.category}>{product.category}</span>
                  <h3 className={styles.name}>{product.name}</h3>
                  <div className={styles.rating}>
                    <span className={styles.stars} aria-hidden="true">
                      {'★'.repeat(Math.floor(product.rating))}
                      {product.rating % 1 >= 0.5 ? '½' : ''}
                    </span>
                    <span className={styles.reviews}>
                      ({product.reviews.toLocaleString()} reviews)
                    </span>
                  </div>
                  <div className={styles.priceWrap}>
                    <span className={styles.price}>{formatPrice(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className={styles.originalPrice}>
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className={styles.cta}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product, 1);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
export { PRODUCTS };
