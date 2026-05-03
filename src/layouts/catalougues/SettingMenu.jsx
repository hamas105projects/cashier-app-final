import React, { useState, useRef, useLayoutEffect } from "react";

const SettingMenu = ({ onSave, onUpdate, onDelete, editingMenu, onCancel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newMenu, setNewMenu] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    imageFile: null,
  });
  
  const isEditMode = editingMenu !== null;
  const prevEditingMenuId = useRef(null);

  useLayoutEffect(() => {
    if (editingMenu && editingMenu.id !== prevEditingMenuId.current) {
      // Update form dengan data editingMenu
      setNewMenu({
        name: editingMenu.name || "",
        category: editingMenu.category || "",
        price: editingMenu.price?.toString() || "", // Ensure price is string
        description: editingMenu.description || "",
        imageFile: editingMenu.imageFile || null,
      });
      setIsOpen(true);
      prevEditingMenuId.current = editingMenu.id;
    } else if (!editingMenu && prevEditingMenuId.current !== null) {
      // Reset form ketika cancel
      setNewMenu({
        name: "",
        category: "",
        price: "",
        description: "",
        imageFile: null,
      });
      setIsOpen(false);
      prevEditingMenuId.current = null;
    }
  }, [editingMenu]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMenu((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewMenu((prev) => ({ ...prev, imageFile: e.target.files[0] }));
    }
  };

  const handleSave = () => {
    // Validate inputs
    if (!newMenu.name || !newMenu.name.trim()) {
      alert("Nama Menu wajib diisi");
      return;
    }
    
    if (!newMenu.category) {
      alert("Kategori wajib diisi");
      return;
    }
    
    if (!newMenu.price || newMenu.price === "") {
      alert("Harga wajib diisi");
      return;
    }
    
    const priceNumber = Number(newMenu.price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert("Harga harus berupa angka positif");
      return;
    }
    
    // Prepare data for save/update
    const menuData = {
      ...newMenu,
      price: priceNumber, // Send as number
    };
    
    if (isEditMode) {
      onUpdate(menuData);
    } else {
      onSave(menuData);
    }
    
    // Reset form after save
    setNewMenu({
      name: "",
      category: "",
      price: "",
      description: "",
      imageFile: null,
    });
    setIsOpen(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (onDelete && editingMenu) {
      await onDelete(editingMenu.id);
      setShowDeleteConfirm(false);
      setIsOpen(false);
      if (onCancel) onCancel();
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
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
    setShowDeleteConfirm(false);
    if (onCancel) onCancel();
  };

  const handleOpen = () => {
    if (!isEditMode) {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div
        style={{
          background: "#fafcff",
          borderRadius: "16px",
          padding: "16px",
          border: "1px solid #edf2f7",
          height: "600px",
          overflowY: "auto"
        }}
      >
        {!isOpen ? (
          <div
            onClick={handleOpen}
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 20px",
              alignItems: "center",
              cursor: "pointer",
              borderBottom: "1px solid #e2e8f0",
              paddingBottom: "19px"
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
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "16px", margin: 0 }}>
                {isEditMode ? "Edit Menu" : "Tambah Menu Baru"}
              </h3>
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
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                ✕
              </button>
            </div>
            <div style={{ width: "100%", height: "1px", background: "#e2e8f0", margin: "0 0 16px 0" }}></div>
            
            {/* Drag & Drop */}
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
              <input id="fileInput" type="file" onChange={handleFileChange} style={{ display: "none" }} accept="image/*" />
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
                placeholder="Contoh: Nasi Goreng Spesial"
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
              <select
                name="category"
                value={newMenu.category}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", borderRadius: "12px", border: "1px solid #e2e8f0", boxSizing: "border-box" }}
              >
                <option value="">Pilih Kategori</option>
                <option value="Foods">Foods</option>
                <option value="Beverages">Beverages</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>

            {/* Harga */}
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px", color: "#334155" }}>
                Harga (Rp) *
              </label>
              <input
                type="number"
                name="price"
                placeholder="Contoh: 25000"
                value={newMenu.price}
                onChange={handleChange}
                min="0"
                step="1000"
                style={{ width: "100%", padding: "10px", borderRadius: "12px", border: "1px solid #e2e8f0", boxSizing: "border-box" }}
              />
              <small style={{ color: "#64748b", fontSize: "11px", marginTop: "4px", display: "block" }}>
                Masukkan angka tanpa titik atau koma (contoh: 25000 untuk Rp 25.000)
              </small>
            </div>

            {/* Deskripsi */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px", color: "#334155" }}>
                Deskripsi
              </label>
              <textarea
                name="description"
                placeholder="Contoh: Nasi goreng dengan topping ayam suwir, telur mata sapi, dan kerupuk"
                value={newMenu.description}
                onChange={handleChange}
                rows="3"
                style={{ width: "100%", padding: "10px", borderRadius: "12px", border: "1px solid #e2e8f0", fontFamily: "inherit", boxSizing: "border-box" }}
              />
            </div>

            {/* Tombol Save dan Delete */}
            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              <button
                onClick={handleSave}
                style={{
                  flex: 1,
                  background: "#3572EF",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "40px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {isEditMode ? "Update" : "Save"}
              </button>
              
              {isEditMode && (
                <button
                  onClick={handleDeleteClick}
                  style={{
                    background: "white",
                    color: "#dc2626",
                    border: "1.5px solid #dc2626",
                    padding: "12px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#fef2f2";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Delete
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Popup Konfirmasi Delete */}
      {showDeleteConfirm && (
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
            zIndex: 2000,
          }}
          onClick={handleCancelDelete}
        >
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "24px",
              width: "320px",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" style={{ marginBottom: "16px", margin: "0 auto 16px" }}>
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", fontWeight: "600" }}>
              Hapus Menu?
            </h3>
            <p style={{ margin: "0 0 24px 0", color: "#64748b", fontSize: "14px" }}>
              Apakah anda yakin ingin menghapus menu "{editingMenu?.name}"?
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handleCancelDelete}
                style={{
                  flex: 1,
                  background: "#f1f5f9",
                  color: "#334155",
                  border: "none",
                  padding: "10px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#e2e8f0")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#f1f5f9")}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                style={{
                  flex: 1,
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingMenu;