const Tags = ({ label, doSubmit, notForSubmit, className, error, isDisabled, btnStyle, id }) => (
    <a className={className} style={btnStyle} onClick={!notForSubmit ? doSubmit : undefined} disabled={isDisabled}>
      {label}
    </a>
);

export default Tags;