import React from "react";

const ProductCard =({ menu }) => {
  return (
    <div
      style={{
        border: "1px solid #edf2f7",
        borderRadius: "16px",
        padding: "12px",
        background: "white",
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
  );
};

export default ProductCard;