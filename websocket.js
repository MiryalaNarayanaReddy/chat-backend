
// WebSocket Backend Code
const WebSocket = require('ws');
const url = require('url');
const chatSessions = {};  // chatId -> { user1: { id, ws }, user2: { id, ws } }

function setupWebSocket() {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', (ws, req) => {
    const params = url.parse(req.url, true).query;
    const userId = params.userId;
    const chatId = params.chatId;

    if (!userId || !chatId) {
      ws.close();
      return;
    }

    if (!chatSessions[chatId]) {
      chatSessions[chatId] = { user1: { id: null, ws: null }, user2: { id: null, ws: null } };
    }

    const chatSession = chatSessions[chatId];

    if (!chatSession.user1.id) {
      chatSession.user1.id = userId;
      chatSession.user1.ws = ws;
    } else if (!chatSession.user2.id && chatSession.user1.id !== userId) {
      chatSession.user2.id = userId;
      chatSession.user2.ws = ws;
    } else if (chatSession.user1.id === userId) {
      chatSession.user1.ws = ws;
    } else if (chatSession.user2.id === userId) {
      chatSession.user2.ws = ws;
    } else {
      ws.close();
      return;
    }

    ws.on('message', (message) => {
      const parsedMessage = JSON.parse(message);
      const { senderId, content } = parsedMessage;
      const recipient = chatSession.user1.id === senderId ? chatSession.user2 : chatSession.user1;

      if (recipient.ws) {
        recipient.ws.send(JSON.stringify({ type: 'message', senderId, content }));
      }
    });

    ws.on('close', () => {
      if (chatSession.user1.id === userId) {
        chatSession.user1.ws = null;
      } else if (chatSession.user2.id === userId) {
        chatSession.user2.ws = null;
      }
    });
  });
}

module.exports = { setupWebSocket };
