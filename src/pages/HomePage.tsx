import React from 'react'
import SidebarComponent from '../components/SidebarComponent/SidebarComponent'

const HomePage: React.FC = () => {
	return (
		<div>
			<div>
				<h1>Welcome to the Camper Rental Service</h1>
				<p>Here you can find the best campers for your next adventure!</p>
			</div>
			<SidebarComponent />
		</div>
	)
}

export default HomePage
