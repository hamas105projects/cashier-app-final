// src/components/CreateBill.js
import React, { useState } from "react";
import CardTransaction from "../../components/TrasactionCard";
import { createTransaction } from "../../services/api";
import { useAuthStore } from "../../stores/authStore"; // PAKAI ZUSTAND

const CreateBill = ({ 
  onPay, 
  selectedMenus, 
  setSelectedMenus,
  customerName,
  setCustomerName,
  orderType,
  setOrderType,
  tableNumber,
  setTableNumber
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Ambil dari Zustand store
  const { user, isEmployee } = useAuthStore();

  const handleRemoveMenu = (menuId) => {
    setSelectedMenus(selectedMenus.filter((item) => item.id !== menuId));
  };

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

  const calculateTotal = () => {
    return selectedMenus.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePayClick = async () => {
    // Validasi form
    if (!orderType) {
      alert("Pilih tipe pesanan terlebih dahulu");
      return;
    }
    if (orderType === "dinein" && !tableNumber) {
      alert("Pilih nomor meja terlebih dahulu");
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

    // CEK LOGIN dari Zustand store
    if (!user) {
      alert("Silakan login terlebih dahulu");
      return;
    }

    // CEK ROLE (hanya cashier yang bisa)
    if (!isEmployee()) {
      alert("Hanya kasir yang dapat melakukan transaksi");
      return;
    }

    // Siapkan data untuk API
    const transactionData = {
      userId: user.id,
      customerName: customerName.trim(),
      paymentMethod: "transfer",
      orderType: orderType === "dinein" ? "dine_in" : "takeaway",
      nomorTable: orderType === "dinein" ? parseInt(tableNumber) : null,
      discount: 0,
      tax: 0,
      notes: "",
      items: selectedMenus.map(menu => ({
        productId: menu.id,
        quantity: menu.quantity
      }))
    };

    // Tambahkan catatan jika ada
    const notes = selectedMenus
      .filter(menu => menu.note)
      .map(menu => `${menu.name}: ${menu.note}`)
      .join('\n');
    if (notes) transactionData.notes = notes;

    setIsProcessing(true);

    try {
      const result = await createTransaction(transactionData);
      
      // AMBIL DATA DARI RESPONSE YANG BENAR
      // Response dari backend menggunakan responseFormatter
      const transactionData_response = result.data || result;
      
      // Ambil nilai grandTotal dengan fallback
      const totalAmount = transactionData_response.grandTotal || calculateTotal();
      const invoiceNumber = transactionData_response.invoiceNumber || "N/A";
      const cashierName = transactionData_response.user?.name || user.name;
      
      // Sukses
      alert(`✅ Pembayaran berhasil!\nKasir: ${cashierName}\nInvoice: ${invoiceNumber}\nTotal: Rp ${totalAmount.toLocaleString("id-ID")}`);
      
      // Reset form
      setSelectedMenus([]);
      setCustomerName("");
      setOrderType(null);
      if (setTableNumber) setTableNumber("");
      
      // Panggil callback jika ada
      if (onPay) onPay(transactionData_response);
      
    } catch (error) {
      console.error("Transaction error:", error);
      
      // Ambil pesan error dari response jika ada
      const errorMessage = error.response?.data?.message || error.message || "Terjadi kesalahan";
      alert(`❌ Gagal memproses pembayaran: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

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
      <div style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "16px" }}>
        List Order
      </div>

      {/* Tombol Dine-in & Takeaway */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <button
          onClick={() => {
            setOrderType("dinein");
            if (setTableNumber) setTableNumber("");
          }}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "12px",
            background: orderType === "dinein" ? "#3572EF" : "white",
            color: orderType === "dinein" ? "white" : "#64748b",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "18px",
            border: orderType === "dinein" ? "none" : "1px solid #e2e8f0",
          }}
        >
          Dine-in
        </button>
        <button
          onClick={() => {
            setOrderType("takeaway");
            if (setTableNumber) setTableNumber("");
          }}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "12px",
            background: orderType === "takeaway" ? "#3572EF" : "white",
            color: orderType === "takeaway" ? "white" : "#64748b",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "18px",
            border: orderType === "takeaway" ? "none" : "1px solid #e2e8f0",
          }}
        >
          Takeaway
        </button>
      </div>

      {/* Input Nama Customer & Nomor Meja */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <div style={{ flex: 3 }}>
          <label style={{ fontSize: "12px", fontWeight: "700", color: "#1e293b", display: "block", marginBottom: "8px" }}>
            Nama Customer
          </label>
          <input
            type="text"
            placeholder="Masukkan nama customer"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxSizing: "border-box",
              fontSize: "14px",
            }}
          />
        </div>

        {orderType === "dinein" && (
          <div style={{ flex: 2 }}>
            <label style={{ fontSize: "12px", fontWeight: "700", color: "#1e293b", display: "block", marginBottom: "8px" }}>
              Nomor Meja
            </label>
            <select
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                fontSize: "14px",
                backgroundColor: "white",
                cursor: "pointer",
              }}
            >
              <option value="">Pilih nomor meja</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((number) => (
                <option key={number} value={number}>
                  Meja {number}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Daftar Menu yang Dipilih */}
      <div style={{ flex: 1, overflowY: "auto", marginBottom: "20px", paddingRight: "4px" }}>
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
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#94a3b8", fontSize: "14px" }}>
            Belum ada menu dipilih
          </div>
        )}
      </div>

      {/* Total Harga */}
      {selectedMenus.length > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: "1px solid #e2e8f0", marginBottom: "12px" }}>
          <span style={{ fontWeight: 600, color: "#1e293b" }}>Total:</span>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#3572EF" }}>
            Rp {calculateTotal().toLocaleString("id-ID")}
          </span>
        </div>
      )}

      {/* Tombol Pay */}
      <button
        onClick={handlePayClick}
        disabled={isProcessing}
        style={{
          width: "100%",
          background: isProcessing ? "#94a3b8" : "#3572EF",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "40px",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: isProcessing ? "not-allowed" : "pointer",
        }}
        onMouseEnter={(e) => {
          if (!isProcessing) e.currentTarget.style.background = "#2b5fce";
        }}
        onMouseLeave={(e) => {
          if (!isProcessing) e.currentTarget.style.background = "#3572EF";
        }}
      >
        {isProcessing ? "Processing..." : "Pay"}
      </button>
    </div>
  );
};

export default CreateBill;