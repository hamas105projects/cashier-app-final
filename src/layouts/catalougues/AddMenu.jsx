import React, { useState } from "react";

const AddMenu = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newMenu, setNewMenu] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    imageFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMenu((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewMenu((prev) => ({ ...prev, imageFile: e.target.files[0] }));
  };

  const handleSave = () => {
    if (!newMenu.name || !newMenu.category || !newMenu.price) {
      alert("Name, Category, Price wajib diisi");
      return;
    }
    
    onSave(newMenu);
    
    setNewMenu({
      name: "",
      category: "",
      price: "",
      description: "",
      imageFile: null,
    });
    
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setNewMenu({
      name: "",
      category: "",
      price: "",
      description: "",
      imageFile: null,
    });
  };

  return (
    <div
      style={{
        background: "#fafcff",
        borderRadius: "16px",
        padding: "16px",
        border: "1px solid #edf2f7",
        height: "600px"
      }}
    >
      {!isOpen ? (
        // Closed Mode - Hanya tombol Add Menu dengan icon plus di kanan
        <div
          onClick={() => setIsOpen(true)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin:"0 20px",
            alignItems: "center",
            cursor: "pointer",
            borderBottom:"1px solid #e2e8f0",
            paddingBottom:"19px"
          }}
        >
          <span style={{ fontSize: "17px", fontWeight: 600, color: "black" }}>
            Add Menu
          </span>
          <button
            style={{
              background: "#3572EF",
              color: "white",
              border: "none",
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            +
          </button>
          
        </div>
        
      ) : (
        // Open Mode - Form lengkap
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "16px", margin: 0 }}>Tambah Menu Baru</h3>
            <button
              onClick={handleCancel}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#64748b",
                padding: "4px 8px",
                borderRadius: "8px",
                lineHeight: 1,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f1f5f9"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              ✕
            </button>
          </div>
          <div style={{ width: "100%", height: "1px", background: "#e2e8f0", margin: "0 0 16px 0" }}></div>
          
          {/* Drag & Drop - tanpa label */}
          <div
            style={{
              border: "2px dashed #3572EF",
              borderRadius: "16px",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              background: "#f8fafc",
              marginBottom: "16px",
            }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <input id="fileInput" type="file" onChange={handleFileChange} style={{ display: "none" }} />
            {newMenu.imageFile ? (
              <span style={{ color: "#3572EF", fontSize: "14px" }}>📄 {newMenu.imageFile.name}</span>
            ) : (
              <>
                <div style={{ fontSize: "32px" }}>📁</div>
                <p style={{ fontSize: "12px", margin: "8px 0", color: "#64748b" }}>Drag & drop atau</p>
                <button
                  type="button"
                  style={{
                    background: "#3572EF",
                    color: "white",
                    border: "none",
                    padding: "6px 16px",
                    borderRadius: "40px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Choose File
                </button>
              </>
            )}
          </div>

          {/* Nama Menu */}
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px", color: "#334155" }}>
              Nama Menu *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Contoh: Nasi Goreng"
              value={newMenu.name}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", borderRadius: "12px", border: "1px solid #e2e8f0", boxSizing: "border-box" }}
            />
          </div>

          {/* Kategori */}
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px", color: "#334155" }}>
              Kategori *
            </label>
            <input
              type="text"
              name="category"
              placeholder="Contoh: Makanan, Minuman, Snack"
              value={newMenu.category}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", borderRadius: "12px", border: "1px solid #e2e8f0", boxSizing: "border-box" }}
            />
          </div>

          {/* Harga */}
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px", color: "#334155" }}>
              Harga *
            </label>
            <input
              type="number"
              name="price"
              placeholder="Contoh: 25000"
              value={newMenu.price}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", borderRadius: "12px", border: "1px solid #e2e8f0", boxSizing: "border-box" }}
            />
          </div>

          {/* Deskripsi */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px", color: "#334155" }}>
              Deskripsi
            </label>
            <textarea
              name="description"
              placeholder="Contoh: Nasi goreng dengan topping ayam dan telur"
              value={newMenu.description}
              onChange={handleChange}
              rows="2"
              style={{ width: "100%", padding: "10px", borderRadius: "12px", border: "1px solid #e2e8f0", fontFamily: "inherit", boxSizing: "border-box" }}
            />
          </div>

          {/* Tombol Save full width - tanpa Cancel */}
          <button
            onClick={handleSave}
            style={{
              width: "100%",
              background: "#3572EF",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "40px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default AddMenu;