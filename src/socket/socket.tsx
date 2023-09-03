import { io } from "socket.io-client"

export const socket = () => {
  return io.connect(import.meta.env.VITE_API_URL)
}