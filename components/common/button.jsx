const Button = ({ label, onClick, primary = true }) => {
  if (primary) {
    return (
      <button
        className="btn-style border-radius border-less text-white primary-btn primary_bg"
        onClick={onClick}
      >
        {label}
      </button>
    );
  } else {
    return (
      <button
        className="ml-3 btn-style border-radius border border-secondary secondary-btn"
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
};

export default Button;
