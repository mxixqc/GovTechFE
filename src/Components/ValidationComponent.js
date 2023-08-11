import DropDownComponent from "./DropDownComponent";
import { useSelector } from "react-redux";

function ValidationComponent({
    answerOptions,
    conditionType,
    setConditionType,
    conditionOperator,
    setConditionOperator,
    conditionValue,
    setConditionValue,
  }) {
    const questionCount = useSelector((state) => state.questionCount);
    
    return(
        <div>
            <DropDownComponent options={["Skip","test"]} onSelectOption={setConditionType}/>
            to 
            <DropDownComponent options={Array.from({ length: questionCount }, (_, index) => index + 1)} onSelectOption={setConditionOperator}/>
            if answer = 
            <DropDownComponent options={answerOptions} onSelectOption={setConditionValue}/>
        </div>
    )
}

export default ValidationComponent;