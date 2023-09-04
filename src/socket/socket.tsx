import { io } from "socket.io-client"

export const socket = () => {
  // return io(import.meta.env.VITE_API_URL+"\\.netlify\\functions\\api", { transports: ["websocket"], upgrade: false })
  return io(import.meta.env.VITE_API_URL, { transports: ["websocket"] })
}