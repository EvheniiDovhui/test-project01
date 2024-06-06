import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
	Sidebar,
	Menu,
	MenuItem,
	SubMenu,
	menuClasses,
} from 'react-pro-sidebar'
import { Select } from 'antd'

const SidebarComponent = () => {
	const [locations, setLocations] = useState<string[]>([])
	const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
	const [campers, setCampers] = useState<Camper[]>([])
	const [selectedCamper, setSelectedCamper] = useState<Camper | null>(null)

	useEffect(() => {
		const fetchLocations = async () => {
			try {
				const response = await axios.get(
					'https://6661704b63e6a0189fe9d8c1.mockapi.io/api/v1/campers'
				)

				const uniqueLocations = response.data
					.map((camper: Camper) => camper.location)
					.filter(
						(value: string, index: number, self: string[]) =>
							self.indexOf(value) === index
					)
				setLocations(uniqueLocations)
			} catch (error) {
				console.error('Error fetching locations:', error)
			}
		}

		fetchLocations()
	}, [])

	useEffect(() => {
		const fetchCampers = async () => {
			try {
				const response = await axios.get(
					'https://6661704b63e6a0189fe9d8c1.mockapi.io/api/v1/campers'
				)
				const filteredCampers = response.data.filter(
					(camper: Camper) => camper.location === selectedLocation
				)
				setCampers(filteredCampers)
			} catch (error) {
				console.error('Error fetching campers:', error)
			}
		}

		if (selectedLocation) {
			fetchCampers()
		} else {
			setCampers([])
		}
	}, [selectedLocation])

	const handleLocationChange = (value: string) => {
		setSelectedLocation(value)
		setSelectedCamper(null)
	}

	const handleCamperSelect = (camper: Camper) => {
		setSelectedCamper(camper)
	}

	return (
		<div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
			<Sidebar
				image='https://i.pinimg.com/736x/8e/6c/06/8e6c064f57f94838263d7ba9ad80f353.jpg'
				rootStyles={{
					['& > .' + menuClasses.button]: {
						backgroundColor: '#9f0099',
						color: '#ffffff',
						'&:hover': {
							backgroundColor: '#9f0099',
						},
					},
					['.' + menuClasses.subMenuContent]: {
						backgroundColor: 'transparent',
					},
				}}
			>
				<Menu>
					<SubMenu label='Location'>
						<Select
							style={{ width: 200 }}
							onChange={handleLocationChange}
							placeholder='Select location'
						>
							{locations.map(location => (
								<Select.Option key={location} value={location}>
									{location}
								</Select.Option>
							))}
						</Select>
					</SubMenu>
					<MenuItem> Documentation </MenuItem>
					<MenuItem> Calendar </MenuItem>
				</Menu>
			</Sidebar>
			<div>
				{selectedCamper && (
					<div>
						<h2>Selected Camper: {selectedCamper.name}</h2>
						<p>
							<strong>Location:</strong> {selectedCamper.location}
						</p>
						<p>
							<strong>Description:</strong> {selectedCamper.description}
						</p>
						{selectedCamper.gallery && (
							<div>
								<h3>Gallery</h3>
								{selectedCamper.gallery.map(image => (
									<img
										key={image}
										src={image}
										alt='Camper Gallery'
										style={{ maxWidth: '200px', margin: '5px' }}
									/>
								))}
							</div>
						)}
						{selectedCamper.reviews && (
							<div>
								<h3>Reviews</h3>
								<ul>
									{selectedCamper.reviews.map(review => (
										<li key={review.reviewer_name}>
											<strong>{review.reviewer_name}</strong> -{' '}
											{review.reviewer_rating}/5
											<br />
											{review.comment}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				)}
				{!selectedCamper && (
					<div>
						<h2>Campers in {selectedLocation || 'All Locations'}</h2>
						<ul>
							{campers.map(camper => (
								<li key={camper._id}>
									<h3>{camper.name}</h3>
									<p>
										<strong>Location:</strong> {camper.location}
									</p>
									<button onClick={() => handleCamperSelect(camper)}>
										Select Camper
									</button>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}

interface Camper {
	_id: string
	name: string
	location: string
	description: string
	gallery?: string[]
	reviews?: {
		reviewer_name: string
		reviewer_rating: number
		comment: string
	}[]
}

export default SidebarComponent
