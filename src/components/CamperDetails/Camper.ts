interface Camper {
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
	details: {
		airConditioner: number
		bathroom: number
		kitchen: number
		beds: number
		TV: number
		CD: number
		radio: number
		shower: number
		toilet: number
		freezer: number
		hob: number
		microwave: number
		gas: string
		water: string
	}
	gallery: string[]
	reviews: {
		reviewer_name: string
		reviewer_rating: number
		comment: string
	}[]
	isFavorite: boolean
}
export default Camper
