import React from 'react'
import { useSelector } from 'react-redux'
import CamperCard from '../../components/CamperCard/CamperCard'
import { RootState } from '../../redux/store'

const FavoritesPage: React.FC = () => {
	const adverts = useSelector((state: RootState) => state.adverts.items)

	return (
		<div>
			<h1>Favorite Campers</h1>
			<div className='camper-grid'>
				{adverts &&
					adverts.length > 0 &&
					adverts.map(
						(advert: any) =>
							advert.isFavorite && (
								<CamperCard key={advert._id} advert={advert} />
							)
					)}
			</div>
		</div>
	)
}

export default FavoritesPage
