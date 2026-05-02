import React from "react";

const TransactionCard = ({ menu, onRemove, onUpdateQuantity }) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "12px",
        marginBottom: "12px",
        border: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {/* Image placeholder atau gambar menu */}
      <div
        style={{
          width: "60px",
          height: "60px",
          background: "#f1f5f9",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
        }}
      >
        {menu.imageFile ? "🍽️" : "📦"}
      </div>

      {/* Info Menu */}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>
          {menu.name}
        </div>
        <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>
          {menu.category}
        </div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "#3572EF" }}>
          Rp {menu.price.toLocaleString("id-ID")}
        </div>
      </div>

      {/* Quantity Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          onClick={() => onUpdateQuantity(menu.id, menu.quantity - 1)}
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            background: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          -
        </button>
        <span style={{ minWidth: "32px", textAlign: "center", fontWeight: 500 }}>
          {menu.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(menu.id, menu.quantity + 1)}
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            background: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(menu.id)}
        style={{
          background: "transparent",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
          color: "#ef4444",
          padding: "4px 8px",
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default TransactionCard;