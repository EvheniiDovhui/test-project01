import React from 'react'
import { Routes, Route } from 'react-router-dom'

import styles from './App.module.css'
import HomePage from './pages/HomePage/HomePage'
import CatalogPage from './pages/CatalogPage/CatalogPage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import Navbar from './components/Navbar/Navbar'

function App() {
	return (
		<div className={styles.App}>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/catalog' element={<CatalogPage />} />
				<Route path='/favorites' element={<FavoritesPage />} />
				<Route path='*' element={<HomePage />} />
			</Routes>
		</div>
	)
}

export default App
