// Redux store.js
import { createStore } from "redux";

const initialState = {
  questionCount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_QUESTION_COUNT":
      return {
        ...state,
        questionCount: state.questionCount + 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
