import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleFavorite } from '../../redux/advertsSlice'

interface CamperCardProps {
	advert: any
}

const CamperCard: React.FC<CamperCardProps> = ({ advert }) => {
	const dispatch = useDispatch()

	const handleFavoriteClick = () => {
		dispatch(toggleFavorite(advert._id))
	}

	return (
		<div className='camper-card'>
			<img src={advert.gallery[0]} alt={advert.name} />
			<h3>{advert.name}</h3>
			<p>{advert.description}</p>
			<button onClick={handleFavoriteClick}>
				{advert.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
			</button>
			<button>Show more</button>
		</div>
	)
}

export default CamperCard
