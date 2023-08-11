import React, { useState } from "react";

function DropDownComponent({ onSelectOption, options }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (selectedValue) => {
    console.log(selectedValue)
    setSelectedOption(selectedValue); // Update the local state
    onSelectOption(selectedValue); // Notify the parent component
  };

  return (
      <select class="btn btn-secondary dropdown-toggle" value={selectedOption} onChange={e => handleOptionSelect(e.target.value)}>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
  );
}

export default DropDownComponent;
