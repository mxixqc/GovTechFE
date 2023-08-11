import React, { useState } from "react";

function ResponseType({ questionType, options, setOptions }) {
  
  const addOption = () =>{
    setOptions(options => [...options, "Option " + (options.length + 1)]);
  }

  const debug = () =>{
    console.log(options);
  }

  const updateCurrentOption = (anOption, optionIdx, theList, setTheList) => {
    const updatedList = [...theList]; // Create a copy of the list
    updatedList[optionIdx] = anOption; // Update the specified index with the new option
    setTheList(updatedList); // Update the state with the updated list
  };

  if (questionType == "radio" || questionType == "checkbox") {
    return (
      <div>
          {options.map((option, index)=>(
            <div class="input-group">
            <div class="input-group-text">
              <input
                class="form-check-input primary mt-0"
                type={questionType == "radio" ? "radio" : "checkbox"}
                value=""
                aria-label="Radio button for following text input"
                disabled
              />
            </div>
            <input
              type="text"
              class="form-control"
              aria-label="Text input with radio button"
              placeholder={"Option " + (index + 1)}
              onChange={(e) => updateCurrentOption(e.target.value, index, options, setOptions)}
            />
            </div>
          ))}
          <input type="button" className="btn-primary" onClick={addOption} value = "Add Option"/>
          <input type="button" className="btn-primary" onClick={debug} value = "Debug"/>

        </div>
    );
  } else if (questionType == "paragraph") {
    return "Paragraph Selected";
  } else if (questionType == "checkbox") {
    return "Checkbox Selected";
  } else if (questionType == "text") {
    return "Text Selected";
  }
}

export default ResponseType;
