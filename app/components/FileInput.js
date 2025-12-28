'use client';
import { useState } from "react";

export default function FileInput() {
  const [previewImages, setPreviewImages] = useState([]);

  function fileChange(e) {
    let submittedFiles = e.target.files;
    const fileText = document.getElementById('fileText');
    if (!submittedFiles) return;
    if (!fileText) return;

    if (fileText.textContent == 'Click to import files') fileText.textContent = '';

    for (let step = 0; step < submittedFiles.length; step++) {
      const file = submittedFiles[step]                       
      fileText.textContent += `${file.name}, `;               

      if (file.type.startsWith("image/")) { //if file is image: create a preview
        const url = URL.createObjectURL(file);
        //create image element and insert with url as src parameter
        setPreviewImages(prev => [...prev, url]);
        // URL.revokeObjectURL(url);
      }
    }
  }

  function submitFiles() {
    console.log("Submitted files")
  }

  return (
    <div>
          <label id="fileText" className="text-xl" htmlFor="dragdrop">
            Click to import files
          </label>

          <input multiple type="file" id="dragdrop" onChange={fileChange} className="hidden"></input>

          <div id="previewContainer" 
            className={`${previewImages.length > 0 ? 'flex' : 'hidden'} 
            rounded-b-2xl shrink flex-wrap overflow-hidden gap-2 py-4 px-2 bg-blue-100 min-w-full text-3xl font-medium text-blue-100`}
          >
            {previewImages.map((item, i) => {return (<img className="max-w-40 max-h-40 border-2" src={item} key={i}></img>)})}
          </div>

          <div className="flex flex-col">
            <button id="submitButton" 
            className="border-4 border-green-200 py-5 px-10 my-3 bg-green-400 font-semibold text-3xl"
            onClick={submitFiles}>Submit files</button>
          </div>
    </div>    
  );
}
