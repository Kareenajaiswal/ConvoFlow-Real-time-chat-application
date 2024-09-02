
//TESTING (Inprocess)
const socketIo = require('socket.io');
const axios = require('axios'); // For making HTTP requests

const initializeSocket = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user connected: ' + socket.id);

        // Listen for a new message
        socket.on('sendMessage', async (data) => {
            try {
                // Make a request to the existing message API endpoint
                const response = await axios.post('http://localhost:3000/api/chats/messages', {
                    chatId: data.chatId,
                    content: data.content
                }, {
                    headers: {
                        'Authorization': `Bearer ${data.token}` // Include the token if required
                    }
                });

                const message = response.data.message; // Assuming the API returns the created message

                // Broadcast the message to other participants in the chat
                io.to(data.chatId).emit('receiveMessage', message);

            } catch (error) {
                console.error('Error sending message:', error);
            }
        });

        // Listen for a user joining a chat room
        socket.on('joinChat', (chatId) => {
            socket.join(chatId);
            console.log(`User joined chat: ${chatId}`);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected: ' + socket.id);
        });
    });
};

module.exports = initializeSocket;