'use client';
import { useParams } from "next/navigation";
import { socket } from '../../../socket.js';

export default function RoomPage() {
  const params = useParams<{ roomId: string }>();

  socket.on("connection", (socket) => {
    socket.join(`${params.roomId}`)
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="font-bold">RoomID: {params.roomId}</h1>
    </div>
  );
}
