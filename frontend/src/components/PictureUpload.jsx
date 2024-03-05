import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

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
    <div>
      <label htmlFor="pictureSelector">Choisir une image:</label>
      <input
        type="file"
        id="pictureSelector"
        accept="image/*" // Vous pouvez spécifier les types de fichiers acceptés ici
        onChange={handleFileChange}
      />
    </div>
  );
}

PictureUpload.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default PictureUpload;
