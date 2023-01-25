import { $api } from "./index"
import { figure } from "../../store/types"

export const SendCanvas = (sessionId: string, img: string) => {
  return $api
    .post(`http://localhost:5000/image?id=${sessionId}`, {
      img,
    })
    .then((response) => console.log(response.data))
}

export const FetchCanvas = (sessionId: string) => {
  return $api.get(`http://localhost:5000/image?id=${sessionId}`)
}

export class SocketApi {
  static Connect = (ws: WebSocket, sessionId: string, userName: string) => {
    // if (!socket) return
    ws.send(
      JSON.stringify({
        sessionId,
        username: userName,
        method: "connection",
      })
    )
  }

  static Finish = (ws: WebSocket, sessionId: string) => {
    ws.send(
      JSON.stringify({
        method: "finish",
        sessionId,
      })
    )
  }

  static Share = (ws: WebSocket, sessionId: string, img: string) => {
    ws.send(
      JSON.stringify({
        method: "share",
        sessionId,
        img,
      })
    )
  }

  static Draw = (ws: WebSocket, sessionId: string, figure: figure) => {
    ws.send(
      JSON.stringify({
        method: "draw",
        sessionId,
        figure,
      })
    )
  }
}
