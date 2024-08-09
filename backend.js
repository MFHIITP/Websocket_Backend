import express from 'express';
import { WebSocketServer } from 'ws';

const port = 3000;
const app = express();
app.use(express.json());

const http_server = app.listen(port, ()=>{
    console.log(`Listning at port ${port}`);
});

const wss = new WebSocketServer({
    server: http_server,
})

wss.on('connection', (client)=>{
    console.log(`${client} connected`);
    client.on('message', (message)=>{
        const allclients = wss.clients;
        allclients.forEach((client)=>{
            if(client.readyState === client.OPEN){
                client.send(message);
            }
        })
    })
    client.on('close', ()=>{
        console.log("Connection Terminated");
    })
});