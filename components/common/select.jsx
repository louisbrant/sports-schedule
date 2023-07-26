import { useEffect, useState } from "react";
import SelectOptions from "react-select";

const Select = ({
  optionList = [],
  selectedOptions = [],
  onOptionsChanged,
  placeholder,
  error,
  multi = false,
  className,
  isDetails,
  isAddCourt,
}) => {

  const handleOnChange = (value) => {
    if (!value) return;
    if (onOptionsChanged) onOptionsChanged(value);
  };

  return (
    <>
      <SelectOptions
        id='selectOptionsList'
        instanceId='selectOptionsList'
        inputId='selectOptionsList'
        className={`${!isAddCourt && 'form-control'} ${className}`}
        menuPortalTarget={ typeof window !== 'undefined' && document.body} 
        styles={{
          control: (provided, state) => ({
            ...provided,
            boxShadow: "none",
            border: "none",
            backgroundColor: isDetails===true && "transparent",
            marginLeft: isDetails && 40,
            marginTop: isDetails && 8,
            //padding: isDetails && 16,
          }),
          menuPortal: base => ({ ...base, zIndex: 999999 }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused && "#98b5ff0f",
            color: state.isFocused && "#2F4858",
            zIndex: 99999
         }),
         dropdownIndicator: base => ({
          ...base,
          color: 'rgba(36, 51, 88, 0.78)',
         
        })
        }}
        closeMenuOnSelect={true}
        isMulti={multi}
        placeholder={placeholder}
        options={optionList}
        onChange={handleOnChange}
        value={selectedOptions}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </>
  );
};

export default Select;
