import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../utils/auth';
import Header from '../../components/common/Header/Header';
import styles from './SignIn.module.css';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    setLoading(true);
    const result = signIn(email.trim(), password);
    setLoading(false);
    if (result.success) {
      // Dispatch custom event to update Header
      window.dispatchEvent(new Event('userLogin'));
      navigate('/', { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          <Link to="/" className={styles.logo} aria-label="Noise Home">
            <img src="/logoTitle.png" alt="Noise" className={styles.logoImg} />
          </Link>
          <h1 className={styles.title}>Sign In</h1>
          <p className={styles.subtitle}>
            Welcome back! Sign in to your account to continue.
          </p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <div className={styles.field}>
              <label htmlFor="signin-email" className={styles.label}>
                Email
              </label>
              <input
                id="signin-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="signin-password" className={styles.label}>
                Password
              </label>
              <input
                id="signin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>
            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className={styles.footer}>
            Don't have an account?{' '}
            <Link to="/signup" className={styles.link}>
              Create account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
