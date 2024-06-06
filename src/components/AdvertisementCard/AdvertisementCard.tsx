import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleFavorite } from '../../redux/advertsSlice'
import Modal from '../../modal/Modal'

interface AdvertisementCardProps {
	advert: {
		_id: string
		name: string
		description: string
		gallery: string[]
		isFavorite: boolean
	}
}

const AdvertisementCard: React.FC<AdvertisementCardProps> = ({ advert }) => {
	const dispatch = useDispatch()

	const [modalOpen, setModalOpen] = React.useState(false)

	const handleToggleFavorite = () => {
		dispatch(toggleFavorite(advert._id))
	}

	return (
		<div className='advertisement-card'>
			<h3>{advert.name}</h3>
			<p>{advert.description}</p>
			<button onClick={handleToggleFavorite}>
				{advert.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
			</button>
			<button onClick={() => setModalOpen(true)}>Show more</button>

			{modalOpen && (
				<Modal isOpen={modalOpen} onClose={() => setModalOpen(true)}>
					<div>
						<h2>{advert.name}</h2>
						<p>{advert.description}</p>
					</div>
				</Modal>
			)}
		</div>
	)
}

export default AdvertisementCard
