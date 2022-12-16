import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react"
import { AxiosRequestConfig } from "axios"
import { $api, API_URL } from "./index"

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig["method"]
      data?: AxiosRequestConfig["data"]
      params?: AxiosRequestConfig["params"]
      isDefault?: boolean //use default axios, instead of custom with interceptors
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    const result = await $api({ url: baseUrl + url, method, data, params })

    return { data: result.data }
  }

export const Api = createApi({
  reducerPath: "chatApiRtk",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),

  tagTypes: [],
  endpoints: (build) => ({}),
})
