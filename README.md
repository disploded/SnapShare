# SnapShare
**CURRENTLY IN EARLY STAGES OF DEVELOPMENT**
A real-time, peer-to-peer file sharing application built with **React** and **WebSockets**.

### Project
SnapShare was born out of a personal desire to transfer files instantaneously through devices without having to rely on a cloud.

### Tech Stack
* **Frontend:** React.JS, TailwindCSS
* **Network:** WebSockets, Socket.io
* **Environment:** Optimized for `localhost` development.

### How it Works
1. **Host a Room:** A user initializes a session, generating a unique **Room Code**.
2. **Handshake:** Peer devices enter the code via the **Join Room** function, establishing a direct WebSocket connection.
3. **Upload Files:** The host uploads files which can be immediately downloaded by connected users.

### The Future?
- [ ] **Room Passwords:** Adding a secondary layer of authentication for room access.
- [ ] **Encryption:** Making sure the data packets are only decryptable by the intended recipient(s).
- [ ] **Drag-and-Drop Interface / UI Improvements:** Enhancing the user experience for seamless file selection.

---

### Local Development
To run this project locally:

1. Clone the repository:
   `git clone https://github.com/disploded/SnapShare.git`
2. Install dependencies:
   `npm install`
3. Start the development server:
   `npm start`
