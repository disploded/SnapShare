'use client';
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { socket } from "../socket.js";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected to server`)
    })
  });

  function createRoom() {
    //  add code generation & password (optional)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    const charactersLength = characters.length;
    let roomCode = '';
    for (let i = 0; i < 6; i++) {
      roomCode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    router.push(`/rooms/${roomCode}`); // redirects to room

  }

  function joinRoom() {
    console.log("Joined room")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 font-sans dark:bg-black">
      <main className="flex rounded-2xl w-full max-w-6xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
            <div className="border-cyan-800 flex flex-col justify-center items-center font-bold text-3xl border-4 rounded-2xl min-h-82 min-w-1/2 bg-gray-200">
              <h1 className="pb-4 text-4xl">Snapshare</h1>
              <button id="submitButton" 
              className="border-4 border-green-200 py-5 px-10 my-3 bg-green-400 font-semibold text-2xl"
              onClick={createRoom}>Create room</button>
    
              <button id="joinButton"
              className="border-4 border-blue-200 py-5 px-10 bg-blue-400 font-semibold text-2xl"
              onClick={joinRoom}>Join a room</button>
            </div>
          <div className="flex flex-col">
          </div>
      </main>
    </div>
  );
}
