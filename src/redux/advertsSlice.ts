import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAdverts = createAsyncThunk(
	'adverts/fetchAdverts',
	async () => {
		const response = await axios.get(
			'https://6661704b63e6a0189fe9d8c1.mockapi.io/api/v1/campers'
		)
		return response.data
	}
)

interface Advert {
	_id: string
	name: string
	description: string
	gallery: string[]
	isFavorite: boolean
}

const advertsSlice = createSlice({
	name: 'adverts',
	initialState: {
		items: [] as Advert[],
		favorites: [] as Advert[],
	},
	reducers: {
		toggleFavorite: (state, action) => {
			const advertId = action.payload
			const advert = state.items.find(item => item._id === advertId)
			if (advert) {
				advert.isFavorite = !advert.isFavorite
				if (advert.isFavorite) {
					state.favorites.push(advert)
				} else {
					state.favorites = state.favorites.filter(
						item => item._id !== advertId
					)
				}
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchAdverts.fulfilled, (state, action) => {
			state.items = action.payload
		})
	},
})

export const { toggleFavorite } = advertsSlice.actions

export default advertsSlice.reducer
