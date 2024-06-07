import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { fetchAdverts } from '../redux/reducers/advertsSlice'
import { AppDispatch } from '../redux/reducers/store'
import styles from './CatalogPage.module.css'
import SidebarComponent from '../components/SidebarComponent/SidebarComponent'
import CamperList from '../components/CamperList/CamperList'

const CatalogPage: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const [location, setLocation] = useState<string | null>(null)
	const [equipment, setEquipment] = useState<string[]>([])
	const [vehicleType, setVehicleType] = useState<string | null>(null)

	useEffect(() => {
		dispatch(fetchAdverts())
	}, [dispatch])

	return (
		<div className={styles.catalogPage}>
			<h1>Catalog of Campers</h1>
			<SidebarComponent
				locations={['Kyiv', 'Lviv', 'Odessa']} // Приклад локацій
				onLocationChange={setLocation}
				onEquipmentChange={setEquipment}
				onVehicleTypeChange={setVehicleType}
			/>
			<CamperList
				location={location}
				equipment={equipment}
				vehicleType={vehicleType}
			/>
		</div>
	)
}

export default CatalogPage
