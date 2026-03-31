// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import BackgroundAuth from "../components/BackgroundAuth";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const styles = {
    main: {
      width: '100%',
      maxWidth: '480px',
      marginLeft: '120px',
      marginRight: 'auto',
      zIndex: '2',
      position: 'relative'
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      padding: '32px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px',
    },
    logo: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #4C3BCF, #3572EF)',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      color: 'white',
      margin: 0,
      marginRight: '8px'
    },
    companyName: {
      color: '#4C3BCF',
      margin: 0,
      display: 'inline-block',
      fontSize: '26px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#000',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#919191',
      fontSize: '14px'
    },
    formGroup: {
      marginBottom: '24px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#515151',
      marginBottom: '8px'
    },
    input: {
      width: '90%',
      padding: '12px 16px',
      borderRadius: '8px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid #919191',
      color: '#515151',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    inputFocus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
    },
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
      color: 'white',
      fontWeight: '600',
      padding: '12px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    buttonHover: {
      transform: 'scale(1.02)',
      background: 'linear-gradient(135deg, #1d4ed8, #1e3a8a)'
    },
    loginText: {
      textAlign: 'center',
      marginTop: '24px',
      fontSize: '14px',
      color: '#515151'
    },
    loginLink: {
      color: '#60a5fa',
      textDecoration: 'none',
      fontWeight: '600',
      marginLeft: '6px'
    },
    message: {
      marginBottom: '16px',
      padding: '12px',
      borderRadius: '8px',
      background: 'rgba(34, 197, 94, 0.2)',
      border: '1px solid rgba(34, 197, 94, 0.5)',
      color: '#15803d',
      fontSize: '14px'
    },
    errorMessage: {
      marginBottom: '16px',
      padding: '12px',
      borderRadius: '8px',
      background: 'rgba(239, 68, 68, 0.2)',
      border: '1px solid rgba(239, 68, 68, 0.5)',
      color: '#fecaca',
      fontSize: '14px'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    // Simulasi API call
    try {
      // Ganti dengan panggilan API nyata
      // await api.forgotPassword(email);
      setMessage("Password reset link has been sent to your email");
      setEmail("");
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    }
  };

  return (
    <BackgroundAuth>
      <main style={styles.main}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <div>
              <h1 style={styles.logo}>P</h1>
              <h1 style={styles.companyName}>Padipos</h1>
            </div>
            <h2 style={styles.title}>Forgot Password?</h2>
            <p style={styles.subtitle}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ width: '80%', margin: '10px auto' }}>
            {message && <div style={styles.message}>{message}</div>}
            {error && <div style={styles.errorMessage}>{error}</div>}

            {/* Email Input */}
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = styles.inputFocus.borderColor;
                  e.target.style.boxShadow = styles.inputFocus.boxShadow;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#919191';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={styles.button}
              onMouseEnter={(e) => {
                e.target.style.transform = styles.buttonHover.transform;
                e.target.style.background = styles.buttonHover.background;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.background = styles.button.background;
              }}
            >
              Send Reset Link
            </button>

            {/* Back to Login */}
            <div style={styles.loginText}>
              Remember your password?{' '}
              <Link to="/login" style={styles.loginLink}>
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </main>
    </BackgroundAuth>
  );
}

export default ForgotPassword;