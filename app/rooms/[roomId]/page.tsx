'use client';
import { useParams } from "next/navigation";
import { socket } from '../../../socket.js';
import FileInput from "@/app/components/FileInput.js";

export default function RoomPage() {
  const params = useParams<{ roomId: string }>();

  socket.on("connection", (socket) => {
    socket.join(`${params.roomId}`)
  })

return (
  <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
    <div className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white">

      <div className="border-b border-zinc-200 dark:border-zinc-800 px-8 py-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Room: <span className="text-emerald-500">{params.roomId}</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Upload files to share in this room
        </p>
      </div>

      <div className="px-8 py-6">
        <FileInput />
      </div>

    </div>
  </div>
);

}
