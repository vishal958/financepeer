import React, { useState } from "react";

export default function Upload({ children }) {
  const [files, setFiles] = useState("");

  const handleChange = (e) => {
    const fileReader = new FileReader();
    const updatedJSON = e.target.files[0];
    console.log('hhh',updatedJSON.type);
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log(JSON.parse(e.target.result));
      const data = { data: JSON.parse(e.target.result) };
      fetch(`/api/file-upload`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((error) => {
        console.error("Error:", error);
      });
      setFiles(e.target.result);
    };
  };
  return (
    <>
      <h1>Upload Json file - Example</h1>

      <input type="file" onChange={handleChange} />
      <br />
      {"uploaded file content -- " + files}
    </>
  );
}
