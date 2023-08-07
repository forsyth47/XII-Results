import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('https://site-files-api.forsyth47.repl.co/api/files')
      .then((response) => response.json())
      .then((data) => setFiles(data.files))
      .catch((error) => console.error('Error fetching files:', error));
  }, []);

  return (
    <div class="background-container">
      <div class="container">
        <h1>Site Directory</h1>
        <ul class="file-list" id="fileList">
          {files.map((file, index) => (
            <li key={index}>
              <a href={`https://site-files-api.forsyth47.repl.co/file/${file}`}>
                <i className="mdi mdi-file"></i>
                {file}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default App;
