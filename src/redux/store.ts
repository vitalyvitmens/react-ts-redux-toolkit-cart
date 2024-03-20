import { combineReducers } from 'redux'
import { logActionMiddleware } from './logActionMiddleware'
import { orderReducer } from './orderReducer'
import { productsSlice } from './productsReducer'
import thunkMiddleware from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = persistReducer(
  { key: 'redux-toolkit', storage: storage },
  combineReducers({
    products: productsSlice.reducer,
    order: orderReducer,
  })
)

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware, logActionMiddleware),
})

export const persistor = persistStore(store)

// @ts-ignore
window.persistor = persistor

export type RootState = ReturnType<typeof rootReducer>
