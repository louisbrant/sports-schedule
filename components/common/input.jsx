const Input = ({ name, label, error, divClass, isAddCourt, addCourtInput, searchByName, ...rest }) => {
  return (
    <div className={`form-group w-100 ${divClass}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input {...rest} id={name} name={name} 
        //value={value}
        style={{...addCourtInput, ...searchByName}}
        //onChange={handleChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
