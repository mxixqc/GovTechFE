import React, { useState, useRef } from "react";
import QuestionComponent from "../Components/QuestionComponent";
import axios from "axios";
import { useDispatch } from "react-redux";

function FormBuilder() {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const questionRefs = useRef([]);
  const [formName, setFormName] = useState("");

  const handleAddQuestion = () => {
    dispatch({ type: "INCREMENT_QUESTION_COUNT" });
    const newQuestionRef = React.createRef();
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      <QuestionComponent
        key={prevQuestions.length}
        Qnum={prevQuestions.length + 1}
        ref={newQuestionRef}
      />,
    ]);

    questionRefs.current.push(newQuestionRef);
  };

  const handleSubmission = () => {
    const request = [];
    questionRefs.current.forEach((questionRef, index) => {
      const questionState = questionRef.current.getQuestionState();
      request.push(questionState);
    });
    console.log(request);
    axios
      .post("http://localhost:8080/api/v1/forms/createForm", {
        formName: formName,
        questionList: request,
      })
      .then((response) => {
        // Handle successful response
        console.log("Form submission successful:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div>
      Create Form Here
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          Form Name:
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Untitled Form"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e)=>setFormName(e.target.value)}
        />
      </div>
      <div>{questions.map((q, index) => q)}</div>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleAddQuestion}
      >
        Add Question
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleSubmission}
      >
        Submit Form
      </button>
    </div>
  );
}

export default FormBuilder;
