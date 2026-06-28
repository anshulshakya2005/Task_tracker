import { MdDeleteOutline } from "react-icons/md";

function Deletemodal({ show, onClose, onConfirm, taskName }) {
  if (!show) return null;

  const backdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(6px)",
    zIndex: 1040
  };

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "420px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    color: "white",
    zIndex: 1050,
    boxShadow: "0 10px 40px rgba(0,0,0,0.6)"
  };

  const headerStyle = {
    padding: "12px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "rgba(239,68,68,0.15)"
  };

  const bodyStyle = {
    padding: "16px"
  };

  const footerStyle = {
    padding: "12px 16px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    borderTop: "1px solid rgba(255,255,255,0.1)"
  };

  const btn = (color) => ({
    background: color,
    border: "none",
    color: "white",
    padding: "6px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.2s"
  });

  return (
    <>
      {/* Backdrop */}
      <div style={backdropStyle} onClick={onClose}></div>

      {/* Modal */}
      <div style={modalStyle}>

        {/* Header */}
        <div style={headerStyle}>
          <h5 style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <MdDeleteOutline />
            Delete Task
          </h5>

          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={bodyStyle}>
          <p style={{ marginBottom: "8px", opacity: 0.8 }}>
            Are you sure you want to delete:
          </p>
          <strong>{taskName}</strong>
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          <button style={btn("rgba(255,255,255,0.2)")} onClick={onClose}>
            Cancel
          </button>

          <button style={btn("#ef4444")} onClick={onConfirm}>
            Delete
          </button>
        </div>

      </div>
    </>
  );
}

export default Deletemodal;