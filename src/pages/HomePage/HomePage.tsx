// HomePage.tsx

import React from 'react'
import { Link } from 'react-router-dom'
import SimpleCarousel from '../../components/SimpleCarousel/SimpleCarousel'
import styles from './HomePage.module.css' // Імпортуйте стилі з вашого модуля

const HomePage: React.FC = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Welcome to the Camper Rental Service</h1>
			<p className={styles.description}>
				We provide the best campers for your adventures in Ukraine!
			</p>
			<div className={styles.buttonContainer}>
				<button type='button'>
					<Link to='/catalog' className={styles.link}>
						Catalog
					</Link>
				</button>
			</div>
			<SimpleCarousel />
		</div>
	)
}

export default HomePage
