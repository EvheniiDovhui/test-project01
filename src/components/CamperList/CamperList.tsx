import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchAdverts,
	Camper,
	selectLocations,
	selectDetails,
} from '../../redux/reducers/advertsSlice'
import { RootState } from '../../redux/reducers/store'
import CamperCard from '../CamperCard/CamperCard'
import styles from './CamperList.module.css'

interface CamperListProps {
	location: string | null
	equipment: string[]
	vehicleType: string | null
}

const CamperList: React.FC<CamperListProps> = ({
	location,
	equipment,
	vehicleType,
}) => {
	const dispatch = useDispatch()
	const adverts = useSelector((state: RootState) => state.adverts.items)
	const [visibleAdverts, setVisibleAdverts] = useState(4)

	useEffect(() => {
		dispatch(fetchAdverts() as any)
	}, [dispatch])

	const filterAdverts = useMemo(() => {
		if (!adverts) return []

		return adverts.filter((advert: Camper) => {
			const matchesLocation = !location || advert.location === location

			const matchesVehicleType =
				!vehicleType || advert.form.toLowerCase() === vehicleType.toLowerCase() // Правильне порівняння

			const matchesEquipment =
				equipment.length === 0 ||
				equipment.every(item => {
					const details = advert.details
					return details && details[item as keyof typeof details] === true
				})

			return matchesLocation && matchesVehicleType && matchesEquipment
		})
	}, [adverts, location, equipment, vehicleType])

	const loadMore = () => {
		setVisibleAdverts(prev => prev + 4)
	}

	useEffect(() => {
		console.log('Adverts in Redux Store:', adverts)
		dispatch(fetchAdverts() as any)
	}, [dispatch])

	return (
		<div>
			<div className={styles.camperGrid}>
				{filterAdverts.slice(0, visibleAdverts).map((advert: Camper) => (
					<CamperCard key={advert._id} advert={advert} />
				))}
			</div>
			{visibleAdverts < filterAdverts.length && (
				<button onClick={loadMore} className={styles.loadMore}>
					Load More
				</button>
			)}
		</div>
	)
}

export default CamperList
