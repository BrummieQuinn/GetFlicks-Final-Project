// modal pop up on purchase confirmation
export default function Modal({ item, onConfirm, onCancel }) {
    return (
      <div className="modal-container">
        <div className="modal">
          <h3 className="modal-title">Confirm Purchase</h3>
          {item ? (
            <p className="modal-message">Are you sure you want to purchase {item.title}?</p>
          ) : (
            <p className="modal-message">Item not available for purchase.</p>
          )}
          <div className="modal-buttons">
            <button type="submit" className="modal-button" onClick={onCancel}>
              Cancel
            </button>
            {item && (
              <button type="button" className="modal-button" onClick={onConfirm}>
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  