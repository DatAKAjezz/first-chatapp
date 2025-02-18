import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'

import authRoutes from './src/routes/auth.route.js'
import messageRoutes from './src/routes/message.route.js'

import { connectDB } from "./src/lib/db.js";
import { app, server } from './src/lib/socket.js'

import path from 'path'

dotenv.config();
const PORT = process.env.PORT
const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

server.listen(PORT, () => { 
    console.log("Server is running on : ", PORT);
    connectDB();
});
