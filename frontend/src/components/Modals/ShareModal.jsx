import PropTypes from "prop-types";
import "../../styles/components/Modals/TipModal.scss";

function UpdateModal({ isOpen }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="tip-modal">
      <div className="tip-content">
        <h2>Félicitations !</h2>
        <p>L'astuce a bien été publiée !</p>
      </div>
    </div>
  );
}

UpdateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default UpdateModal;
