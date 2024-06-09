import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from '../modal/Modal'
import ModalContent from '../modal/ModalContent/ModalContent' // Шлях до вашого файлу з ModalContent

import styles from './CamperCard.module.css'
import { ReactComponent as HeartIcon } from './heart.svg'
import { ReactComponent as HeartFilledIcon } from './heart-filled.svg'
import { toggleFavorite } from '../../redux/slices/advertsSlice'

interface CamperCardProps {
	advert: any
}

const CamperCard: React.FC<CamperCardProps> = ({ advert }) => {
	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)

	const handleFavoriteClick = () => {
		dispatch(toggleFavorite(advert._id))
	}

	function truncateText(text: string, maxLength: number): string {
		if (text.length > maxLength) {
			return text.substring(0, maxLength) + '...'
		} else {
			return text
		}
	}

	const openModal = () => {
		setShowModal(true)
	}

	const closeModal = () => {
		setShowModal(false)
	}

	return (
		<div className={styles.card}>
			<div className={styles.imageWrapper}>
				<img
					src={advert.gallery[0]}
					alt={advert.name}
					className={styles.image}
				/>
			</div>
			<div className={styles.content}>
				<div className={styles.header}>
					<h3 className={styles.name}>{advert.name}</h3>
					<div className={styles.price}>€{advert.price.toFixed(2)}</div>
				</div>
				<div className={styles.meta}>
					<span className={styles.reviews}>
						⭐ {advert.rating} ({advert.reviews.length} Reviews)
					</span>
					<span className={styles.location}>{advert.location}</span>
				</div>
				<p className={styles.description}>
					{truncateText(advert.description, 100)}
				</p>
				<div className={styles.details}>
					<span>🚻 {advert.adults} adults</span>
					<span>⚙️ {advert.transmission}</span>
					<span>⛽ {advert.engine}</span>
					<span>🍳 {advert.details.kitchen ? 'Kitchen' : 'No Kitchen'}</span>
					<span>🛌 {advert.details.beds} beds</span>
					<span>❄️ {advert.details.airConditioner ? 'AC' : 'No AC'}</span>
				</div>
				<div className={styles.actions}>
					<button
						className={styles.favoriteButton}
						onClick={handleFavoriteClick}
					>
						{advert.isFavorite ? (
							<HeartFilledIcon className={styles.heartIcon} />
						) : (
							<HeartIcon className={styles.heartIcon} />
						)}
					</button>
					<button onClick={openModal} className={styles.showMoreButton}>
						Show more
					</button>
					<Modal isOpen={showModal} onClose={closeModal}>
						<ModalContent
							name={advert.name}
							description={advert.description}
							advert={advert}
						/>
					</Modal>
				</div>
			</div>
		</div>
	)
}

export default CamperCard
