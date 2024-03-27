import React, { useState } from "react";
import "./Accordion.css";

interface Option {
  name: string;
  price: number;
}

interface Section {
  title: string;
  options: Option[];
  multipleChoice: boolean;
}

interface AccordionProps {
  sections: Section[];
  pizzaQuantity: number;
  pizzaPrice: number;
  validateOptions: (isValid: boolean) => void;
}

const Accordion: React.FC<AccordionProps> = ({
  sections,
  pizzaPrice,
  pizzaQuantity,
}) => {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array(sections.length).fill("")
  );

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[activeSection] = option;
      return newSelectedOptions;
    });
  };

  const handleNextSection = () => {
    const currentSection = sections[activeSection];
    if (
      selectedOptions[activeSection] === "" &&
      !currentSection.multipleChoice
    ) {
      alert("Please select your choice from above options before proceeding.");
      return;
    }
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
    }
  };

  const handlePrevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  const additionalPrice = selectedOptions.reduce((totalPrice, option, index) => {
    const selectedSection = sections[index];
    const selectedOption = selectedSection.options.find(
      (opt) => opt.name === option
    );
    return totalPrice + (selectedOption ? selectedOption.price : 0);
  }, 0);

  const finalPrice =
    (selectedOptions.length === 0 ? pizzaQuantity * pizzaPrice : 0) + additionalPrice;

  return (
    <div className="accordion">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`accordion-section ${
            index === activeSection ? "active" : ""
          }`}
        >
          <h3 onClick={() => setActiveSection(index)}>{section.title}</h3>
          {index === activeSection && (
            <div className="options">
              <ul>
                {section.options.map((option, i) => (
                  <li key={i}>
                    {section.multipleChoice ? (
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            selectedOptions[activeSection] === option.name
                          }
                          onChange={() => handleOptionChange(option.name)}
                        />
                        {option.name} (+${option.price.toFixed(2)})
                      </label>
                    ) : (
                      <label>
                        <input
                          type="radio"
                          name={`section-${index}`}
                          value={option.name}
                          checked={
                            selectedOptions[activeSection] === option.name
                          }
                          onChange={() => handleOptionChange(option.name)}
                        />
                        {option.name} (+${option.price.toFixed(2)})
                      </label>
                    )}
                  </li>
                ))}
              </ul>
              <div className="nav-buttons">
                <button
                  onClick={handlePrevSection}
                  disabled={activeSection === 0}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextSection}
                  disabled={activeSection === sections.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="order-summary">
        <h3>Your Order Summary</h3>
        <p>Selected Options: {selectedOptions.join(", ")}</p>
        <p>Additional Price is: ${additionalPrice.toFixed(2)}</p>
        <h1>Final Price to Pay: ${finalPrice.toFixed(2)}</h1>
      </div>
    </div>
  );
};

export default Accordion;
