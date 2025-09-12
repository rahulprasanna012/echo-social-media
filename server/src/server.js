import express from "express";
import { config } from "@dotenvx/dotenvx";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import { cloudinaryConfiguration } from "./config/cloudinary.js";
import { postRouter } from "./routes/postRoute.js";
import { userRouter } from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";
import { Server } from "socket.io";
import http from "http";

config();

const app = express();

const ALLOWED_ORIGIN = process.env.ORIGIN || "http://localhost:5173";

// Express CORS
app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => res.send("OK"));

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

// Cloudinary & DB
cloudinaryConfiguration();
connectDB();

// ---- Socket.IO on the SAME server instance ----
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGIN,
    credentials: true,
  },
  // path: "/socket.io", // default; set explicitly if you ever change it
});

export const userSocketMap= {}; // { userId: socketId }

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId ;
  console.log("User Connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", userId);
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

const PORT = process.env.PORT || 3000;
// IMPORTANT: listen with `server`, not `app`
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
