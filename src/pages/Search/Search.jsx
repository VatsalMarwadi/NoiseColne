import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./Search.module.css";
import productStyles from "../../components/Products/Product.module.css";
import { addToCart } from "../../utils/cart";
import { searchProducts } from "../../data/products";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Search() {
  const navigate = useNavigate();
  const q = useQuery().get("q") || "";
  const [query, setQuery] = useState(q);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(q);
  }, [q]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => searchProducts(query), [query]);

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const formatPrice = (n) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.top}>
            <h1 className={styles.title}>Search</h1>
            <form className={styles.searchBar} onSubmit={onSubmit}>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.input}
                placeholder="Search smart watches, earbuds..."
              />
              <button className={styles.btn} type="submit">
                Search
              </button>
            </form>
            <p className={styles.meta}>
              Showing <strong>{results.length}</strong> results
              {query.trim() ? (
                <>
                  {" "}
                  for <strong>“{query.trim()}”</strong>
                </>
              ) : null}
            </p>
          </div>

          {results.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>No products found</p>
              <p className={styles.emptyText}>
                Try a different keyword or browse the catalog.
              </p>
              <Link to="/" className={styles.emptyBtn}>
                Go to Home
              </Link>
            </div>
          ) : (
            <div className={productStyles.grid}>
              {results.map((product) => (
                <article key={product.id} className={productStyles.card}>
                  <a
                    href={`#product-${product.id}`}
                    className={productStyles.cardLink}
                  >
                    <div className={productStyles.imageWrap}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={productStyles.image}
                        loading="lazy"
                      />
                      {product.badge && (
                        <span
                          className={`${productStyles.badge} ${
                            product.badge === "Sale"
                              ? productStyles.badgeSale
                              : ""
                          }`}
                        >
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <div className={productStyles.body}>
                      <span className={productStyles.category}>
                        {product.category}
                      </span>
                      <h3 className={productStyles.name}>{product.name}</h3>
                      <div className={productStyles.rating}>
                        <span className={productStyles.stars} aria-hidden="true">
                          {"★".repeat(Math.floor(product.rating))}
                          {product.rating % 1 >= 0.5 ? "½" : ""}
                        </span>
                        <span className={productStyles.reviews}>
                          ({product.reviews.toLocaleString()} reviews)
                        </span>
                      </div>
                      <div className={productStyles.priceWrap}>
                        <span className={productStyles.price}>
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className={productStyles.originalPrice}>
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        className={productStyles.cta}
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

