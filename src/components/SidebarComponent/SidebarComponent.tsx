import React, { useEffect, useState } from 'react'
import { Sidebar, Menu, SubMenu, menuClasses } from 'react-pro-sidebar'
import { Select, Checkbox, Radio } from 'antd'
import styles from './SidebarComponent.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { Camper, fetchAdverts } from '../../redux/slices/advertsSlice'
import { RootState } from '../../redux/store'
import { useSearchParams } from 'react-router-dom'

interface SidebarComponentProps {
	locations: string[]
	onLocationChange: (value: string | null) => void
	onEquipmentChange: (value: string[]) => void
	onVehicleTypeChange: (value: string | null) => void
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({
	locations,
	onLocationChange,
	onEquipmentChange,
	onVehicleTypeChange,
}) => {
	const dispatch = useDispatch()

	let [searchParams, setSearchParams] = useSearchParams()
	// Завантаження оголошень при монтуванні компонента
	useEffect(() => {
		dispatch(fetchAdverts() as any)
	}, [dispatch])

	// Вибірка даних зі стану за допомогою useSelector
	const adverts = useSelector((state: RootState) => state.adverts.items)

	// Стан для відстеження фільтрованих оголошень
	const [filteredAdverts, setFilteredAdverts] = useState<Camper[]>([])

	// Стан для зберігання вибраних обладнань
	const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])

	// Функція фільтрації оголошень
	const filterAdverts = (
		location: string | null,
		equipment: string[],
		vehicleType: string | null
	) => {
		console.log('Filtering adverts with:', { location, equipment, vehicleType })
		if (!adverts) return []

		return adverts.filter((advert: Camper) => {
			const matchesLocation = location ? advert.location === location : true
			const matchesVehicleType = vehicleType
				? advert.form === vehicleType
				: true

			// Перевірка наявності кожного обладнання у деталях оголошення
			const matchesEquipment = equipment.every(e => {
				const details = advert.details
				return details && details[e as keyof typeof details] === 1
			})

			const matchesAll =
				matchesLocation && matchesVehicleType && matchesEquipment
			console.log('Advert:', advert, 'Matches:', matchesAll)
			return matchesAll
		})
	}

	// Обробник змін у фільтрах
	const handleFiltersChange = (
		location: string | null,
		equipment: string[],
		vehicleType: string | null
	) => {
		const filtered = filterAdverts(location, equipment, vehicleType)
		setFilteredAdverts(filtered)
	}

	// Застосувати фільтри за замовчуванням під час завантаження компонента
	useEffect(() => {
		handleFiltersChange(null, selectedEquipment, null)
	}, [adverts])

	// Показати заглушку, якщо дані locations ще не завантажено
	if (!locations || locations.length === 0) {
		return <div>Loading...</div>
	}

	return (
		<div className={styles.container}>
			<div className={styles.sidebarContainer}>
				<Sidebar
					style={{
						backgroundColor: 'transparent',
						border: '1px solid #ddd',
						borderRadius: '8px',
						boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
						position: 'sticky',
						top: '20px', // Встановіть бажаний відступ зверху
					}}
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
								style={{
									width: 200,
								}}
								onChange={(value: string) => {
									onLocationChange(value)
									handleFiltersChange(value, selectedEquipment, null)
								}}
								placeholder='Select location'
							>
								{locations.map(location => (
									<Select.Option key={location} value={location}>
										{location}
									</Select.Option>
								))}
							</Select>
						</SubMenu>
						<SubMenu label='Vehicle equipment'>
							<Checkbox.Group
								options={[
									'airConditioner',
									'bathroom',
									'kitchen',
									'TV',
									'shower',
								]}
								value={selectedEquipment}
								onChange={(values: string[]) => {
									setSelectedEquipment(values)
									onEquipmentChange(values)
									handleFiltersChange(null, values, null)
								}}
							/>
						</SubMenu>
						<SubMenu label='Vehicle type'>
							<Radio.Group
								style={{
									display: 'flex',
									flexDirection: 'column',
									marginLeft: 10,
								}}
								onChange={e => {
									setSearchParams({ type: e.target.value })
									onVehicleTypeChange(e.target.value)
									handleFiltersChange(null, selectedEquipment, e.target.value)
								}}
							>
								<Radio value='panelTruck'>Van</Radio>
								<Radio value='fullyIntegrated'>Fully Integrated</Radio>
								<Radio value='Alcove'>Alcove</Radio>
							</Radio.Group>
						</SubMenu>
					</Menu>
					<div className={styles.resetButtonContainer}>
						<button
							className={styles.resetButton}
							onClick={() => {
								setSelectedEquipment([])
								onEquipmentChange([])
								onLocationChange(null)
								onVehicleTypeChange(null)
								handleFiltersChange(null, [], null)
							}}
						>
							Reset Filters
						</button>
					</div>
				</Sidebar>
			</div>
		</div>
	)
}

export default SidebarComponent
