import PropTypes from "prop-types";
import "../../styles/components/Modals/UpdateModal.scss";

function UpdateModal({ isOpen }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="update-modal">
      <div className="tip-content">
        <h2>Félicitations !</h2>
        <p>Le contenu de l'astuce à bien été mis à jour !</p>
      </div>
    </div>
  );
}

UpdateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default UpdateModal;
