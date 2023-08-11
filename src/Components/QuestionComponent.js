import DropDownComponent from "./DropDownComponent";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import ResponseType from "./ResponseType";
import ValidationComponent from "./ValidationComponent";

const QuestionComponent = forwardRef(({ Qnum }, ref) => {
  useImperativeHandle(ref, () => ({
    getQuestionState: () => ({
      questionText,
      questionType,
      questionOptions,
      questionRequired,
      conditionType,
      conditionOperator,
      conditionValue,
    }),
  }));

  const [isComponentVisible, setComponentVisibility] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("radio");
  const [questionOptions, setQuestionOptions] = useState(["Option 1"]);
  const [questionRequired, setQuestionRequired] = useState(false);
  const [conditionType, setConditionType] = useState(null);
  const [conditionOperator, setConditionOperator] = useState(null);
  const [conditionValue, setConditionValue] = useState(null);

  const handleToggleComponent = () => {
    setComponentVisibility(!isComponentVisible);
    if (!isComponentVisible){
      setConditionType("Skip");
      setConditionOperator("1");
      setConditionValue("Option 1");
    } else {
      setConditionType(null);
      setConditionOperator(null);
      setConditionValue(null);
    }
  };

  const handleOptionSelect = (option) => {
    setQuestionType(option);
  };

  return (
    <div class="card text-start">
      <p class="ps-2">Question: {Qnum}</p>
      <div class="card-body">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Question Text"
            aria-label="Question Text"
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <DropDownComponent
            onSelectOption={handleOptionSelect}
            options={["radio", "paragraph", "text", "checkbox"]}
          />
        </div>
        <ResponseType
          questionType={questionType}
          options={questionOptions}
          setOptions={setQuestionOptions}
        />

        <input
          type="button"
          className="btn-primary"
          onClick={toString}
          value="ToString"
        />
      </div>
      <div class="card-body text-start">
        <div class="form-check form-switch">
          <label class="form-check-label">Required</label>
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onChange={(e) => setQuestionRequired(e.target.checked)}
          />
        </div>
      </div>
      <div class="card-body text-start">
        <button type="button" className="btn btn-primary" onClick={handleToggleComponent}>
          {isComponentVisible ? "Disable Validation" : "Enable Validation"}
        </button>
        {isComponentVisible && (
          <ValidationComponent
            answerOptions={questionOptions}
            conditionType={conditionType}
            setConditionType={setConditionType}
            conditionOperator={conditionOperator}
            setConditionOperator={setConditionOperator}
            conditionValue={conditionValue}
            setConditionValue={setConditionValue}
          />
        )}
      </div>
    </div>
  );
});

export default QuestionComponent;
