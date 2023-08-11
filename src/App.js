import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import FormBuilder from "./FormBuilder/FormBuilder";
import FormDownload from "./FormDownload/FormDownload";
import store from "./Components/store";
import FormRenderer from "./FormRenderer/FormRenderer";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import axios from "axios";
import { Provider } from "react-redux";
function App() {

  const showAlert =() =>{
    alert("Please Refresh Page")
  }

  const handleClick = () => {
    axios
      .get("http://localhost:8080/api/v1/questions/forms/1")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // Log the error response
        console.error("Error:", error);
      });
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <header className="App-header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container">
                <Link className="navbar-brand" to="/" onClick={showAlert}>
                  Create Form
                </Link>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/download" onClick={showAlert}>
                      Download CSV
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <Switch>
              <Route path="/" exact component={FormBuilder} />
              <Route path="/form/:formId" component={FormRenderer} />
              <Route path="/download" component={FormDownload} />
            </Switch>
          </header>
        </Router>
      </div>
    </Provider>
  );

}

export default App;
