import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import FavoritesPage from './pages/FavoritesPage'
import './App.module.css'

function App() {
	return (
		<div className='App'>
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
