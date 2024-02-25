// ImageSelector.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function PictureSelector({ onSelect }) {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Charger la liste des images depuis le backend
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/pictures`)
      .then((response) => setImages(response.data))
      .catch((error) =>
        console.error("Erreur lors du chargement des images", error)
      );
  }, []);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    onSelect(image);
  };

  return (
    <div>
      {images.map((image) => (
        <label key={image.id}>
          <input
            type="radio"
            name="selectedImage"
            value={image.id}
            checked={selectedImage ? selectedImage.id === image.id : false}
            onChange={() => handleImageSelect(image)}
          />
          <img
            src={`/assets/tip_icons/${image.picture_url}`}
            alt="Icône de l'astuce"
            style={{ width: "50px", height: "50px", marginRight: "5px" }}
          />
        </label>
      ))}
    </div>
  );
}

PictureSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default PictureSelector;
