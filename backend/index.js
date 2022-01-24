const app = require('express')();
const server = require('http').createServer(app);
const port = 3000
const io = require('socket.io')(server);

const connectionLimit = 2;
let players = [];

let position = {
    x: 200,
    y: 200
};


io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
    players.push(socket.id);

    if (io.engine.clientsCount > connectionLimit) {
        socket.emit('err', { message: 'reach the limit of connections' })
        socket.disconnect()
        console.log('Disconnected...')
        return
    }

    if (players.length === 1) {
        io.emit('isPlayer1');
    };

    socket.on("move", data => {
        switch(data) {
            case "left":
                position.x -= 5;
                Socketio.emit("position", position);
                break;
            case "right":
                position.x += 5;
                Socketio.emit("position", position);
                break;
            case "up":
                position.y -= 5;
                Socketio.emit("position", position);
                break;
            case "down":
                position.y += 5;
                Socketio.emit("position", position);
                break;
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        players = players.filter(player => player !== socket.id);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    console.log(players)
});

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
});



