import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleFavorite } from '../../redux/reducers/advertsSlice'
import styles from './CamperCard.module.css'

interface CamperCardProps {
	advert: any
}

const CamperCard: React.FC<CamperCardProps> = ({ advert }) => {
	const dispatch = useDispatch()

	const handleFavoriteClick = () => {
		dispatch(toggleFavorite(advert._id))
	}

	return (
		<div className={styles.camperCard}>
			<img src={advert.gallery[0]} alt={advert.name} />
			<h3>{advert.name}</h3>
			<p>{advert.description}</p>
			<p className={styles.price}>€{advert.price.toFixed(2)}</p>
			<p className={styles.location}>{advert.location}</p>
			<button onClick={handleFavoriteClick}>
				{advert.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
			</button>
			<button>Show more</button>
		</div>
	)
}

export default CamperCard
