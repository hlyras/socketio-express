module.exports = function(io) {
	function findClientsSocket(roomId, namespace) {
	    var res = []
	    // the default namespace is "/"
	    , socketServer = io.of(namespace ||"/");

	    if (socketServer) {
	        for (var id in socketServer.connected) {
	            if(roomId) {
	                var index = socketServer.connected[id].rooms.indexOf(roomId);
	                if(index !== -1) {
	                    res.push(socketServer.connected[id]);
	                }
	            } else {
	                res.push(socketServer.connected[id]);
	            }
	        }
	    }
	    return res;
	}

	let messages = [];

    io.on('connection', socket => {
		// How to get actual socket id
		// console.log(`Socket conectado: ${socket.id}`);

		// How to get all ids connected to the room
		// console.log('clients')
		// var clients = findClientsSocket();
		// clients.forEach(client => {
		// 	console.log("client: "+client.id);
		// });

		socket.emit('previousMessages', messages);

		socket.on('sendMessage', data => {
			messages.push(data);
			socket.broadcast.emit('receivedMessage', data);
		});
	});
};