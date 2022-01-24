const express = require("express")();
const cors = require("cors");
const httpServer = require("http").Server(express);

const connectionLimit = 2
let players = []

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

var position = {
    x: 200,
    y: 200
};

httpServer.listen(3000, () => {
    console.log("Listening at :3000...");
});

io.on("connection", socket => {
    socket.emit("position", position);

    if (io.engine.clientsCount > connectionLimit) {
        socket.emit('err', { message: 'reach the limit of connections' })
        socket.disconnect()
        console.log('Disconnected... reached the limit of connections')
        return
    }

    console.log('A user connected: ' + socket.id);
    players.push(socket.id);
    socket.on("move", data => {
        switch(data) {
            case "left":
                position.x -= 5;
                io.emit("position", position);
                break;
            case "right":
                position.x += 5;
                io.emit("position", position);
                break;
            case "up":
                position.y -= 5;
                io.emit("position", position);
                break;
            case "down":
                position.y += 5;
                io.emit("position", position);
                break;
        }
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
        players = players.filter(player => player !== socket.id);
    });
});

