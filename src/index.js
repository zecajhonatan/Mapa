// import express from 'express';
let express = require("express")

// import { createServer } from 'node:http';
let createServer = require("node:http")

// import { fileURLToPath } from 'node:url';
// import { dirname, join } from 'node:path';
import path from 'node:path';
let path = require("node:path")

// import { Server } from 'socket.io';

let Server = require("socket.io")

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = 3000

app.set(express.json())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
// const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.ejs'));
  // res.render('index.ejs')
});

let dados = {}

io.on('connection', (socket) => {
  console.log('Novo Cliente Conectado' + socket.id)

  socket.on('updateLocation', (msg) => {
    dados[socket.id] = msg
    io.emit('updateLocation', dados);
  });

  socket.on('disconnect', () => {
    console.log('Novo Cliente Conectado')
    delete dados[socket.id];
    io.emit('updateLocation', dados);
  })
});


server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

