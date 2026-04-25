import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    location: '',
    phone: '',
    role: '',
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ SEND OTP
  const sendOtp = async () => {
    if (!formData.email) {
      setError('Enter email first');
      return;
    }

    try {
      await axios.post(
        `http://localhost:2026/api/otp/send?email=${formData.email}`
      );
      setOtpSent(true);
      setSuccess('OTP sent to your email');
      setError('');
    } catch {
      setError('Failed to send OTP');
    }
  };

  // ✅ HANDLE OTP INPUT
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto move
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // ✅ VERIFY OTP
  const verifyOtp = async () => {
    const finalOtp = otp.join("");

    try {
      const res = await axios.post(
        `http://localhost:2026/api/otp/verify?email=${formData.email}&otp=${finalOtp}`
      );

      if (res.data === "OTP Verified") {
        setOtpVerified(true);
        setSuccess("Email verified successfully ✅");
        setError("");
      } else {
        setError("Invalid OTP");
      }
    } catch {
      setError("OTP verification failed");
    }
  };

  // ✅ REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      setError('Please verify OTP first');
      return;
    }

    const result = await register(formData);

    if (result.success) {
      switch (formData.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'farmer':
          navigate('/farmer');
          break;
        case 'expert':
          navigate('/expert');
          break;
        case 'public':
          navigate('/public');
          break;
        default:
          navigate('/');
      }
    } else {
      setError(result.message || 'Registration failed');
    }
  };

  return (
    <div
      className="form-container"
      style={{ textAlign: 'left', maxWidth: '500px', margin: 'auto' }}
    >
      <h2>Register New User</h2>

      {error && (
        <div style={{ color: 'red', marginBottom: '10px', fontWeight: 'bold' }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ color: 'green', marginBottom: '10px' }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>

        {/* NAME */}
        <label style={labelStyle}>
          <span>Full Name:</span>
          <input name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />
        </label>

        {/* USERNAME */}
        <label style={labelStyle}>
          <span>Username:</span>
          <input name="username" value={formData.username} onChange={handleChange} required style={inputStyle} />
        </label>

        {/* EMAIL + OTP */}
<label style={labelStyle}>
  <span>Email:</span>

  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    
    {/* FIXED INPUT */}
    <input
      name="email"
      type="email"
      value={formData.email}
      onChange={handleChange}
      required
      style={{
        width: "100%",          
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "15px"
      }}
    />

    {/* BUTTON */}
    <button
      type="button"
      onClick={sendOtp}
      style={{
        width: "100%",
        padding: "10px",
        backgroundColor: "#1976d2",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Send OTP
    </button>

  </div>
</label>

        {/* OTP BOXES */}
        {otpSent && (
          <label style={labelStyle}>
            <span>Enter OTP:</span>

            <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  style={otpBox}
                />
              ))}
            </div>

            <button type="button" onClick={verifyOtp} style={btnGreen}>
              Verify OTP
            </button>
          </label>
        )}

        {/* PASSWORD */}
        <label style={labelStyle}>
          <span>Password:</span>
          <input name="password" type="password" value={formData.password} onChange={handleChange} required style={inputStyle} />
        </label>

        {/* PHONE */}
        <label style={labelStyle}>
          <span>Phone:</span>
          <input name="phone" value={formData.phone} onChange={handleChange} required maxLength={10} style={inputStyle} />
        </label>

        {/* LOCATION */}
        <label style={labelStyle}>
          <span>Location:</span>
          <input name="location" value={formData.location} onChange={handleChange} required style={inputStyle} />
        </label>

        {/* ROLE */}
        <div style={{ marginTop: '20px' }}>
          <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>
            Register As:
          </span>

          <div style={gridStyle}>
            <input type="radio" name="role" value="admin" checked={formData.role === 'admin'} onChange={handleChange} />
            <label>Admin</label>

            <input type="radio" name="role" value="farmer" checked={formData.role === 'farmer'} onChange={handleChange} />
            <label>Farmer</label>

            <input type="radio" name="role" value="expert" checked={formData.role === 'expert'} onChange={handleChange} />
            <label>Agriculture Expert</label>

            <input type="radio" name="role" value="public" checked={formData.role === 'public'} onChange={handleChange} />
            <label>Public</label>
          </div>
        </div>

        {/* REGISTER */}
        <button
          type="submit"
          disabled={!otpVerified}
          style={{
            marginTop: '20px',
            padding: '8px 16px',
            backgroundColor: otpVerified ? '#2e7d32' : '#aaa',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

// 🎨 STYLES
const labelStyle = { display: 'block', marginBottom: '10px' };

const inputStyle = {
  marginLeft: '10px',
  padding: '5px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  rowGap: '10px',
  columnGap: '10px',
};

const otpBox = {
  width: '35px',
  height: '35px',
  textAlign: 'center',
  fontSize: '18px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const btnBlue = {
  background: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  padding: '5px 10px',
  cursor: 'pointer',
};

const btnGreen = {
  background: '#2e7d32',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  padding: '5px 10px',
  marginTop: '10px',
  cursor: 'pointer',
};

export default Register;