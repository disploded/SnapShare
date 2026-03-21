import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const activeRooms = new Set();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`User ${socket.id} has connected`)

    socket.on("createRoom", (roomId) => {
      activeRooms.add(roomId);
    })

    socket.on("checkRoom", (roomCodeInput, callback) => {
      const exists = activeRooms.has(roomCodeInput);
      callback(exists);
    })

    socket.on("joinRoom", (roomId) => {
      if (!roomId) return;
      console.log(`Joined ${roomId}`)
      socket.join(roomId);

      // get value of how many people are currently in socket room & emit value
      const room = io.sockets.adapter.rooms.get(roomId);
      const newRoomCount = room ? room.size : 0;
      io.to(roomId).emit("roomUpdate", newRoomCount);
    })
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});