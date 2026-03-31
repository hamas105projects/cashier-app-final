import BackgroundAuth from "../components/BackgroundAuth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // User palsu (untuk testing)
  const fakeUser = {
    username: 'test',
    password: 'test123'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validasi sederhana
    if (username === fakeUser.username && password === fakeUser.password) {
      // Simpan status login (contoh menggunakan localStorage)
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ username: fakeUser.username }));
      // Redirect ke halaman dashboard
      navigate('/dashboard');
    } else {
      setError('Username atau password salah');
    }
  };

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
      display: 'inline-flex',  // Ubah ke inline-flex
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      color: 'white',
      margin: 0,
      marginRight: '8px'
    },
    companyName: {
      color: '#4C3BCF', margin: 0, display: 'inline-block', fontSize: '26px'
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
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '24px',
      width:'98%'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer'
    },
    checkbox: {
      width: '16px',
      height: '16px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    checkboxText: {
      fontSize: '14px',
      color: '#919191'
    },
    forgotLink: {
      fontSize: '14px',
      color: '#919191',
      textDecoration: 'none'
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
    signupText: {
      textAlign: 'center',
      marginTop: '24px',
      fontSize: '14px',
      color: '#515151'
    },
    signupLink: {
      color: '#60a5fa',
      textDecoration: 'none',
      fontWeight: '600',
      marginLeft:'6px'
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

  return (
    <BackgroundAuth>
      <main style={styles.main}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <div>
              <h1 style={styles.logo}>
                P
              </h1>

              <h1 style={styles.companyName}>Padipos</h1>
            </div>
            <h2 style={styles.title}>Welcome Back!</h2>
            <p style={styles.subtitle}>Please enter your username and password here!</p>
          </div>

          
          {/* Form */}
          <form style={{ width: '80%', margin: '10px auto' }} onSubmit={handleSubmit}>
            {/* Tampilkan error jika ada */}
            {error && <div style={styles.errorMessage}>{error}</div>}

            {/* Username Input */}
            <div style={styles.formGroup}>
              <label htmlFor="username" style={styles.label}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="you@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
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

            {/* Password Input */}
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
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

            {/* Remember Me & Forgot Password */}
            <div style={styles.checkboxContainer}>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" style={styles.checkbox} />
                <span style={styles.checkboxText}>Remember me</span>
              </label>
              <a href="/forgot-password" style={styles.forgotLink}>
                Forgot password?
              </a>
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
              Sign In
            </button>

            {/* Sign Up Link */}
            <div style={styles.signupText}>
              Don't have an account?{' '}
              <a href="/register" style={styles.signupLink}>
                Register
              </a>
            </div>
          </form>
        </div>
      </main>
    </BackgroundAuth>
  );
}

export default Login;