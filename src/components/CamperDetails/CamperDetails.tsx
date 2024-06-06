import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleFavorite } from '../../redux/advertsSlice'
import Modal from '../../modal/Modal'
import Camper from './Camper'

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
		<div className='advertisement-card'>
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
						<h3>Details:</h3>
						<ul>
							<li>Price: ${advert.price}</li>
							<li>Rating: {advert.rating}</li>
							<li>Location: {advert.location}</li>
							<li>Adults: {advert.adults}</li>
							<li>Children: {advert.children}</li>
							<li>Engine: {advert.engine}</li>
							<li>Transmission: {advert.transmission}</li>
							<li>Form: {advert.form}</li>
							<li>
								Dimensions: {advert.length} x {advert.width} x {advert.height}
							</li>
							<li>Tank: {advert.tank}</li>
							<li>Fuel Consumption: {advert.consumption}</li>
							<li>Details:</li>
							<ul>
								<li>
									Air Conditioner:{' '}
									{advert.details.airConditioner ? 'Yes' : 'No'}
								</li>
								<li>Bathroom: {advert.details.bathroom ? 'Yes' : 'No'}</li>
								<li>Kitchen: {advert.details.kitchen ? 'Yes' : 'No'}</li>
								<li>Beds: {advert.details.beds}</li>
								<li>TV: {advert.details.TV ? 'Yes' : 'No'}</li>
								<li>CD Player: {advert.details.CD ? 'Yes' : 'No'}</li>
								<li>Radio: {advert.details.radio ? 'Yes' : 'No'}</li>
								<li>Shower: {advert.details.shower ? 'Yes' : 'No'}</li>
								<li>Toilet: {advert.details.toilet ? 'Yes' : 'No'}</li>
								<li>Freezer: {advert.details.freezer ? 'Yes' : 'No'}</li>
								<li>Hob: {advert.details.hob}</li>
								<li>Microwave: {advert.details.microwave ? 'Yes' : 'No'}</li>
								<li>Gas Supply: {advert.details.gas}</li>
								<li>Water Tank: {advert.details.water}</li>
							</ul>
							<li>Reviews:</li>
							<ul>
								{advert.reviews.map((review, index) => (
									<li key={index}>
										<strong>{review.reviewer_name}:</strong> {review.comment}
									</li>
								))}
							</ul>
						</ul>
					</div>
				</Modal>
			)}
		</div>
	)
}

export default CamperDetails
