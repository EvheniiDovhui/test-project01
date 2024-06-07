import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface Camper {
	_id: string
	name: string
	location: string
	description: string
	gallery?: string[]
	equipment: string[]
	type: string
	reviews?: {
		reviewer_name: string
		reviewer_rating: number
		comment: string
	}[]
	isFavorite?: boolean
}

interface AdvertsState {
	items: Camper[]
}

const initialState: AdvertsState = {
	items: [],
}

export const fetchAdverts = createAsyncThunk(
	'adverts/fetchAdverts',
	async () => {
		const response = await axios.get<Camper[]>(
			'https://6661704b63e6a0189fe9d8c1.mockapi.io/api/v1/campers'
		)
		return response.data
	}
)

const advertsSlice = createSlice({
	name: 'adverts',
	initialState,
	reducers: {
		toggleFavorite: (state, action: PayloadAction<string>) => {
			const advert = state.items.find(item => item._id === action.payload)
			if (advert) {
				advert.isFavorite = !advert.isFavorite
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(
			fetchAdverts.fulfilled,
			(state, action: PayloadAction<Camper[]>) => {
				state.items = action.payload
			}
		)
	},
})

export const { toggleFavorite } = advertsSlice.actions

export default advertsSlice.reducer
