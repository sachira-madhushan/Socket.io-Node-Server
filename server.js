import express from 'express';
import {Server as SocketIOServer} from 'socket.io';
import { createServer } from 'http';
import bodyParser from 'body-parser';

const app=express();
const server=createServer(app);
const io=new SocketIOServer(server);
app.use(bodyParser.json());

app.post("/api/send_notification",(req,res)=>{
    const {title,description}=req.body;
    io.emit("notification",{title,description});
    res.status(200).json({
        "message":"Notification broadcasted"
    })
})

io.on("connection",(socket)=>{
    console.log("[+]New client connected");
    socket.on("disconnect",()=>{
        console.log("[!]Client disconnected");
    })
})

server.listen("8000",()=>{
    console.log("[+]Server is running...");
})