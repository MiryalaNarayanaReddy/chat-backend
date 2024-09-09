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

//////////////////////////////////////////////////////////////////////////////////////////
const WebSocket = require('ws');
const url = require('url');

// Initialize WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Dictionary to store WebSocket connections by chat ID
const chatSessions = {};

// WebSocket event handling
wss.on('connection', (ws, req) => {
  // Parse the user ID and chat ID from the query parameters
  const params = url.parse(req.url, true).query;
  const userId = params.userId;
  const chatId = params.chatId;

  if (!userId || !chatId) {
    // Close the connection if no user ID or chat ID is provided
    ws.close();
    console.log('Connection closed because user ID or chat ID was not provided.');
    return;
  }

  // Check if the chat session exists, if not, create it
  if (!chatSessions[chatId]) {
    chatSessions[chatId] = {
      user1: { id: null, ws: null },
      user2: { id: null, ws: null },
    };
  }

  // Identify if the connecting user is `user1` or `user2` in this chat
  const chatSession = chatSessions[chatId];

  if (!chatSession.user1.id) {
    chatSession.user1.id = userId;
    chatSession.user1.ws = ws;
    console.log(`User ${userId} connected as user1 in chat ${chatId}.`);
  } else if (!chatSession.user2.id && chatSession.user1.id !== userId) {
    chatSession.user2.id = userId;
    chatSession.user2.ws = ws;
    console.log(`User ${userId} connected as user2 in chat ${chatId}.`);
  } else if (chatSession.user1.id === userId) {
    chatSession.user1.ws = ws;  // Reconnecting user1
    console.log(`User ${userId} reconnected as user1 in chat ${chatId}.`);
  } else if (chatSession.user2.id === userId) {
    chatSession.user2.ws = ws;  // Reconnecting user2
    console.log(`User ${userId} reconnected as user2 in chat ${chatId}.`);
  } else {
    console.log(`Chat ${chatId} already has two users.`);
    ws.close();
    return;
  }

  // Event listener for incoming messages
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message.toString());

    if (parsedMessage.type === 'message') {
      const { senderId, content } = parsedMessage;

      console.log(`Message from ${senderId} in chat ${chatId}: ${content}`);

      // Determine the recipient based on sender
      const recipient = chatSession.user1.id === senderId ? chatSession.user2 : chatSession.user1;

      if (recipient.ws && recipient.ws.readyState === WebSocket.OPEN) {
        // Send the message to the recipient
        recipient.ws.send(JSON.stringify({
          from: senderId,
          content: content,
        }));
      } else {
        console.log(`User ${recipient.id} is not connected in chat ${chatId}.`);
      }
    }
  });

  // Event listener for client disconnection
  ws.on('close', () => {
    if (chatSession.user1.id === userId) {
      console.log(`User ${userId} (user1) disconnected from chat ${chatId}.`);
      chatSession.user1.ws = null;  // Keep the user ID but mark as disconnected
    } else if (chatSession.user2.id === userId) {
      console.log(`User ${userId} (user2) disconnected from chat ${chatId}.`);
      chatSession.user2.ws = null;  // Keep the user ID but mark as disconnected
    }
  });
});


//////////////////////////////////////////////////////////////////////////////////////////


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
