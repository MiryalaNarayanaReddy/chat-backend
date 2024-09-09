// import authRouter from './routes/authRoute';
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const newChat = require('./routes/newChat')

const express = require('express');
const WebSocket = require('ws');
const  mongoose = require('mongoose')



const app = express();

// Initialize WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// WebSocket event handling
wss.on('connection', (ws) => {
  console.log('A new client connected.');

  // Event listener for incoming messages
  ws.on('message', (message) => {
    console.log('Received message:', message.toString());

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  // Event listener for client disconnection
  ws.on('close', () => {
    console.log('A client disconnected.');
  });
});
mongoose.connect('mongodb+srv://chatapp:udaysama@cluster0.wqvun.mongodb.net/')
  .then(() => console.log('Connected!'));



app.use(express.json());

app.use('/auth',authRouter);
app.use('/chat',newChat);
app.use('/user',userRouter);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
