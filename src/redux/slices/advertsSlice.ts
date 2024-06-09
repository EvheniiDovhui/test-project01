import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	createSelector,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

export type Camper = {
	_id: string
	name: string
	location: string

	gallery?: string[]
	equipment: string[]
	type: string
	reviews?: {
		reviewer_name: string
		reviewer_rating: number
		comment: string
	}[]
	isFavorite?: boolean
	details: {
		[key: string]: any 
	}
	form: string
	
}

interface AdvertsState {
	items: Camper[]
}

const initialState: AdvertsState = {
	items: [],
}

const selectAdverts = (state: RootState) => state.adverts.items

export const selectLocations = createSelector([selectAdverts], adverts => {
	if (!adverts) return []
	return Array.from(new Set(adverts.map((ad: Camper) => ad.location)))
})

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

export const selectDetails = createSelector([selectAdverts], adverts => {
	if (!adverts) return []

	const detailsSet = new Set<string>()
	adverts.forEach((ad: Camper) => {
		Object.keys(ad.details).forEach(key => {
			if (ad.details[key] === true) {
				detailsSet.add(key)
			}
		})
	})

	return Array.from(detailsSet)
})

export const { toggleFavorite } = advertsSlice.actions

export default advertsSlice.reducer
