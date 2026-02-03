import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, signOut } from '../../utils/auth';
import Header from '../../components/Header/Header';
import styles from './Profile.module.css';
import Footer from '../../components/Footer/Footer';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/signin', { replace: true });
      return;
    }
    setUser(currentUser);
    // Load dummy orders and addresses from localStorage
    loadOrders(currentUser);
    loadAddresses(currentUser);
  }, [navigate]);

  const loadOrders = (userData) => {
    try {
      const stored = localStorage.getItem(`noise_orders_${userData?.email}`);
      if (stored) {
        setOrders(JSON.parse(stored));
      } else {
        // Dummy orders for demo
        const dummyOrders = [
          {
            id: 'ORD-2024-001',
            date: '2024-01-15',
            status: 'Delivered',
            items: [{ name: 'Noise ColorFit Pro 5', qty: 1, price: 2499 }],
            total: 2499,
          },
          {
            id: 'ORD-2024-002',
            date: '2024-01-10',
            status: 'Shipped',
            items: [
              { name: 'Noise Buds VS104 Plus', qty: 1, price: 1299 },
              { name: 'Noise ColorFit Caliber Go', qty: 1, price: 1499 },
            ],
            total: 2798,
          },
        ];
        setOrders(dummyOrders);
      }
    } catch {
      setOrders([]);
    }
  };

  const loadAddresses = (userData) => {
    try {
      const stored = localStorage.getItem(`noise_addresses_${userData?.email}`);
      if (stored) {
        setAddresses(JSON.parse(stored));
      } else {
        // Default address
        const defaultAddress = [
          {
            id: 1,
            name: 'Home',
            fullName: userData?.name || 'Your Name',
            phone: '+91 9876543210',
            address: '123, Main Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001',
            isDefault: true,
          },
        ];
        setAddresses(defaultAddress);
      }
    } catch {
      setAddresses([]);
    }
  };

  const handleLogout = () => {
    signOut();
    // Dispatch custom event to update Header
    window.dispatchEvent(new Event('userLogout'));
    navigate('/', { replace: true });
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (!user) return null;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>My Account</h1>

          <div className={styles.layout}>
            {/* Sidebar Navigation */}
            <aside className={styles.sidebar}>
              <div className={styles.userCard}>
                <div className={styles.avatar}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className={styles.userName}>{user.name}</h2>
                <p className={styles.userEmail}>{user.email}</p>
              </div>
              <nav className={styles.nav}>
                <button
                  className={`${styles.navItem} ${
                    activeTab === 'overview' ? styles.navItemActive : ''
                  }`}
                  onClick={() => setActiveTab('overview')}
                >
                  <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Overview
                </button>
                <button
                  className={`${styles.navItem} ${
                    activeTab === 'orders' ? styles.navItemActive : ''
                  }`}
                  onClick={() => setActiveTab('orders')}
                >
                  <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Orders
                </button>
                <button
                  className={`${styles.navItem} ${
                    activeTab === 'addresses' ? styles.navItemActive : ''
                  }`}
                  onClick={() => setActiveTab('addresses')}
                >
                  <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Addresses
                </button>
                <button
                  className={`${styles.navItem} ${
                    activeTab === 'settings' ? styles.navItemActive : ''
                  }`}
                  onClick={() => setActiveTab('settings')}
                >
                  <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                  </svg>
                  Account Settings
                </button>
              </nav>
            </aside>

            {/* Main Content */}
            <div className={styles.content}>
              {activeTab === 'overview' && (
                <div className={styles.tabContent}>
                  <h2 className={styles.tabTitle}>Account Overview</h2>
                  <div className={styles.stats}>
                    <div className={styles.statCard}>
                      <div className={styles.statValue}>{orders.length}</div>
                      <div className={styles.statLabel}>Total Orders</div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statValue}>
                        {orders.filter((o) => o.status === 'Delivered').length}
                      </div>
                      <div className={styles.statLabel}>Delivered</div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statValue}>{addresses.length}</div>
                      <div className={styles.statLabel}>Saved Addresses</div>
                    </div>
                  </div>
                  {orders.length > 0 && (
                    <div className={styles.recentOrders}>
                      <h3 className={styles.sectionTitle}>Recent Orders</h3>
                      <div className={styles.orderList}>
                        {orders.slice(0, 3).map((order) => (
                          <div key={order.id} className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                              <span className={styles.orderId}>Order #{order.id}</span>
                              <span className={`${styles.orderStatus} ${styles[`status${order.status}`]}`}>
                                {order.status}
                              </span>
                            </div>
                            <div className={styles.orderDate}>{formatDate(order.date)}</div>
                            <div className={styles.orderTotal}>
                              ₹{order.total.toLocaleString('en-IN')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div className={styles.tabContent}>
                  <h2 className={styles.tabTitle}>Order History</h2>
                  {orders.length === 0 ? (
                    <div className={styles.emptyState}>
                      <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      <p>No orders yet</p>
                      <a href="/" className={styles.emptyBtn}>Start Shopping</a>
                    </div>
                  ) : (
                    <div className={styles.ordersList}>
                      {orders.map((order) => (
                        <div key={order.id} className={styles.orderDetailCard}>
                          <div className={styles.orderDetailHeader}>
                            <div>
                              <div className={styles.orderDetailId}>Order #{order.id}</div>
                              <div className={styles.orderDetailDate}>
                                Placed on {formatDate(order.date)}
                              </div>
                            </div>
                            <span className={`${styles.orderDetailStatus} ${styles[`status${order.status}`]}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className={styles.orderItems}>
                            {order.items.map((item, idx) => (
                              <div key={idx} className={styles.orderItem}>
                                <span className={styles.orderItemName}>{item.name}</span>
                                <span className={styles.orderItemQty}>Qty: {item.qty}</span>
                                <span className={styles.orderItemPrice}>
                                  ₹{item.price.toLocaleString('en-IN')}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className={styles.orderDetailFooter}>
                            <div className={styles.orderDetailTotal}>
                              Total: ₹{order.total.toLocaleString('en-IN')}
                            </div>
                            <button className={styles.trackBtn}>Track Order</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className={styles.tabContent}>
                  <div className={styles.tabHeader}>
                    <h2 className={styles.tabTitle}>Saved Addresses</h2>
                    <button className={styles.addBtn}>+ Add New Address</button>
                  </div>
                  <div className={styles.addressesList}>
                    {addresses.map((addr) => (
                      <div key={addr.id} className={styles.addressCard}>
                        <div className={styles.addressHeader}>
                          <span className={styles.addressName}>{addr.name}</span>
                          {addr.isDefault && (
                            <span className={styles.defaultBadge}>Default</span>
                          )}
                        </div>
                        <div className={styles.addressBody}>
                          <p className={styles.addressLine}>{addr.fullName}</p>
                          <p className={styles.addressLine}>{addr.address}</p>
                          <p className={styles.addressLine}>
                            {addr.city}, {addr.state} {addr.pincode}
                          </p>
                          <p className={styles.addressLine}>Phone: {addr.phone}</p>
                        </div>
                        <div className={styles.addressActions}>
                          <button className={styles.addressBtn}>Edit</button>
                          <button className={styles.addressBtn}>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className={styles.tabContent}>
                  <h2 className={styles.tabTitle}>Account Settings</h2>
                  <div className={styles.settingsSection}>
                    <h3 className={styles.settingsTitle}>Personal Information</h3>
                    <div className={styles.settingsForm}>
                      <div className={styles.formField}>
                        <label className={styles.formLabel}>Full Name</label>
                        <input
                          type="text"
                          className={styles.formInput}
                          defaultValue={user.name}
                          readOnly
                        />
                      </div>
                      <div className={styles.formField}>
                        <label className={styles.formLabel}>Email</label>
                        <input
                          type="email"
                          className={styles.formInput}
                          defaultValue={user.email}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.settingsSection}>
                    <h3 className={styles.settingsTitle}>Security</h3>
                    <button className={styles.changePasswordBtn}>Change Password</button>
                  </div>
                  <div className={styles.settingsSection}>
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
