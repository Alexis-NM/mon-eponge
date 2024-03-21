import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import "../../styles/components/FormSelector/PictureUpload.scss";

import CrossIcon from "../../assets/icons/green_plus.svg";

function PictureUpload({ onImageUpload }) {
  const [images, setImages] = useState([]);

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("picture_url", file);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/pictures`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setImages([...images, { id: response.data.id, url: response.data.url }]);
      onImageUpload(response.data.id);
    } catch (error) {
      console.error("Error uploading picture", error);
    }
  };

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      handleImageUpload(selectedImage);
    } else {
      console.error("Veuillez sélectionner une image.");
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/pictures`)
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => console.error("Error loading pictures", error));
  }, []);

  return (
    <section className="input-container">
      <label htmlFor="pictureSelector">
        <img src={CrossIcon} alt="Cross Icon" className="cross-icon" />
      </label>
      <input
        type="file"
        id="pictureSelector"
        accept="image/svg"
        onChange={handleFileChange}
        className="picture-upload-input"
      />
    </section>
  );
}

PictureUpload.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default PictureUpload;
