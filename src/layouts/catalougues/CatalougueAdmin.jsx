import React, { useState } from "react";
import AddMenuForm from "./AddMenu";
import MenuCard from "../../components/ProductCard";
import foodIcon from '../../assets/images/foodDashboard.png';
import beverageIcon from '../../assets/images/beverageDashboard.png';
import dessertIcon from '../../assets/images/dessertDashboard.png';

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

  const handleAddMenu = (newMenuData) => {
    const newId = menus.length + 1;
    setMenus([
      ...menus,
      {
        id: newId,
        name: newMenuData.name,
        category: newMenuData.category,
        price: Number(newMenuData.price),
        description: newMenuData.description,
        imageFile: newMenuData.imageFile,
      },
    ]);
    alert("Menu berhasil ditambahkan");
  };

  return (
    <div style={{ width: "98%", padding: "20px", borderRadius: "24px" }}>
      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
        {/* KOLOM KIRI: daftar menu */}
        <div style={{ flex: "7" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h1 style={{ fontSize: "20px", margin: 0 }}>List Menu</h1>
            <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "20px", border: "1px solid #e2e8f0" }}>
              Total: {filteredMenus.length} items
            </span>
          </div>

          {/* Filter kategori */}
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

          {/* Grid menu */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", margin: "0 -13px" }}>
            {filteredMenus.map((menu) => (
              <MenuCard key={menu.id} menu={menu} />
            ))}
          </div>
        </div>

        {/* KOLOM KANAN: Form Tambah Menu */}
        <div style={{ flex: "2.4" }}>
          <AddMenuForm onSave={handleAddMenu} />
        </div>
      </div>
    </div>
  );
};

export default CatalougeAdmin;