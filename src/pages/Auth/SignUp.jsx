import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveUser } from '../../utils/auth';
import Header from '../../components/Header/Header';
import styles from './SignUp.module.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName) {
      setError('Please enter your name.');
      return;
    }
    if (!trimmedEmail) {
      setError('Please enter your email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter a password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    const result = saveUser({
      name: trimmedName,
      email: trimmedEmail,
      password,
    });
    setLoading(false);
    if (result.success) {
      navigate('/signin', { replace: true });
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
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>
            Sign up to get the best offers and track your orders.
          </p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <div className={styles.field}>
              <label htmlFor="signup-name" className={styles.label}>
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                placeholder="Enter your full name"
                disabled={loading}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="signup-email" className={styles.label}>
                Email
              </label>
              <input
                id="signup-email"
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
              <label htmlFor="signup-password" className={styles.label}>
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="At least 6 characters"
                disabled={loading}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="signup-confirm" className={styles.label}>
                Confirm Password
              </label>
              <input
                id="signup-confirm"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
                placeholder="Confirm your password"
                disabled={loading}
              />
            </div>
            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className={styles.footer}>
            Already have an account?{' '}
            <Link to="/signin" className={styles.link}>
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
