import { Dropdown } from "semantic-ui-react";
import { Container } from "semantic-ui-react";

const DropDownChips = ({
  optionList = [],
  selectedOptions = [],
  onOptionsChanged,
  placeholder,
}) => {
  const handleOnChange = (e) => {
    if (onOptionsChanged) onOptionsChanged(e.target.textContent);
  };

  return (
    <Container>
      <Dropdown
        placeholder={placeholder}
        fluid
        multiple
        search
        defaultValue={selectedOptions}
        selection
        onChange={handleOnChange}
        options={optionList}
      />
    </Container>
  );
};

export default DropDownChips;
