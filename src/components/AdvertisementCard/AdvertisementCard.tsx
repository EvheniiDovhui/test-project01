import React from 'react'
import { useDispatch } from 'react-redux'

import Modal from '../modal/Modal'
import styles from './AdvertisementCard.module.css'
import { toggleFavorite } from '../../redux/slices/advertsSlice'

interface AdvertisementCardProps {
	advert: {
		_id: string
		name: string
		description: string
		gallery: string[]
		isFavorite: boolean
		price: number
		location: string
	}
}

const AdvertisementCard: React.FC<AdvertisementCardProps> = ({ advert }) => {
	const dispatch = useDispatch()
	const [modalOpen, setModalOpen] = React.useState(false)

	const handleToggleFavorite = () => {
		dispatch(toggleFavorite(advert._id))
	}

	return (
		<div className={styles.advertisementCard}>
			<img src={advert.gallery[0]} alt={advert.name} />
			<h3>{advert.name}</h3>
			<p>{advert.description}</p>
			<p className={styles.price}>€{advert.price.toFixed(2)}</p>
			<p className={styles.location}>{advert.location}</p>
			<button onClick={handleToggleFavorite}>
				{advert.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
			</button>
			<button onClick={() => setModalOpen(true)}>Show more</button>

			{modalOpen && (
				<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
					<div>
						<h2>{advert.name}</h2>
						<p>{advert.description}</p>
						<p>Price: €{advert.price}</p>
						<p>Location: {advert.location}</p>
						<div className={styles.gallery}>
							{advert.gallery.map((image, index) => (
								<img
									key={index}
									src={image}
									alt={`Gallery image ${index + 1}`}
								/>
							))}
						</div>
					</div>
				</Modal>
			)}
		</div>
	)
}

export default AdvertisementCard
