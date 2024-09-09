const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const chatRouter = require('./routes/chatRoute');

const express = require('express');
const  mongoose = require('mongoose')
const app = express();


const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
// Load the YAML file
const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const WebSocket = require('ws');

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
app.use('/user',userRouter);
app.use('/chat',chatRouter);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
