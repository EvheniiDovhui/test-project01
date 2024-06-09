import React from 'react'
import { useDispatch } from 'react-redux'

import Modal from '../../components/modal/Modal'
import Camper from './Camper'
import styles from './CamperDetails.module.css'
import { toggleFavorite } from '../../redux/slices/advertsSlice'

interface CamperDetailsProps {
	advert: Camper
}

const CamperDetails: React.FC<CamperDetailsProps> = ({ advert }) => {
	const dispatch = useDispatch()
	const [modalOpen, setModalOpen] = React.useState(false)

	const handleToggleFavorite = () => {
		dispatch(toggleFavorite(advert._id))
	}

	return (
		<div className={styles.camperDetails}>
			<h3>{advert.name}</h3>
			<p>{advert.description}</p>
			<button onClick={handleToggleFavorite}>
				{advert.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
			</button>
			<button onClick={() => setModalOpen(true)}>Show more</button>

			{modalOpen && (
				<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
					<div>
						<h2>{advert.name}</h2>
						<p>{advert.description}</p>
						<div className={styles.details}>
							<p>Price: €{advert.price}</p>
							<p>Location: {advert.location}</p>
							<p>Reviews: {advert.reviews.length}</p>
						</div>
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

export default CamperDetails
