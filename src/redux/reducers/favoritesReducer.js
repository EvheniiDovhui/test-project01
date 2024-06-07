import {
	ADD_TO_FAVORITES,
	REMOVE_FROM_FAVORITES,
} from '../actions/favoritesActions'

const initialState = []

const favoritesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_FAVORITES:
			if (!state.includes(action.payload)) {
				return [...state, action.payload]
			}
			return state
		case REMOVE_FROM_FAVORITES:
			return state.filter(id => id !== action.payload)
		default:
			return state
	}
}

export default favoritesReducer
