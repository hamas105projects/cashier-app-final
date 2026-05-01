// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackgroundAuth from "../components/BackgroundAuth";
import { register } from "../services/api"; // Import fungsi register

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
    buttonDisabled: {
      opacity: 0.7,
      cursor: 'not-allowed'
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
      background: '#fee2e2',
      border: '1px solid #fecaca',
      color: '#dc2626',
      fontSize: '14px'
    },
    successMessage: {
      marginBottom: '16px',
      padding: '12px',
      borderRadius: '8px',
      background: '#dcfce7',
      border: '1px solid #bbf7d0',
      color: '#16a34a',
      fontSize: '14px'
    }
  };

  const [formData, setFormData] = useState({
    name: '', // Ubah dari fullName ke name (sesuai API)
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Hapus error saat user mulai mengetik
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    
    // Validasi password match
    if (formData.password !== formData.confirmPassword) {
      setError("Password dan Confirm Password tidak cocok");
      return;
    }

    // Validasi minimal panjang password
    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Kirim data ke API sesuai dengan format yang diharapkan backend
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: "", // Optional, bisa diisi nanti di profile
        role: "cashier" // Default role, admin bisa diubah oleh admin lain
      });
      
      // Jika sukses
      setSuccessMessage("Registrasi berhasil! Silakan login.");
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      // Redirect ke login setelah 2 detik
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      // Tangani error dari API
      if (err.message.includes("Email already registered")) {
        setError("Email sudah terdaftar. Silakan gunakan email lain.");
      } else {
        setError(err.message || "Registrasi gagal. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
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
            <h2 style={styles.title}>Create Account</h2>
            <p style={styles.subtitle}>Please fill in your details to register</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ width: '80%', margin: '10px auto' }}>
            {/* Tampilkan error jika ada */}
            {error && <div style={styles.errorMessage}>{error}</div>}
            
            {/* Tampilkan success jika ada */}
            {successMessage && <div style={styles.successMessage}>{successMessage}</div>}

            {/* Full Name - ubah name dari fullName ke name */}
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name" // Ubah dari fullName ke name
                placeholder="John Doe"
                style={styles.input}
                value={formData.name}
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

            {/* Submit Button - tambahkan disabled saat loading */}
            <button
              type="submit"
              style={{
                ...styles.button,
                ...(isLoading ? styles.buttonDisabled : {})
              }}
              disabled={isLoading}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.transform = styles.buttonHover.transform;
                  e.target.style.background = styles.buttonHover.background;
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.background = styles.button.background;
                }
              }}
            >
              {isLoading ? 'Loading...' : 'Register'}
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