import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAdverts } from '../../redux/reducers/advertsSlice'
import { AppDispatch, RootState } from '../../redux/reducers/store'
import styles from './CamperList.module.css'
import CamperCard from '../CamperCard/CamperCard'

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
	const dispatch = useDispatch<AppDispatch>()
	const adverts = useSelector((state: RootState) => state.adverts.items)
	const [visibleAdverts, setVisibleAdverts] = useState(4)

	useEffect(() => {
		dispatch(fetchAdverts())
	}, [dispatch])

	const filteredAdverts = adverts.filter(advert => {
		return (
			(location ? advert.location === location : true) &&
			(equipment.length
				? equipment.every(e => advert.equipment.includes(e))
				: true) &&
			(vehicleType ? advert.type === vehicleType : true)
		)
	})

	const loadMore = () => {
		setVisibleAdverts(prev => prev + 4)
	}

	return (
		<div>
			<div className={styles.camperGrid}>
				{filteredAdverts.slice(0, visibleAdverts).map(advert => (
					<CamperCard key={advert._id} advert={advert} />
				))}
			</div>
			{visibleAdverts < filteredAdverts.length && (
				<button onClick={loadMore} className={styles.loadMore}>
					Load more
				</button>
			)}
		</div>
	)
}

export default CamperList
