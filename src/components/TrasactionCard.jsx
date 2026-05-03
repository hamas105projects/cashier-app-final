import React, { useState } from "react";

const TransactionCard = ({ menu, onRemove, onUpdateQuantity, onAddNote }) => {
  const [imageError, setImageError] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState(menu.note || "");

  const getImageSrc = () => {
    if (menu.imageFile && !imageError) {
      if (typeof menu.imageFile === 'string') {
        return menu.imageFile;
      } else if (menu.imageFile instanceof File) {
        return URL.createObjectURL(menu.imageFile);
      }
    }
    return '/images/mi-ayam.webp';
  };

  const handleSaveNote = () => {
    if (onAddNote) {
      onAddNote(menu.id, noteText);
    }
    setShowNoteModal(false);
  };

  return (
    <>
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "12px",
          marginBottom: "12px",
          border: "1px solid #e2e8f0",
          position: "relative",
        }}
      >
        {/* Tombol Trash di kanan atas */}
        <button
          onClick={() => onRemove(menu.id)}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            transition: "background 0.2s",
            zIndex: 1,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#fee2e2")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <img 
            src="/images/trash.png" 
            alt="hapus" 
            style={{ width: "20px", height: "20px" }}
          />
        </button>

        {/* Quantity Controls di pojok kanan (horizontal) */}
        <div
          style={{
            position: "absolute",
            top: "52px",
            right: "12px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <button
            onClick={() => onUpdateQuantity(menu.id, menu.quantity - 1)}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: `1px solid #3572EF`,
              background: "white",
              cursor: "pointer",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#3572EF",
              fontWeight: "bold",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#3572EF";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = "#3572EF";
            }}
          >
            -
          </button>
          <span style={{ 
            minWidth: "28px", 
            textAlign: "center", 
            fontWeight: 600,
            fontSize: "14px"
          }}>
            {menu.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(menu.id, menu.quantity + 1)}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: `1px solid #3572EF`,
              background: "white",
              cursor: "pointer",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#3572EF",
              fontWeight: "bold",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#3572EF";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = "#3572EF";
            }}
          >
            +
          </button>
        </div>

        {/* Konten utama */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginRight: "100px" }}>
          {/* Gambar */}
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "8px",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={getImageSrc()}
              alt={menu.name}
              onError={() => setImageError(true)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Info Menu */}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>
              {menu.name}
            </div>
            <div style={{ fontSize: "13px", fontWeight: 500, color: "#94a3b8", marginBottom: "8px" }}>
              Rp {menu.price.toLocaleString("id-ID")}
            </div>
            
            {/* Catatan (jika ada) */}
            {menu.note && (
              <div style={{ 
                fontSize: "11px", 
                color: "#f59e0b", 
                marginTop: "4px",
                fontStyle: "italic"
              }}>
                📝 {menu.note}
              </div>
            )}

            {/* Icon Pencil untuk catatan di bawah harga */}
            <div style={{ marginTop: "8px" }}>
              <button
                onClick={() => setShowNoteModal(true)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <img 
                  src="/images/pencil.png" 
                  alt="catatan" 
                  style={{ width: "16px", height: "16px" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal untuk catatan makanan */}
      {showNoteModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowNoteModal(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              width: "320px",
              padding: "20px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: "0 0 16px 0", fontSize: "18px" }}>
              Catatan untuk {menu.name}
            </h3>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Contoh: tidak pedas, tambah sambal, dll..."
              style={{
                width: "100%",
                height: "100px",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
                fontFamily: "inherit",
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              <button
                onClick={() => setShowNoteModal(false)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                Batal
              </button>
              <button
                onClick={handleSaveNote}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#3572EF",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionCard;