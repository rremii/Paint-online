import axios from "axios"

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/"
// export const API_URL_STATIC =
//   process.env.NEXT_PUBLIC_API_URL_STATIC || "http://localhost:5000/static/"

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {},
})

$api.interceptors.request.use((config) => {
  if (config.headers != null) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`
    config.headers.IsRemember = localStorage.getItem("isRememberMe") + ""
  }
  return config
})
$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get<{ accessToken: string }>(
          API_URL + "auth/refresh",
          { withCredentials: true }
        )
        localStorage.setItem("accessToken", response.data.accessToken)
        return await $api.request(originalRequest)
      } catch (e) {
        window.location.href = "/"
        localStorage.removeItem("accessToken")
      }
    }
    throw error
  }
)
