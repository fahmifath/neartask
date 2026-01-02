import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h3 style={headerTitleStyle}>{title}</h3>
          <button style={closeButtonStyle} onClick={onClose} aria-label="Tutup modal">
            ✕
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
  padding: "16px",
  overflowY: "auto",
};

const modalStyle: React.CSSProperties = {
  background: "#fff",
  padding: "24px",
  borderRadius: 8,
  width: "100%",
  maxWidth: "500px",
  maxHeight: "90vh",
  overflowY: "auto",
  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
  paddingBottom: 12,
  borderBottom: "1px solid #e0e0e0",
};

const headerTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "18px",
  fontWeight: "600",
  color: "#333",
};

const closeButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  fontSize: "24px",
  cursor: "pointer",
  padding: "4px 8px",
  color: "#666",
  transition: "color 0.2s",
};
