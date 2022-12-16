import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import { PreloadedState } from "redux"

import MeSlice from "./MeSlice"
import { Api } from "../api/config/Api"

const rootReducer = combineReducers({
  Me: MeSlice,

  [Api.reducerPath]: Api.reducer,
})
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(Api.middleware),
    devTools: false,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

// export default store
// // Infer the `RootState` and `AppDispatch` types.ts from the store itself
// export type RootState = ReturnType<typeof store.getState>
// export type AppStore = typeof store
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
//
export const store = setupStore()
