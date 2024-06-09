import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './CatalogPage.module.css'

import { fetchAdverts, selectLocations } from '../../redux/slices/advertsSlice'
import { AppDispatch, RootState } from '../../redux/store'
import SidebarComponent from '../../components/SidebarComponent/SidebarComponent'
import CamperList from '../../components/CamperList/CamperList'

const CatalogPage: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const [location, setLocation] = useState<string | null>(null)
	const [equipment, setEquipment] = useState<string[]>([])
	const [vehicleType, setVehicleType] = useState<string | null>(null)

	useEffect(() => {
		dispatch(fetchAdverts())
	}, [dispatch])

	// Вибірка даних зі стану за допомогою мемоізованого селектора
	const locations = useSelector((state: RootState) => selectLocations(state))

	return (
		<div className={styles.catalogPage}>
			<SidebarComponent
				locations={locations} // Передача масиву локацій до SidebarComponent
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
