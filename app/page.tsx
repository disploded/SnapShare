'use client';
import './globals.css';
import React, { useEffect, useState } from "react";
import { socket } from "../socket.js";

export default function Home() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected to server`)
    })
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function fileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fileText = document.getElementById('fileText');
    if (!e.target.files) return;
    if (!fileText) return;

    if (fileText.textContent == 'Import files') fileText.textContent = '';

    for (let step = 0; step < e.target.files.length; step++) {
      const file = e.target.files[step]                       
      fileText.textContent += `${file.name}, `;               

      if (file.type.startsWith("image/")) { //if file is image: create a preview
        console.log("recieved")

        const url = URL.createObjectURL(file);
        //create image element and insert with url as src parameter
        setPreviewImages(prev => [...prev, url]);
        // URL.revokeObjectURL(url);
      }
    }
  }

  function submitFiles() {
    //get file data and put into a room. use code generation & password (optional)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    const charactersLength = characters.length;
    let roomCode = '';
    for (let i = 0; i < 6; i++) {
      roomCode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(roomCode);
  }

  function joinButton() {
    console.log("joining");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-6xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
          <div className="border-cyan-800 flex flex-col justify-between items-center font-bold text-3xl border-4 rounded-2xl min-h-82 min-w-1/2 bg-gray-200">
          <label id="fileText" className="" htmlFor="dragdrop">
          Import files
          </label>
          <input multiple type="file" id="dragdrop" onChange={fileChange} className="hidden"></input>
            <div id="previewContainer" 
              className="flex shrink flex-wrap overflow-hidden gap-6 py-4 px-2 bg-cyan-800 min-w-full text-3xl font-medium text-blue-100"
            >
            <h1>Preview:</h1>
            {previewImages.map((item, i) => {return (<img className="max-w-40 max-h-40 border-2" src={item} key={i}></img>)})}

            </div>
          </div>
          <div className="flex flex-col">

            <button id="submitButton" 
            className="border-4 border-green-200 py-5 px-10 my-3 bg-green-400 font-semibold text-2xl"
            onClick={submitFiles}>Submit files</button>

            <h1 className="font-medium text-2xl">or if you have a code</h1>

            <button id="joinButton"
            className="border-4 border-blue-200 py-5 px-10 bg-blue-400 font-semibold text-2xl"
            onClick={joinButton}>Join server</button>

          </div>
      </main>
    </div>
  );
}
