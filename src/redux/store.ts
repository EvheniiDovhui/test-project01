import { configureStore } from '@reduxjs/toolkit'
import advertsReducer from './advertsSlice'

const store = configureStore({
	reducer: {
		adverts: advertsReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export default store
