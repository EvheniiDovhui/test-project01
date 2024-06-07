import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CamperCard from '../components/CamperCard/CamperCard'
import { fetchAdverts } from '../redux/reducers/advertsSlice'
import { AppDispatch } from '../redux/reducers/store'
import styles from './CatalogPage.module.css'

import SidebarComponent from '../components/SidebarComponent/SidebarComponent'

const CatalogPage: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const adverts = useSelector((state: any) => state.adverts.items)
	const [visibleAdverts, setVisibleAdverts] = useState(4)

	useEffect(() => {
		dispatch(fetchAdverts())
	}, [dispatch])

	const loadMore = () => {
		setVisibleAdverts(prev => prev + 4)
	}

	return (
		<div className={styles.catalogPage}>
			<h1>Catalog of Campers</h1>
			<SidebarComponent />
			<div className={styles.camperGrid}>
				{adverts.slice(0, visibleAdverts).map((advert: any) => (
					<CamperCard key={advert._id} advert={advert} />
				))}
			</div>
			{visibleAdverts < adverts.length && (
				<button onClick={loadMore} className={styles.loadMore}>
					Load more
				</button>
			)}
		</div>
	)
}

export default CatalogPage
