class SocketService {

    connectionHandler = (ws, msg, aWss) => {
        ws.sessionId = msg.sessionId
        this.broadcastConnection(ws, msg, aWss)
    }

    broadcastConnection = (ws, msg, aWss) => {
        aWss.clients.forEach(client => {
            if (client.sessionId === msg.sessionId) {
                client.send(JSON.stringify(msg))
            }
        })
    }
}

module.exports = new SocketService()
