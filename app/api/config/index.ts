import axios from "axios"

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/"
export const API_URL_WS =
  process.env.NEXT_PUBLIC_API_URL_WS || "ws://localhost:5000/"

export const $api = axios.create({
  withCredentials: false,
  baseURL: API_URL,
  headers: {},
})
