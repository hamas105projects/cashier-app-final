// src/pages/Register.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import BackgroundAuth from "../components/BackgroundAuth";

function Register() {
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

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Register data:', formData);
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
            <h2 style={styles.title}>Create Account</h2>
            <p style={styles.subtitle}>Please fill in your details to register</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ width: '80%', margin: '10px auto' }}>
            {/* Full Name */}
            <div style={styles.formGroup}>
              <label htmlFor="fullName" style={styles.label}>
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                style={styles.input}
                value={formData.fullName}
                onChange={handleChange}
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

            {/* Email */}
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
                value={formData.email}
                onChange={handleChange}
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

            {/* Password */}
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                style={styles.input}
                value={formData.password}
                onChange={handleChange}
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

            {/* Confirm Password */}
            <div style={styles.formGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                style={styles.input}
                value={formData.confirmPassword}
                onChange={handleChange}
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
              Register
            </button>

            {/* Login Link */}
            <div style={styles.loginText}>
              Already have an account?{' '}
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

export default Register;