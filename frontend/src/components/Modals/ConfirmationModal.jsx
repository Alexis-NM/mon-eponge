import PropTypes from "prop-types";
import "../../styles/components/Modals/ConfirmationModal.scss";

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    <section className="confirmation-modal">
      <article className="modal-content">
        <h2>Confirmer la déconnexion</h2>
        <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
        <div className="button-container">
          <button onClick={onConfirm} type="button">
            Confirmer
          </button>
          <button onClick={onClose} type="button">
            Annuler
          </button>
        </div>
      </article>
    </section>
  );
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationModal;
