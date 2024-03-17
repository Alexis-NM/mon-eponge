import React, { useState } from "react";
import search from "../../assets/icons/search.svg";

import "../../styles/components/Header/SearchBar.scss";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // Add your logic here
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-bar">
          <img src={search} alt="Search Icon" className="search-icon" />
          <input
            type="text"
            placeholder="Recherchez des astuces ici..."
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            className="search-input"
          />
        </div>
      </form>
    </div>
  );
}
export default SearchBar;
