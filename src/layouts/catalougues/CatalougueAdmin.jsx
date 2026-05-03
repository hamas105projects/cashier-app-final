import React, { useState, useCallback } from "react";
import SettingMenu from "./SettingMenu";
import MenuCard from "../../components/ProductCard";
import useProducts from "../../hooks/useProducts";
import foodIcon from '../../assets/images/foodDashboard.png';
import beverageIcon from '../../assets/images/beverageDashboard.png';
import dessertIcon from '../../assets/images/dessertDashboard.png';
import { createProduct, updateProduct, deleteProduct } from "../../services/api";

// CONSTANTS DI LUAR KOMPONEN
const CATEGORY_MAP = {
  'Foods': 'food',
  'Beverages': 'beverage',
  'Dessert': 'dessert',
};

const CATEGORY_TO_FRONTEND = {
  'food': 'Foods',
  'beverage': 'Beverages',
  'dessert': 'Dessert',
};

const CatalougeAdmin = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [editingMenu, setEditingMenu] = useState(null);
  
  const { products, loading, error, refetch } = useProducts();

  const categories = [
    { name: "All", icon: null },
    { name: "Foods", icon: foodIcon },
    { name: "Beverages", icon: beverageIcon },
    { name: "Dessert", icon: dessertIcon },
  ];

  // Langsung map
  const menus = products.map(p => ({
    ...p,
    category: CATEGORY_TO_FRONTEND[p.category] || p.category,
    price: Number(p.price)
  }));

  const filteredMenus = activeCategory === "All"
    ? menus
    : menus.filter((m) => m.category === activeCategory);

  const handleAddMenu = useCallback(async (newMenuData) => {
    try {
      const formData = new FormData();
      formData.append('name', newMenuData.name);
      formData.append('category', CATEGORY_MAP[newMenuData.category]);
      formData.append('price', Number(newMenuData.price));
      
      if (newMenuData.description) {
        formData.append('description', newMenuData.description);
      }
      if (newMenuData.imageFile && newMenuData.imageFile instanceof File) {
        formData.append('image', newMenuData.imageFile);
      }

      await createProduct(formData);
      alert("Menu berhasil ditambahkan");
      await refetch();
      setEditingMenu(null);
    } catch (error) {
      console.error("Add menu failed:", error);
      alert("Gagal menambahkan menu: " + error.message);
    }
  }, [refetch]); // <-- DEPENDENCY ONLY refetch

  const handleUpdateMenu = useCallback(async (updatedMenuData) => {
    if (!editingMenu) return;
    
    try {
      const formData = new FormData();
      formData.append('name', updatedMenuData.name);
      formData.append('category', CATEGORY_MAP[updatedMenuData.category]);
      formData.append('price', Number(updatedMenuData.price));
      
      if (updatedMenuData.description) {
        formData.append('description', updatedMenuData.description);
      }
      if (updatedMenuData.imageFile && updatedMenuData.imageFile instanceof File) {
        formData.append('image', updatedMenuData.imageFile);
      }

      await updateProduct(editingMenu.id, formData);
      alert("Menu berhasil diupdate");
      await refetch();
      setEditingMenu(null);
    } catch (error) {
      console.error("Update menu failed:", error);
      alert("Gagal mengupdate menu: " + error.message);
    }
  }, [editingMenu, refetch]); // <-- DEPENDENCY editingMenu & refetch

  const handleDeleteMenu = useCallback(async (productId) => {
    try {
      await deleteProduct(productId);
      alert("Menu berhasil dihapus");
      await refetch();
      setEditingMenu(null);
    } catch (error) {
      console.error("Delete menu failed:", error);
      alert("Gagal menghapus menu: " + error.message);
    }
  }, [refetch]);

  const handleEditClick = (menu) => {
    setEditingMenu(menu);
  };

  const handleCancelEdit = () => {
    setEditingMenu(null);
  };

  if (loading) {
    return (
      <div style={{ padding: 50, textAlign: "center" }}>
        <div>Loading menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 50, textAlign: "center" }}>
        <div style={{ color: "red", marginBottom: "10px" }}>Error: {error}</div>
        <button 
          onClick={refetch}
          style={{
            padding: "8px 16px",
            background: "#3572EF",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: "98%", padding: "20px", borderRadius: "24px" }}>
      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
        <div style={{ flex: "7" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h1 style={{ fontSize: "20px", margin: 0 }}>List Menu</h1>
            <span style={{ fontSize: "16px", padding: "4px 12px", fontWeight: "800" }}>
              Total: {filteredMenus.length} items
            </span>
          </div>

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
                  padding: "14px 18px",
                  borderRadius: "13px",
                  cursor: "pointer",
                  fontWeight: "500",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {cat.icon && (
                  <img 
                    src={cat.icon} 
                    alt={cat.name} 
                    style={{
                      width: "18px", 
                      height: "18px",
                      filter: activeCategory === cat.name ? "brightness(0) invert(1)" : "none"
                    }} 
                  />
                )}
                {cat.name}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", margin: "0 -13px" }}>
            {filteredMenus.map((menu) => (
              <MenuCard 
                key={menu.id} 
                menu={menu} 
                onClick={() => handleEditClick(menu)}
              />
            ))}
          </div>
        </div>

        <div style={{ flex: "2.4" }}>
          <SettingMenu 
            onSave={handleAddMenu}
            onUpdate={handleUpdateMenu}
            onDelete={handleDeleteMenu}
            editingMenu={editingMenu}
            onCancel={handleCancelEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default CatalougeAdmin;