import React from 'react'
import { Checkbox } from 'antd'

const equipmentOptions = ['AC', 'TV', 'Kitchen']

const VehicleEquipmentFilter: React.FC = () => {
	return (
		<Checkbox.Group>
			{equipmentOptions.map(option => (
				<Checkbox key={option} value={option}>
					{option}
				</Checkbox>
			))}
		</Checkbox.Group>
	)
}

export default VehicleEquipmentFilter
