import React, { useState } from "react";
import foodIcon from '../assets/images/foodDashboard.png';
import beverageIcon from '../assets/images/beverageDashboard.png';
import dessertIcon from '../assets/images/dessertDashboard.png';

const initialMenus = [
  { id: 1, name: "Nasi Goreng", price: 25000, category: "Foods" },
  { id: 2, name: "Sate Ayam", price: 30000, category: "Foods" },
  { id: 3, name: "Es Teh", price: 5000, category: "Beverages" },
  { id: 4, name: "Pisang Goreng", price: 15000, category: "Foods" },
  { id: 5, name: "Mie Goreng", price: 20000, category: "Foods" },
  { id: 6, name: "Es Jeruk", price: 8000, category: "Beverages" },
  { id: 7, name: "Lumpia", price: 12000, category: "Foods" },
  { id: 8, name: "Ayam Bakar", price: 35000, category: "Foods" },
  { id: 9, name: "Cheesecake", price: 28000, category: "Dessert" },
  { id: 10, name: "Pudding Coklat", price: 18000, category: "Dessert" },
];

const CatalougeAdmin = () => {
  const [menus, setMenus] = useState(initialMenus);
  const [activeCategory, setActiveCategory] = useState("All");
  const [newMenu, setNewMenu] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    imageFile: null,
  });

  const categories = [
    { name: "All", icon: null },
    { name: "Foods", icon: foodIcon },
    { name: "Beverages", icon: beverageIcon },
    { name: "Dessert", icon: dessertIcon },
  ];

  const filteredMenus =
    activeCategory === "All"
      ? menus
      : menus.filter((m) => m.category === activeCategory);

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
    const newId = menus.length + 1;
    setMenus([
      ...menus,
      {
        id: newId,
        name: newMenu.name,
        category: newMenu.category,
        price: Number(newMenu.price),
        description: newMenu.description,
        imageFile: newMenu.imageFile,
      },
    ]);
    setNewMenu({
      name: "",
      category: "",
      price: "",
      description: "",
      imageFile: null,
    });
    alert("Menu berhasil ditambahkan");
  };

  return (
    <div style={{ width: "98%", padding: "20px", borderRadius: "24px" }}>
      {/* KONTEN UTAMA: dua kolom (kiri daftar menu, kanan form add menu) */}
      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
        {/* KOLOM KIRI: daftar menu (70%) - tanpa background */}
        <div style={{ flex: "7" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h1 style={{ fontSize: "20px", margin: 0 }}>List Menu</h1>
            <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "20px", border: "1px solid #e2e8f0" }}>
              Total: {filteredMenus.length} items
            </span>
          </div>

          {/* Filter kategori - hanya active yang punya background */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", gap: "12px" }}>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                style={{
                  flex: 1,
                  background: activeCategory === cat.name ? "#3572EF" : "transparent",
                  color: activeCategory === cat.name ? "white" : "#334155",
                  border: activeCategory === cat.name ? "none" : "1px solid #cbd5e1",
                  padding: "6px 18px",
                  borderRadius: "40px",
                  cursor: "pointer",
                  fontWeight: "500",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {cat.icon && <img src={cat.icon} alt={cat.name} style={{ width: "18px", height: "18px" }} />}
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid menu - card tanpa background & shadow */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", margin:"0 -13px" }}>
            {filteredMenus.map((menu) => (
              <div
  key={menu.id}
  style={{
    border: "1px solid #edf2f7",
    borderRadius: "16px",
    padding: "12px",
    background: "white",        // <-- tambahkan ini
  }}
>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "16px" }}>{menu.name}</h3>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#5b6e8c",
                    background: "#f1f5f9",
                    padding: "2px 10px",
                    borderRadius: "20px",
                  }}
                >
                  {menu.category}
                </span>
                <p style={{ color: "#3572EF", fontWeight: "bold", margin: "8px 0 0" }}>
                  Rp {menu.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* KOLOM KANAN: Form Tambah Menu (30%) - SATU-SATUNYA YANG PUNYA BACKGROUND */}
        <div
          style={{
            flex: "2.4",
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
      </div>
    </div>
  );
};

export default CatalougeAdmin;