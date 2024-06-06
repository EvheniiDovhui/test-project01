import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdverts } from '../redux/advertsSlice'
import CamperCard from '../components/CamperCard/CamperCard'
import { AppDispatch } from '../redux/store'

const CatalogPage: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const adverts = useSelector((state: any) => state.adverts.items)

	useEffect(() => {
		dispatch(fetchAdverts())
	}, [dispatch])

	return (
		<div>
			<h1>Catalog of Campers</h1>
			<div className='camper-grid'>
				{adverts.map((advert: any) => (
					<CamperCard key={advert._id} advert={advert} />
				))}
			</div>
		</div>
	)
}

export default CatalogPage
