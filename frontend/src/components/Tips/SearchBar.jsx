import { useState } from "react";
import PropTypes from "prop-types";

import search from "../../assets/icons/search.svg";

import "../../styles/components/Tips/SearchBar.scss";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    onSearch(value); // Appeler la fonction de recherche à chaque changement
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="search-bar-form" onSubmit={handleSubmit}>
      <img src={search} alt="Search Icon" className="search-icon" />
      <input
        type="text"
        placeholder="Recherchez des astuces ici..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
