import React from "react";
import "./Header.css"

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo">Spotify Clone</div>
      <input
        type="text"
        placeholder="Sök efter låtar eller artister..."
        className="search-bar"
      />
      <div className="profile-icon">👤</div>
    </header>
  );
};

export default Header;