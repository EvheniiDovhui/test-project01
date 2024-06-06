import React from 'react'
import { useSelector } from 'react-redux'
import CamperCard from '../components/CamperCard/CamperCard'

const FavoritesPage: React.FC = () => {
	const favorites = useSelector((state: any) => state.adverts.favorites)

	return (
		<div>
			<h1>Favorite Campers</h1>
			<div className='camper-grid'>
				{favorites.map((advert: any) => (
					<CamperCard key={advert._id} advert={advert} />
				))}
			</div>
		</div>
	)
}

export default FavoritesPage
