import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../utils/auth";
import { getCartCount } from "../../utils/cart";
import { searchProducts } from "../../data/products";
import styles from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchProducts(searchQuery).slice(0, 6);
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    setCurrentUser(getCurrentUser());
    setCartCount(getCartCount());
    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => setCurrentUser(getCurrentUser());
    // Listen for custom login/logout events (same tab)
    const handleUserAuth = () => setCurrentUser(getCurrentUser());
    const handleCart = () => setCartCount(getCartCount());
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userLogin", handleUserAuth);
    window.addEventListener("userLogout", handleUserAuth);
    window.addEventListener("cartUpdated", handleCart);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLogin", handleUserAuth);
      window.removeEventListener("userLogout", handleUserAuth);
      window.removeEventListener("cartUpdated", handleCart);
    };
  }, []);

  const navLinks = [
    {
      label: "Smart Watches",
      href: "#smart-watches",
      subLinks: ["With Alexa", "AMOLED Display", "Round Dial", "BT Calling"],
    },
    {
      label: "Earbuds",
      href: "#earbuds",
      subLinks: ["ANC Earbuds", "Gaming Earbuds"],
    },
    { label: "Support", href: "#support" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      {/* Top announcement bar */}
      <div className={styles.topBar}>
        <p className={styles.topBarText}>
          Free shipping on orders above ₹999 | India's No.1 Smart Wearable Brand
        </p>
      </div>

      {/* Main header */}
      <div className={styles.mainHeader}>
        <div className={styles.headerInner}>
          {/* Mobile menu toggle */}
          <button
            className={styles.menuToggle}
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
          </button>

          {/* Logo */}
          <Link to="/" className={styles.logo} aria-label="Noise Home">
            <img src="/logoTitle.png" alt="Noise" className={styles.logoImg} />
          </Link>

          {/* Desktop navigation */}
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <div key={link.label} className={styles.navItem}>
                {link.to ? (
                  <Link to={link.to} className={styles.navLink}>
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} className={styles.navLink}>
                    {link.label}
                  </a>
                )}
                {link.subLinks && (
                  <div className={styles.dropdown}>
                    {link.subLinks.map((sub) => (
                      <a
                        key={sub}
                        href={`${link.href}#${sub
                          .toLowerCase()
                          .replace(/\s/g, "-")}`}
                        className={styles.dropdownLink}
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className={styles.actions}>
            <button
              className={styles.actionBtn}
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            <Link
              to={currentUser ? "/profile" : "/signin"}
              className={styles.actionBtn}
              aria-label={currentUser ? "Profile" : "Sign In"}
            >
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
            <Link to="/cart" className={styles.actionBtn} aria-label="Cart">
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className={styles.cartBadge}>{cartCount}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <div key={link.label} className={styles.mobileNavItem}>
              {link.to ? (
                <Link
                  to={link.to}
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              )}
              {link.subLinks?.map((sub) => (
                <a
                  key={sub}
                  href={`${link.href}#${sub.toLowerCase().replace(/\s/g, "-")}`}
                  className={styles.mobileSubLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {sub}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </div>

      {/* Search overlay */}
      <div
        className={`${styles.searchOverlay} ${
          isSearchOpen ? styles.searchOverlayOpen : ""
        }`}
        onClick={() => setIsSearchOpen(false)}
        role="presentation"
      >
        <div
          className={styles.searchPanel}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Search products"
        >
          <div className={styles.searchHeader}>
            <h3 className={styles.searchTitle}>Search</h3>
            <button
              className={styles.searchClose}
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
            >
              ✕
            </button>
          </div>

          <form
            className={styles.searchForm}
            onSubmit={(e) => {
              e.preventDefault();
              const q = searchQuery.trim();
              setIsSearchOpen(false);
              navigate(`/search?q=${encodeURIComponent(q)}`);
            }}
          >
            <input
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search smart watches, earbuds..."
              autoFocus
            />
            <button className={styles.searchBtn} type="submit">
              Search
            </button>
          </form>

          {suggestions.length > 0 && (
            <div className={styles.suggestions}>
              {suggestions.map((p) => (
                <button
                  key={p.id}
                  className={styles.suggestion}
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                    navigate(`/search?q=${encodeURIComponent(p.name)}`);
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className={styles.suggestionImg}
                    loading="lazy"
                  />
                  <div className={styles.suggestionInfo}>
                    <div className={styles.suggestionName}>{p.name}</div>
                    <div className={styles.suggestionMeta}>
                      {p.category} • ₹{p.price.toLocaleString("en-IN")}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className={styles.searchHint}>
            Tip: Try “AMOLED”, “ANC”, “BT Calling”, “Buds”.
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;