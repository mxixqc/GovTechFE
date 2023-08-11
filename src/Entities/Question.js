
export class Question {
  constructor(questionText, questionType, isQuestionRequired, options = []) {
    this.questionText = questionText;
    this.questionType = questionType;
    this.options = options;
    this.isQuestionRequired = isQuestionRequired;
  }

  // Getter for questionText
  get questionText() {
    return this._questionText;
  }

  // Setter for questionText
  set questionText(newText) {
    this._questionText = newText;
  }

  get questionType() {
    return this._questionType;
  }

  set questionType(newType) {
    this._questionType = newType;
  }


  // Getter for options
  get options() {
    return this._options;
  }

  // Setter for options
  set options(newOptions) {
    this._options = newOptions;
  }

  // Getter for isQuestionRequired
  get isQuestionRequired() {
    return this._isQuestionRequired;
  }

  // Setter for isQuestionRequired
  set isQuestionRequired(newValue) {
    this._isQuestionRequired = newValue;
  }

  update(e){
    this.questionType = e.target.value;
    this.forceUpdate();
  }

  render() {
    console.log("Rendering")
    return (
      <div class="card">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            Question Title:
          </span>
          <input type="text" class="form-control" value={this.questionText} />
          <select
            className="btn btn-secondary dropdown-toggle"
            onChange={(e) => this.update(e)}
            >
            <option value="radio" >Radio</option>
            <option value="paragraph">Paragraph</option>
            <option value="checkbox">Checkbox</option>
            <option value="text">Text</option>
          </select>
        </div>

        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">
            {this.questionType}
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    );
  }

  toString() {
    return `
    questionText: ${this.questionText}
    questionType: ${this.questionType}
    options: ${this.options.join(", ")}
    isQuestionRequired: ${this.isQuestionRequired}
  `;
  }
}

export class RadioQuestion extends Question {
  constructor(questionText, options, isQuestionRequired) {
    super(questionText, "radio", isQuestionRequired, options);
  }
}

export class TextQuestion extends Question {
  constructor(questionText, isQuestionRequired) {
    super(questionText, "text", isQuestionRequired);
  }
}

export class CheckboxQuestion extends Question {
  constructor(questionText, options, isQuestionRequired) {
    super(questionText, "checkbox", isQuestionRequired, options);
  }
}
