import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import FavoritesPage from './pages/FavoritesPage'
import { Provider } from 'react-redux'
import store from './redux/store'
import './index.css'

const container = document.getElementById('root')

if (container) {
	const root = createRoot(container)

	root.render(
		<Provider store={store}>
			<Router>
				<App />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/catalog' element={<CatalogPage />} />
					<Route path='/favorites' element={<FavoritesPage />} />
					<Route path='*' element={<HomePage />} />{' '}
				</Routes>
			</Router>
		</Provider>
	)
} else {
	console.error('Root element not found')
}
