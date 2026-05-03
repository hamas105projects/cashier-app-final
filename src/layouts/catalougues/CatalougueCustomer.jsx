import React, { useState } from "react";
import CreateBill from "./CreateBill";
import ProductCard from "../../components/ProductCard";
import useProducts from "../../hooks/useProducts";
import foodIcon from '../../assets/images/foodDashboard.png';
import beverageIcon from '../../assets/images/beverageDashboard.png';
import dessertIcon from '../../assets/images/dessertDashboard.png';

const CatalougeCustomer = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { products, loading, error } = useProducts();

  // STATE UNTUK BILL
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [orderType, setOrderType] = useState(null);
  const [tableNumber, setTableNumber] = useState(""); // TAMBAH INI

  const categories = [
    { name: "All", icon: null },
    { name: "Foods", icon: foodIcon },
    { name: "Beverages", icon: beverageIcon },
    { name: "Dessert", icon: dessertIcon },
  ];

  const categoryMap = {
    'food': 'Foods',
    'beverage': 'Beverages',
    'dessert': 'Dessert',
  };

  const menus = products.map(p => ({
    ...p,
    category: categoryMap[p.category] || p.category
  }));

  const filteredMenus = activeCategory === "All"
    ? menus
    : menus.filter((m) => m.category === activeCategory);

  // FUNGSI TAMBAH KE BILL
  const handleAddToBill = (menu) => {
    setSelectedMenus(prev => {
      const existing = prev.find(m => m.id === menu.id);
      if (existing) {
        return prev.map(m =>
          m.id === menu.id ? { ...m, quantity: m.quantity + 1 } : m
        );
      }
      return [...prev, { ...menu, quantity: 1 }];
    });
  };

  const handlePay = (billData) => {
    alert(`Pembayaran berhasil!\nInvoice: ${billData.invoiceNumber}\nTotal: Rp ${billData.grandTotal.toLocaleString("id-ID")}`);
    // Reset setelah bayar
    setSelectedMenus([]);
    setCustomerName("");
    setOrderType(null);
    setTableNumber(""); // TAMBAH RESET TABLE NUMBER
  };

  if (loading) return <div style={{ padding: 50, textAlign: "center" }}>Loading menu...</div>;
  if (error) return <div style={{ padding: 50, textAlign: "center", color: "red" }}>Error: {error}</div>;

  return (
    <div style={{ width: "98%", padding: "30px 0 10px 0", borderRadius: "24px" }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        
        {/* KIRI: LIST MENU */}
        <div style={{ flex: "4" }}>
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

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h1 style={{ fontSize: "20px", margin: 0 }}>List Menu</h1>
            <span style={{ fontSize: "16px", padding: "4px 12px", fontWeight: "800" }}>
              Total: {filteredMenus.length} items
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(160px, 1fr))", gap: "12px" }}>
            {filteredMenus.map((menu) => (
              <ProductCard 
                key={menu.id} 
                menu={menu} 
                onAddToBill={handleAddToBill}
              />
            ))}
          </div>
        </div>

        {/* KANAN: CREATE BILL */}
        <div style={{ flex: "4", marginRight: "-32px" }}>
          <CreateBill 
            onPay={handlePay}
            selectedMenus={selectedMenus}
            setSelectedMenus={setSelectedMenus}
            customerName={customerName}
            setCustomerName={setCustomerName}
            orderType={orderType}
            setOrderType={setOrderType}
            tableNumber={tableNumber}
            setTableNumber={setTableNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default CatalougeCustomer;