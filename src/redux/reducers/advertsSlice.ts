import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAdverts = createAsyncThunk(
	'adverts/fetchAdverts',
	async () => {
		const response = await axios.get('https://your-mockapi-endpoint/adverts')
		return response.data
	}
)

interface Advert {
	_id: string
	name: string
	price: number
	rating: number
	location: string
	adults: number
	children: number
	engine: string
	transmission: string
	form: string
	length: string
	width: string
	height: string
	tank: string
	consumption: string
	description: string
	details: any
	gallery: string[]
	reviews: any[]
	isFavorite: boolean
}

const initialState = {
	items: [] as Advert[],
	favorites: JSON.parse(localStorage.getItem('favorites') || '[]') as Advert[],
}

const advertsSlice = createSlice({
	name: 'adverts',
	initialState,
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
				localStorage.setItem('favorites', JSON.stringify(state.favorites))
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
