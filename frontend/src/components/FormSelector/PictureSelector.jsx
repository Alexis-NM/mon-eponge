import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import "../../styles/components/FormSelector/PictureSelector.scss";
import leftArrowIcon from "../../assets/icons/left_arrow.svg";
import rightArrowIcon from "../../assets/icons/right_arrow.svg";

function PictureSelector({ onSelect, selectedImageId }) {
  const [images, setImages] = useState([]);
  const [localSelectedImageId, setLocalSelectedImageId] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(0);

  useEffect(() => {
    // Chargement de la liste des images depuis le backend
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/pictures`)
      .then((response) => setImages(response.data))
      .catch((error) =>
        console.error("Erreur lors du chargement des images", error)
      );
  }, []);

  useEffect(() => {
    // Mettre à jour l'image sélectionnée localement lorsque l'image sélectionnée change à partir des props
    setLocalSelectedImageId(selectedImageId);
  }, [selectedImageId]);

  const handleImageSelect = (imageId) => {
    // Si l'image sélectionnée est déjà sélectionnée localement, ignorer
    if (imageId === localSelectedImageId) return;

    // Mettre à jour l'image sélectionnée localement
    setLocalSelectedImageId(imageId);

    // Sélectionner l'image
    const selectedImage = images.find((image) => image.id === imageId);
    onSelect(selectedImage);
  };

  const handlePrev = () => {
    setCurrentGroup((prevGroup) =>
      prevGroup === 0 ? Math.ceil(images.length / 3) - 1 : prevGroup - 1
    );
  };

  const handleNext = () => {
    setCurrentGroup((prevGroup) =>
      prevGroup === Math.ceil(images.length / 3) - 1 ? 0 : prevGroup + 1
    );
  };

  const startIdx = currentGroup * 3;
  const endIdx = Math.min((currentGroup + 1) * 3, images.length);

  return (
    <section className="picture-selector">
      <button className="arrow-button" onClick={handlePrev} type="button">
        <img src={leftArrowIcon} alt="Left Arrow" />
      </button>
      <div className="image-container">
        {images.slice(startIdx, endIdx).map((image) => (
          <button
            key={image.id}
            onClick={() => handleImageSelect(image.id)}
            type="button"
          >
            <img
              src={`/assets/tip_icons/${image.picture_url}`}
              alt="Icône de l'astuce"
              style={{ width: "50px", height: "50px", marginRight: "5px" }}
              className={`icon ${
                localSelectedImageId === image.id ? "selected" : ""
              }`}
            />
          </button>
        ))}
      </div>
      <button className="arrow-button" onClick={handleNext} type="button">
        <img src={rightArrowIcon} alt="Right Arrow" />
      </button>
    </section>
  );
}
PictureSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedImageId: PropTypes.number,
};

PictureSelector.defaultProps = {
  selectedImageId: null,
};
export default PictureSelector;
