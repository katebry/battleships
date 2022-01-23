const app = require('express')();
const server = require('http').createServer(app);
const port = 3000
const io = require('socket.io')(server);

let players = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
    players.push(socket.id);

    if (players.length === 1) {
        io.emit('isPlayer1');
    };

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



