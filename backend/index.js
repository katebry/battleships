const app = require('express')();
const server = require('http').createServer(app);
const port = 3000
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', () => {
    console.log('someone connected!')
});

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
});



