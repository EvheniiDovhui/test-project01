import React from 'react'
import { useSelector } from 'react-redux'
import CamperCard from '../components/CamperCard/CamperCard'
import styles from './FavoritesPage.module.css'

const FavoritesPage: React.FC = () => {
	const favorites = useSelector((state: any) => state.adverts.favorites)

	return (
		<div className={styles.favoritesPage}>
			<h1>Favorite Campers</h1>
			<div className={styles.camperGrid}>
				{favorites.map((advert: any) => (
					<CamperCard key={advert._id} advert={advert} />
				))}
			</div>
		</div>
	)
}

export default FavoritesPage
