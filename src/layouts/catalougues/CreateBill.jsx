import React, { useState } from "react";
import CardTransaction from "../../components/TrasactionCard"; // Import komponen CardTransaction

const CreateBill = ({ onPay, onAddMenu, selectedMenusFromParent = [], customerNameFromParent = "", orderTypeFromParent = null }) => {
  const [orderType, setOrderType] = useState(orderTypeFromParent); // 'dinein' or 'takeaway'
  const [customerName, setCustomerName] = useState(customerNameFromParent);
  const [selectedMenus, setSelectedMenus] = useState(selectedMenusFromParent);

  // Fungsi untuk menambah menu ke bill (bisa dipanggil dari parent via ref atau props)
  const addMenuToBill = (menu) => {
    const existingMenu = selectedMenus.find((item) => item.id === menu.id);
    if (existingMenu) {
      setSelectedMenus(
        selectedMenus.map((item) =>
          item.id === menu.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedMenus([...selectedMenus, { ...menu, quantity: 1 }]);
    }
  };

  // Fungsi untuk menghapus menu dari bill
  const handleRemoveMenu = (menuId) => {
    setSelectedMenus(selectedMenus.filter((item) => item.id !== menuId));
  };

  // Fungsi untuk update quantity
  const handleUpdateQuantity = (menuId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveMenu(menuId);
    } else {
      setSelectedMenus(
        selectedMenus.map((item) =>
          item.id === menuId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Hitung total harga
  const calculateTotal = () => {
    return selectedMenus.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePay = () => {
    if (!orderType) {
      alert("Pilih tipe pesanan terlebih dahulu");
      return;
    }
    if (!customerName.trim()) {
      alert("Masukkan nama customer");
      return;
    }
    if (selectedMenus.length === 0) {
      alert("Pilih menu terlebih dahulu");
      return;
    }

    const billData = {
      orderType,
      customerName,
      items: selectedMenus,
      total: calculateTotal(),
      date: new Date(),
    };

    onPay(billData);

    // Reset form
    setOrderType(null);
    setCustomerName("");
    setSelectedMenus([]);
  };

  // Expose fungsi addMenuToBill ke parent jika perlu
  React.useImperativeHandle(React.useRef(), () => ({
    addMenu: addMenuToBill
  }));

  return (
    <div
      style={{
        background: "#fafcff",
        borderRadius: "16px",
        padding: "16px",
        border: "1px solid #edf2f7",
        height: "600px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Tombol Dine-in dan Takeaway */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
       
  <button
    onClick={() => setOrderType("dinein")}
    style={{
      flex: 1,
      padding: "12px",
      borderRadius: "12px",
      background: orderType === "dinein" ? "#3572EF" : "white",
      color: orderType === "dinein" ? "white" : "#64748b",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "14px",
      boxShadow: orderType === "dinein" ? "none" : "0 1px 2px rgba(0,0,0,0.05)",
      border: orderType === "dinein" ? "none" : "1px solid #e2e8f0",
    }}
  >
    Dine-in
  </button>
  <button
    onClick={() => setOrderType("takeaway")}
    style={{
      flex: 1,
      padding: "12px",
      borderRadius: "12px",
      background: orderType === "takeaway" ? "#3572EF" : "white",
      color: orderType === "takeaway" ? "white" : "#64748b",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "14px",
      boxShadow: orderType === "takeaway" ? "none" : "0 1px 2px rgba(0,0,0,0.05)",
      border: orderType === "takeaway" ? "none" : "1px solid #e2e8f0",
    }}
  >
    Takeaway
  </button>

      </div>

      {/* Input Nama Customer */}
      <input
        type="text"
        placeholder="Nama Customer"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          boxSizing: "border-box",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      />

      {/* Daftar Menu yang Dipilih - Scrollable */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: "20px",
          paddingRight: "4px",
        }}
      >
        {selectedMenus.length > 0 ? (
          selectedMenus.map((menu) => (
            <CardTransaction
              key={menu.id}
              menu={menu}
              onRemove={handleRemoveMenu}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#94a3b8",
              fontSize: "14px",
            }}
          >
            Belum ada menu dipilih
          </div>
        )}
      </div>

      {/* Total Harga */}
      {selectedMenus.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 0",
            borderTop: "1px solid #e2e8f0",
            marginBottom: "12px",
          }}
        >
          <span style={{ fontWeight: 600, color: "#1e293b" }}>Total:</span>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#3572EF" }}>
            Rp {calculateTotal().toLocaleString("id-ID")}
          </span>
        </div>
      )}

      {/* Tombol Pay (pengganti Save) */}
      <button
        onClick={handlePay}
        style={{
          width: "100%",
          background: "#3572EF",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "40px",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#2b5fce")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#3572EF")}
      >
        Pay
      </button>
    </div>
  );
};

export default CreateBill;