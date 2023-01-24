const SocketServer = require('./Socket-service')

class SocketController {

    async onMessage(msg,ws,aWss) {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case "connection":
                SocketServer.connectionHandler(ws, msg,aWss)
                break
            case "draw":
                SocketServer.broadcastConnection(ws, msg,aWss)
                break
            case "share":
                SocketServer.broadcastConnection(ws, msg,aWss)
                break
            case "finish":
                SocketServer.broadcastConnection(ws, msg,aWss)
                break
        }
    }


}

module.exports = new SocketController()
