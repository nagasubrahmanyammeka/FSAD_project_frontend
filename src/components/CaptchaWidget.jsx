import React, { useEffect, useRef, useState } from 'react';

const CaptchaWidget = ({ onVerify }) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;

   script.onload = () => {
  setIsLoaded(true);

  // 1. Define the key first to ensure it exists
  const reCaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZvRqyHh71UMIEGNQ_MXjizKhI';

  if (window.grecaptcha && containerRef.current) {
    window.grecaptcha.render(containerRef.current, {
      sitekey: reCaptchaKey, // 2. Use the variable here
      callback: handleCaptchaSuccess,
      'expired-callback': handleCaptchaExpiry,
      'error-callback': handleCaptchaError,
      theme: 'light',
      size: 'normal'
    });
  }
};

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleCaptchaSuccess = (token) => {
    setVerified(true);
    onVerify?.(token, true);
  };

  const handleCaptchaExpiry = () => {
    setVerified(false);
    onVerify?.(null, false);
  };

  const handleCaptchaError = () => {
    setVerified(false);
    onVerify?.(null, false);
  };

  // 🎨 INLINE STYLES
  const containerStyle = {
    margin: '20px 0',
    padding: '15px',
    background: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px'
  };

  const boxStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  };

  const loadingStyle = {
    color: '#666',
    fontSize: '14px',
    margin: '10px 0',
    fontWeight: '500'
  };

  const verifiedStyle = {
    color: '#28a745',
    fontSize: '14px',
    fontWeight: '600',
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  };

  const recaptchaStyle = {
    display: 'flex',
    justifyContent: 'center',
    transform: 'scale(0.95)',
    transformOrigin: '0 0',
    margin: '10px 0'
  };

  return (
    <div style={containerStyle}>
      {!isLoaded && (
        <p style={loadingStyle}>
          Loading security verification...
        </p>
      )}

      <div
        ref={containerRef}
        id="g_recaptcha_container"
        style={{ ...boxStyle, ...recaptchaStyle }}
      ></div>

      {verified && (
        <p style={verifiedStyle}>
          ✓ Verified
        </p>
      )}
    </div>
  );
};

export default CaptchaWidget;