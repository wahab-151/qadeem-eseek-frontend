"use client";
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
export default function FloatingWhatsApp(
  { phone }
) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  // const phone="+923118821726"
  // console.log("phone",phone)
  // const handleSendMessage = () => {
  //   // Remove ALL spaces and special characters from phone number
  //   const cleanPhone = phone.replace(/\s+/g, '').replace(/[\-\(\)]/g, '');
  //   // Ensure phone number starts with country code (add + if missing)
  //   const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone : `+${cleanPhone}`;
  //   // Create WhatsApp Web URL with proper formatting (like web.whatsapp.com/send?phone=...)
  //   const url = `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(message || "Hello! I need details about your services.")}`;
  //   console.log('Opening WhatsApp Web with:', url); // Debug log
  //   window.open(url, '_blank');
  //   setIsOpen(false);
  // };
  const handleSendMessage = () => {
    // Clean phone number
    const cleanPhone = phone.replace(/\s+/g, '').replace(/[\-\(\)]/g, '');
    const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone : `+${cleanPhone}`;
    // Encode message
    const text = encodeURIComponent(message || "Hello! I need details about your services.");
    // Detect mobile vs desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // Build URL depending on device
    const url = isMobile
      ? `https://wa.me/${formattedPhone.replace('+', '')}?text=${text}`
      : `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${text}`;
    console.log('Opening WhatsApp with:', url);
    window.open(url, '_blank');
    setIsOpen(false);
  };
  return (
    <>
      {/* Floating WhatsApp Button - Bottom Left with Animations */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '53px',
          left: '20px',
          backgroundColor: '#10B981',
          color: 'white',
          padding: '16px',
          borderRadius: '50%',
          border: 'none',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          zIndex: 9999,
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse 2s infinite'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1) rotate(5deg)';
          e.target.style.backgroundColor = '#059669';
          e.target.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1) rotate(0deg)';
          e.target.style.backgroundColor = '#10B981';
          e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        }}
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon style={{ fontSize: '28px' }} />
      </button>
      {/* Chat Modal - Positioned next to button */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '110px',
          left: '54px', // Position to the right of the button
          zIndex: 10000,
          animation: 'slideIn 0.3s ease-out'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            width: '330px',
            overflow: 'hidden',
            border: '2px solid #10B981'
          }}>
            {/* Header */}
            <div style={{
              backgroundColor: '#10B981',
              color: 'white',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '4px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.color = '#F0F9FF';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.color = 'white';
                }}
              >
                <CloseIcon />
              </button>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: '600', fontSize: '16px', color: theme.palette.secondary.main }}>SIFRA - Support</div>
                {/* <div style={{ fontWeight: '600', fontSize: '14px', color: theme.palette.secondary.main }}>- Support</div> */}
              </div>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src="/assets/images/new_favIcon.jpeg" alt="ES" width="12" height="12" loading="lazy" style={{ width: '12px', height: '12px' }} />
              </div>
            </div>
            {/* Chat Content */}
            <div style={{
              padding: '16px',
              backgroundColor: '#F3F4F6',
              minHeight: '120px'
            }}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{
                  backgroundColor: '#10B981',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  maxWidth: '280px',
                  display: 'inline-block'
                }}>
                  Hello! Thank you for visiting our website. How can we help you today?
                </div>
              </div>
            </div>
            {/* Input Area */}
            <div style={{
              padding: '16px',
              borderTop: '1px solid #E5E7EB'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your query here..."
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    outline: 'none',
                    fontSize: '14px',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#10B981';
                    e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#D1D5DB';
                    e.target.style.boxShadow = 'none';
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  style={{
                    backgroundColor: '#10B981',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#059669';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#10B981';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <SendIcon style={{ fontSize: '20px' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          }
          50% {
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
          }
          100% {
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}