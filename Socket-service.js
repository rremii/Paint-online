
class SocketService {

    connectionHandler = (ws, msg,aWss) => {
        ws.id = msg.id
        this.broadcastConnection(ws, msg,aWss)
    }

    broadcastConnection = (ws, msg,aWss) => {

        aWss.clients.forEach(client => {
            if (client.id === msg.id) {
                client.send(JSON.stringify(msg))
            }
        })
    }
}

module.exports = new SocketService()
