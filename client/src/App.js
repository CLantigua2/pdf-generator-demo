import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    axios("/api/pdf", { method: "POST", responseType: "blob" })
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const downloadPDF = e => {
    e.preventDefault();
    const file = new Blob([data], {
      type: "application/pdf"
    });
    const fileURL = URL.createObjectURL(file);
    const downloadLink = document.createElement("a");
    const fileName = "myPDF.pdf";
    downloadLink.href = fileURL;
    downloadLink.setAttribute("download", fileName);
    downloadLink.click();
  };

  const viewPDF = e => {
    e.preventDefault();
    const file = new Blob([data], {
      type: "application/pdf"
    });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
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
