'use client';
import { useParams } from "next/navigation";
import FileInput from "@/app/components/FileInput.js";
import { useEffect, useState, useRef } from "react";
import { socket } from '../../../socket.js';

export default function RoomPage() {
  const params = useParams<{ roomId: string }>();
  const [roomCount, setRoomCount] = useState(0);
  const [status, setStatus] = useState("loading");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const hasJoined = useRef(false); //prevent double prompts

  useEffect(() => {
    if (!params.roomId || hasJoined.current) return; // don't emit if id isn't ready
    hasJoined.current = true; // hasJoined = true if user connects to room

    socket.removeAllListeners("roomUpdate"); //clear ghost events

    socket.on("roomUpdate", (newRoomCount) => {
      setRoomCount(newRoomCount);
    });

    const startJoinProcess = () => {
      socket.emit("checkRoom", params.roomId, (exists: boolean) => {
        if (exists) {
          setStatus("valid")
          const password = prompt("Enter room password.")

          if (password) {socket.emit("joinRoom", params.roomId, password, (response: any) => {
            if (response.status === "success") {
              setIsAuthorized(true);
              console.log("Start webRTC")
            } else {
              alert(response.message);
              hasJoined.current = false;
            }
          });}
        } else {
          setStatus("invalid");
        }
      })
    }

    // ensure socket is connected before emitting events...
    if (socket.connected) {
      startJoinProcess();
    } else {
      socket.once("connect", startJoinProcess);
    }

    return () => {
      socket.off("roomUpdate");
    };
  }, [params.roomId]);

if (status === "loading") return <div className="p-20 text-center">Checking room code...</div>;

if (status === "invalid") return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-100">
      <h1 className="text-2xl font-bold text-red-500">Room Not Found</h1>
      <p className="text-zinc-500">This room doesn't exist or has been closed.</p>
      <button onClick={() => window.location.href = '/'} className="mt-4 text-emerald-500 underline">
        Go Back Home
      </button>
    </div>
  );

if (!isAuthorized) return <div className="p-20 text-center">Waiting for authorization...</div>

return (
  <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
    <div className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white">

      <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 px-8 py-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Room: <span className="text-emerald-500">{params.roomId}</span>
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Upload files to share in this room
          </p>
        </div>
        <p className="text-2xl font-bold">In Room: {roomCount}</p>
      </div>

      <div className="px-8 py-6">
        <FileInput />
      </div>

    </div>
  </div>
);

}
