import "./App.css";
import { useState, useRef } from "react";
function App() {
  const [fileContent, setFileContent] = useState("");
  const [error, setError] = useState("");
  const [wordCount, setWordCount] = useState({});
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.name.toLowerCase().endsWith(".txt")) {
        setError(" Please select a valclassName .txt file.");
        resetFileInput();

        console.log("invalid file extention");

        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target.result;
        if (content.trim() === "") {
          console.log("empty file case");

          setError("File is empty");
          resetFileInput();
          return;
        }
        setFileContent(content);

        const words = content.toLowerCase().split(" ");
        const count = {};

        if (words) {
          words.forEach((word) => {
            count[word] = (count[word] || 0) + 1;
          });
        }

        setWordCount(count);
      };

      reader.onerror = function () {
        console.log("case of any error happen");

        setError("Error reading file");
        resetFileInput();
      };

      reader.readAsText(file);
    }
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="fileContainer">
      <h1>File Loader</h1>
      <div className="buttonContainer">
        <div>
          <input
            id="fileInput"
            type="file"
            className="fileInputStyle"
            accept=".txt"
            ref={fileInputRef}
            onChange={handleFile}
          />
          <label htmlFor="fileInput" className="fileInputLabel">
            Choose a .txt file
          </label>
        </div>
        <span
          className="clearButton"
          onClick={() => {
            setFileContent("");
            setError("");
            setWordCount({});
            resetFileInput();
          }}
        >
          Clear
        </span>
      </div>
      <div className="content">{fileContent}</div>
      <div className="errorMessage">{error}</div>
      {Object.entries(wordCount)?.length > 0 && (
        <table className="wordTable">
          <thead>
            <tr>
              <th>Word</th>
              <th>Frequency</th>
            </tr>
          </thead>
          <tbody className="wordTableBody">
            {Object.entries(wordCount).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
