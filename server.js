const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');

// routers
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const chatRouter = require('./routes/chatRoute');

// Import WebSocket handling
const setupWebSocket = require('./websocket');

// Initialize Express app
const app = express();
var cors = require('cors')

app.use(cors());

// Loading Swagger documentation
const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));

// Swagger openapi UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use JSON middleware
app.use(express.json());

// Use route handlers
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://chatapp:udaysama@cluster0.wqvun.mongodb.net/')
  .then(() => console.log('Connected to MongoDB!'));

// Set up WebSocket server
setupWebSocket();
