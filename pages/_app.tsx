import type { AppProps } from "next/app"
import "./../styles/style.scss"
import { Provider } from "react-redux"
import { store } from "../app/store/ReduxStore"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
