import React from "react";
import axios from "axios";
import "./App.css";

function App() {
  const downloadPDF = e => {
    e.preventDefault();
    axios("/api/pdf", {
      method: "POST",
      responseType: "blob"
    })
      .then(response => {
        const file = new Blob([response.data], {
          type: "application/pdf"
        });
        const fileURL = URL.createObjectURL(file);

        const downloadLink = document.createElement("a");
        const fileName = "myPDF.pdf";
        downloadLink.href = fileURL;
        downloadLink.setAttribute("download", fileName);
        downloadLink.click();

        // open in a native browser pdf viewer
        // window.open(fileURL);
      })
      .catch(err => console.log(err));
  };

  const viewPDF = e => {
    e.preventDefault();
    axios("/api/pdf", {
      method: "POST",
      responseType: "blob"
    })
      .then(response => {
        const file = new Blob([response.data], {
          type: "application/pdf"
        });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>PDF download demo</h1>
        <div className="button">
          <button onClick={e => downloadPDF(e)}>Download PDF</button>
          <button onClick={e => viewPDF(e)}>View PDF</button>
        </div>
      </header>
    </div>
  );
}

export default App;
