import React, { useState } from "react";

const AddMenu = ({ onSave }) => {
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
  };

  return (
    <div
      style={{
        background: "#fafcff",
        borderRadius: "16px",
        padding: "16px",
        border: "1px solid #edf2f7",
      }}
    >
      <h3 style={{ fontSize: "16px", marginBottom: "16px" }}>Tambah Menu Baru</h3>
      <div style={{ width: "86%", height: "1px", background: "#e2e8f0", margin: "0 auto 16px auto" }}></div>
      
      {/* Drag & Drop */}
      <div
        style={{
          border: "2px dashed #3572EF",
          borderRadius: "16px",
          padding: "20px",
          textAlign: "center",
          marginBottom: "16px",
          cursor: "pointer",
        }}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <input id="fileInput" type="file" onChange={handleFileChange} style={{ display: "none" }} />
        {newMenu.imageFile ? (
          <span>{newMenu.imageFile.name}</span>
        ) : (
          <>
            <div>📁</div>
            <p style={{ fontSize: "12px", margin: "8px 0" }}>Drag & drop atau</p>
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

      <input
        type="text"
        name="name"
        placeholder="Nama Menu *"
        value={newMenu.name}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "12px", border: "1px solid #e2e8f0" }}
      />
      <input
        type="text"
        name="category"
        placeholder="Kategori *"
        value={newMenu.category}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "12px", border: "1px solid #e2e8f0" }}
      />
      <input
        type="number"
        name="price"
        placeholder="Harga *"
        value={newMenu.price}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "12px", border: "1px solid #e2e8f0" }}
      />
      <textarea
        name="description"
        placeholder="Deskripsi"
        value={newMenu.description}
        onChange={handleChange}
        rows="2"
        style={{ width: "100%", padding: "10px", marginBottom: "16px", borderRadius: "12px", border: "1px solid #e2e8f0", fontFamily: "inherit" }}
      />

      <button
        onClick={handleSave}
        style={{ width: "100%", background: "#3572EF", color: "white", border: "none", padding: "12px", borderRadius: "40px", fontWeight: "bold", cursor: "pointer" }}
      >
        Save
      </button>
    </div>
  );
};

export default AddMenu;