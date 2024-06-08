import React, { useEffect, useState } from 'react'
import { Sidebar, Menu, SubMenu, menuClasses } from 'react-pro-sidebar'
import { Select, Checkbox, Radio } from 'antd'
import styles from './SidebarComponent.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/reducers/store'
import { fetchAdverts, Camper } from '../../redux/reducers/advertsSlice'

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
		if (!adverts) return []

		return adverts.filter((advert: Camper) => {
			const matchesLocation = location ? advert.location === location : true
			const matchesVehicleType = vehicleType
				? advert.form === vehicleType
				: true

			// Перевірка наявності кожного обладнання у деталях оголошення
			const matchesEquipment = equipment.every(e => {
				const details = advert.details
				return details && details[e as keyof typeof details] === true
			})

			return matchesLocation && matchesVehicleType && matchesEquipment
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
							options={['AC', 'Automatic', 'Kitchen', 'TV', 'Shower/WC']}
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
							onChange={e => {
								onVehicleTypeChange(e.target.value)
								handleFiltersChange(null, selectedEquipment, e.target.value)
							}}
						>
							<Radio value='Van'>Van</Radio>
							<Radio value='Fully Integrated'>Fully Integrated</Radio>
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
	)
}

export default SidebarComponent
