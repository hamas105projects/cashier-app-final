import React, { useState } from "react";
import maximizeIcon from '../assets/images/maximize.png';

const ProductCard = ({ menu }) => {
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle image error - fallback to local image
  const handleImageError = () => {
    setImageError(true);
  };

  // Get image source (either from menu or fallback)
  const getImageSrc = () => {
    if (menu.imageFile && !imageError) {
      // If imageFile is a File object or URL
      if (typeof menu.imageFile === 'string') {
        return menu.imageFile;
      } else if (menu.imageFile instanceof File) {
        return URL.createObjectURL(menu.imageFile);
      }
    }
    return '/images/mi-ayam.webp'; // Fallback image path
  };

  // Handle modal open
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        style={{
          border: "1px solid #edf2f7",
          borderRadius: "16px",
          background: "white",
          overflow: "hidden",
          position: "relative",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Image Container */}
        <div style={{ position: "relative", width: "100%", height: "160px", overflow: "hidden" }}>
          <img
            src={getImageSrc()}
            alt={menu.name}
            onError={handleImageError}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          
          {/* Category Emblem - Top Right Corner */}
          <span
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              fontSize: "11px",
              fontWeight: "500",
              color: "white",
              background: "#3572ea",
              backdropFilter: "blur(4px)",
              padding: "4px 10px",
              borderRadius: "20px",
              letterSpacing: "0.3px",
              zIndex: 1,
            }}
          >
            {menu.category}
          </span>
        </div>

        {/* Content Container */}
        <div style={{ padding: "12px" }}>
          {/* Menu Name */}
          <h3 style={{ 
            margin: "0 0 8px 0", 
            fontSize: "16px", 
            fontWeight: "600",
            color: "#1e293b"
          }}>
            {menu.name}
          </h3>

          {/* Description */}
          <p style={{
            margin: "0 0 12px 0",
            fontSize: "12px",
            color: "#64748b",
            lineHeight: "1.4",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}>
            {menu.description || "Nikmati kelezatan hidangan istimewa ini"}
          </p>

          {/* Price and Maximize Button Row */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "8px"
          }}>
            {/* Price Section */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              <p style={{
                color: "#2563EB",
                fontWeight: "bold",
                margin: 0,
                fontSize: "15px"
              }}>
                Rp {menu.price.toLocaleString()}
              </p>
              <span style={{
                color: "#94a3b8",
                fontSize: "11px",
                fontWeight: "500"
              }}>
                /porsi
              </span>
            </div>

            {/* Maximize Icon Button */}
            <button
              onClick={handleOpenModal}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f1f5f9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <img
                src={maximizeIcon}
                alt="maximize"
                style={{
                  width: "20px",
                  height: "20px",
                  opacity: 0.7,
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for enlarged view */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              width: "400px",
              maxWidth: "90%",
              position: "relative",
              overflow: "hidden", // Mencegah scroll pada modal
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "rgba(0,0,0,0.7)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                cursor: "pointer",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              ×
            </button>
            <img
              src={getImageSrc()}
              alt={menu.name}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "300px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "20px" }}>
              <h2 style={{ margin: "0 0 8px 0" }}>{menu.name}</h2>
              <span
                style={{
                  fontSize: "12px",
                  color: "#5b6e8c",
                  background: "#f1f5f9",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  display: "inline-block",
                  marginBottom: "12px",
                }}
              >
                {menu.category}
              </span>
              <p style={{ color: "#64748b", lineHeight: "1.6", margin: "12px 0" }}>
                {menu.description || "Nikmati kelezatan hidangan istimewa ini"}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                <p style={{
                  color: "#2563EB",
                  fontWeight: "bold",
                  margin: 0,
                  fontSize: "18px"
                }}>
                  Rp {menu.price.toLocaleString()}
                </p>
                <span style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  fontWeight: "500"
                }}>
                  /porsi
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;