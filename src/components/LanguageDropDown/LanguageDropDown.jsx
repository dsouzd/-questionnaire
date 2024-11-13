import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import icons for '+' and '-'
import "../../assets/LanguageDropdown.css";
import { useTranslation } from "react-i18next";

const LanguageDropdown = () => {
  const [language, setLanguage] = useState("English");
  const [showDropdown, setShowDropdown] = useState(false);
  const { i18n } = useTranslation();

  const handleSelect = (lang) => {
    setLanguage(lang);
    console.log(`Language selected: ${lang}`);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language-dropdown-container">
      {showDropdown && (
        <Dropdown onSelect={handleSelect} className="dropdown">
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            className="dropdown-toggle"
          >
            {language}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              eventKey="English"
              onClick={() => handleLanguageChange("en")}
            >
              English
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="Deutsche"
              onClick={() => handleLanguageChange("de")}
            >
              Deutsche
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}

      <button className="toggle-button" onClick={toggleDropdown}>
        {showDropdown ? <FaMinus /> : <FaPlus />}
      </button>
    </div>
  );
};

export default LanguageDropdown;
