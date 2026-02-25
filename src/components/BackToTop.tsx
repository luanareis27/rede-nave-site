import React, { useState, useEffect } from "react";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const buttonStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    background: "#6A0DAD",
    color: "#DEC9E7",
    fontSize: "1.5rem",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    zIndex: 9997,
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? "visible" : "hidden",
    transition: "all 0.3s ease",
    transform: isHovered ? "translateY(0) scale(1.1)" : "translateY(0)",
    transformOrigin: "center",
  };

  return (
    <button
      className="back-to-top-btn"
      style={buttonStyle}
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Voltar ao topo"
    >
      ↑
    </button>
  );
};

export default BackToTop;