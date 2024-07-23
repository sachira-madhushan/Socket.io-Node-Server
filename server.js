import express from 'express';
import {Server as SocketIOServer} from 'socket.io';
import { createServer } from 'http';
import bodyParser from 'body-parser';

const app=express();
const server=createServer(app);
const io=new SocketIOServer(server);
app.use(bodyParser.json());

io.on("connection",(socket)=>{
    console.log("[+]New client connected");
    socket.on("disconnect",()=>{
        console.log("[!]Client disconnected");
    })
})

server.listen("3000",()=>{
    console.log("[+]Server is running...");
})