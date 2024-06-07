import React, { useEffect } from 'react'
import { Sidebar, Menu, SubMenu, menuClasses } from 'react-pro-sidebar'
import { Select, Checkbox, Radio } from 'antd'
import styles from './SidebarComponent.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/reducers/store'
import { fetchAdverts } from '../../redux/reducers/advertsSlice'
import { Camper } from '../../redux/reducers/advertsSlice'

interface SidebarComponentProps {
	onLocationChange: (value: string) => void
	onEquipmentChange: (value: string[]) => void
	onVehicleTypeChange: (value: string) => void
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({
	onLocationChange,
	onEquipmentChange,
	onVehicleTypeChange,
}) => {
	const dispatch = useDispatch()

	useEffect(() => {
		// Завантаження оголошень при монтуванні компонента
		dispatch(fetchAdverts())
	}, [dispatch])

	// Вибірка даних зі стану за допомогою useSelector
	const locations = useSelector((state: RootState) =>
		state.adverts.items.map((ad: Camper) => ad.location)
	)

	// Показати заглушку, якщо дані locations ще не завантажено
	if (locations.length === 0) {
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
							onChange={onLocationChange}
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
						<Checkbox.Group onChange={onEquipmentChange}>
							<Checkbox value='AC'>AC</Checkbox>
							<Checkbox value='TV'>TV</Checkbox>
							<Checkbox value='Kitchen'>Kitchen</Checkbox>
						</Checkbox.Group>
					</SubMenu>
					<SubMenu label='Vehicle type'>
						<Radio.Group onChange={e => onVehicleTypeChange(e.target.value)}>
							<Radio value='Van'>Van</Radio>
							<Radio value='Motorhome'>Motorhome</Radio>
						</Radio.Group>
					</SubMenu>
				</Menu>
			</Sidebar>
		</div>
	)
}

export default SidebarComponent
