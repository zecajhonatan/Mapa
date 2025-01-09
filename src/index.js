import express from 'express';

import { createServer } from 'node:http';

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import path from 'path';

import { Server } from 'socket.io';


const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = 3000

app.set(express.json())

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render(path.join(__dirname, '..', 'views/index.ejs'))
});

let dados = {}

io.on('connection', (socket) => {
  console.log('Novo Cliente Conectado', socket.id)

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

