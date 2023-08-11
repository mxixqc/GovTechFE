import React, { useEffect, useState } from "react";
import axios from "axios";

function FormRenderer({ match }) {
  const [formData, setFormData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [submissionSuccess, setSubmissionSuccess] = useState(true);

  const handleRadioSelect = (selectedValue, responseIndex) => {
    const updatedResponses = [...responses];
    updatedResponses[responseIndex] = {
      ...updatedResponses[responseIndex],
      questionID: formData[currentQuestionIndex].questionID,
      responseValue: selectedValue,
    };
    setResponses(updatedResponses);
  };

  const makeSubmission = (changedResponses) => {
    axios
      .post(`http://localhost:8080/api/v1/response/submit-response`, {
        formID: match.params.formId,
        responses: changedResponses,
      })
      .then((response) => {
        // Handle successful response
        console.log("Form submission successful:", response.data);
        setSubmissionSuccess(true);
      })
      .catch((error) => {
        // Handle error
        console.error("Error submitting form:", error);
        setSubmissionSuccess(false);
      });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/v1/questions/forms/${match.params.formId}`
      )
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
      });
  }, [match.params.formId]);

  const handleNextQuestion = () => {
    const prevIndex = currentQuestionIndex;
    if (currentQuestionIndex < formData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const radioInputs = document.getElementsByName("flexRadioDefault");
      radioInputs.forEach((input) => (input.checked = false));
      if (
        formData[prevIndex].conditionType === "Skip" &&
        formData[prevIndex].conditionValue ===
          responses[prevIndex].responseValue
      ) {
        setCurrentQuestionIndex(formData[prevIndex].conditionOperator - 1);
        // From this question until the next question, fill in the response with dummy data, where the questionID is still valid, but the responseValue is null
        const updatedResponses = [...responses];
        for (
          let i = prevIndex + 1;
          i < formData[prevIndex].conditionOperator;
          i++
        ) {
          updatedResponses[i] = {
            ...updatedResponses[i],
            questionID: formData[i].questionID,
            responseValue: null,
          };
        }
        setResponses(updatedResponses);
      }
      console.log(responses);
      if (currentQuestionIndex === formData.length - 1) {
        console.log({
          formID: match.params.formId,
          responses: responses,
        });
        makeSubmission(responses);
      }
    }
  };

  return (
    <div>
      
      {currentQuestionIndex < formData.length && (
        <div>
          <p>Question: {formData[currentQuestionIndex].questionText}</p>
          {formData[currentQuestionIndex].questionType === "RADIO" && (
            <div>
              {formData[currentQuestionIndex].questionOptions
                .split(",")
                .map((option) => (
                  <div class="form-check" key={option}>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id={`flexRadioDefault-${option}`}
                      onClick={() =>
                        handleRadioSelect(option, currentQuestionIndex)
                      }
                    />
                    <label
                      class="form-check-label"
                      htmlFor={`flexRadioDefault-${option}`}
                    >
                      {option}
                    </label>
                  </div>
                ))}
            </div>
          )}
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      )}
      {currentQuestionIndex === formData.length && (
        <div>
          {submissionSuccess ? (
            <p>Form Submitted Successfully</p>
          ) : (
            <p>Form Submission Failed</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FormRenderer;
