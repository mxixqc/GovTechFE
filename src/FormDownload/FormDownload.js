import React, { useState, useEffect } from "react";
import axios from "axios";

function FormDownload() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    // Fetch forms from the API
    axios
      .get("http://localhost:8080/api/v1/forms/getAllForms")
      .then((response) => {
        setForms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching forms:", error);
      });
  }, []);

  const handleDownload = (formId) => {
    // Trigger download for the specific form
    window.location.href = `http://localhost:8080/api/v1/forms/download-csv/${formId}`;
  };

  return (
    <div>
      <h1>Form List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Form Title</th>
            <th>Form ID</th>
            <th>Download CSV</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.formId}>
              <td>{form.formTitle}</td>
              <td>{form.formId}</td>
              <td>
                <button onClick={() => handleDownload(form.formId)}>
                  Download CSV
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormDownload;
