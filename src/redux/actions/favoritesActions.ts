export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES'
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES'

export const addToFavorites = (id: string) => ({
	type: ADD_TO_FAVORITES,
	payload: id,
})

export const removeFromFavorites = (id: string) => ({
	type: REMOVE_FROM_FAVORITES,
	payload: id,
})
