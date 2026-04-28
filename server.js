import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import bcrypt from "bcrypt";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const activeRooms = new Map();
activeRooms.set("test", { 
  passwordHash: bcrypt.hashSync("123", 12) 
});

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`User ${socket.id} has connected`)

    socket.on("createRoom", async ({roomId, password}) => { // add rooms to a set when created
      const hash = await bcrypt.hash(password, 12);
      activeRooms.set(roomId, {passwordHash: hash})
    })

    socket.on("checkRoom", (roomCodeInput, callback) => { // check if room exists when joining
      const exists = activeRooms.has(roomCodeInput);
      callback(exists);
    })

    socket.on("joinRoom", (roomId, password, callback) => {
      if (!roomId) return callback({ status: "error", message: "No room ID"})
      const roomData = activeRooms.get(roomId);

      if (roomData && bcrypt.compareSync(password, roomData.passwordHash)) { //verify password
        socket.join(roomId);

        // get value of how many people are currently in socket room & emit value
        process.nextTick(() => {
          const socketRoom = io.sockets.adapter.rooms.get(roomId);
          const newRoomCount = socketRoom ? socketRoom.size : 0;

          io.to(roomId).emit("roomUpdate", newRoomCount);
        })

        callback({status: "success"})
      } else {
        callback({status: "error", message: "Invalid password"})
      }
    })

    socket.on("disconnecting", () => {
      for (const roomId of socket.rooms) {
        if (roomId !== socket.id) {
          const socketRoom = io.sockets.adapter.rooms.get(roomId);
          
          if (socketRoom) {
            io.to(roomId).emit("roomUpdate", socketRoom.size - 1);
          }
        }
      }
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