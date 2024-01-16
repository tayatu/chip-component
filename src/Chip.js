import React, { useState } from "react";
import "./Chip.css";

const Chip = ({ items }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && inputValue === "") {
      handleBackspace();
    }
  };

  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setInputValue("");
    setShowDropdown(false);
  };

  const handleRemove = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  const handleBackspace = () => {
    if (selectedItems.length > 0) {
        const updatedItems = [...selectedItems];
        const lastSelectedItemIndex = updatedItems.length - 1;

        if(highlightedIndex !== -1){
            updatedItems.pop();
            setHighlightedIndex(-1);
        }
        else{
            setHighlightedIndex(lastSelectedItemIndex);
        }

        setSelectedItems(updatedItems);
    }
  };

  const displayAvatarAndEmail = (item) => (
    <div className="avatar-email">
      <div className="avatar-placeholder">{item.name.charAt(0)}</div>
      <div>
        <span className="name">{item.name}</span>
        <span className="email">{item.email}</span>
      </div>
    </div>
  );

  const filteredItems = items.filter(
    (item) =>
      !selectedItems.includes(item) &&
      item.name.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  return (
    <div className="chip-container">
      <div className="chips">
      {selectedItems.map((item, index) => (
        <div
            key={index}
            className={`chip ${highlightedIndex === index ? "highlighted" : ""}`}
        >
            {displayAvatarAndEmail(item)}
            <span className="remove-icon" onClick={() => handleRemove(index)}>
            X
            </span>
        </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Add New User"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onClick={() => setShowDropdown(true)} 
      />
      {showDropdown && (
        <ul className="item-list">
          {filteredItems.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              {displayAvatarAndEmail(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Chip;
