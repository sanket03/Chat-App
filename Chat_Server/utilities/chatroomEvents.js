module.exports = chatroomEvents = () => {
    return {
        userLeft: (client) => {
            client.emit('userLeft', Object.keys(client.rooms)[0]);
        }
    }}
