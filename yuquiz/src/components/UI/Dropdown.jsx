import React, { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledSelect = styled.select`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  appearance: none;
  width: 100%;
`;

const StyledOption = styled.option`
  color: black;
`;

const Dropdown = ({ options, onSelect, initLabel, defaultOption }) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption || null);

  const handleSelect = (event) => {
    const selectedOption = options.find(option => option.label === event.target.value);
    setSelectedOption(selectedOption);
    onSelect(selectedOption);
  };

  return (
    <DropdownContainer>
      <StyledSelect onChange={handleSelect} value={selectedOption ? selectedOption.label : ""}>
        {initLabel && !selectedOption && (
          <StyledOption value="" disabled>{initLabel}</StyledOption>
        )}
        {options.map((option, index) => (
          <StyledOption key={index} value={option.label}>
            {option.label}
          </StyledOption>
        ))}
      </StyledSelect>
    </DropdownContainer>
  );
};

export default Dropdown;
