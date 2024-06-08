import React from 'react'
import { Checkbox } from 'antd'

interface VehicleEquipmentFilterProps {
	selectedValues: string[]
	onChange: (values: string[]) => void
}

const equipmentOptions = ['AC', 'TV', 'Kitchen']

const VehicleEquipmentFilter: React.FC<VehicleEquipmentFilterProps> = ({
	selectedValues,
	onChange,
}) => {
	const handleChange = (checkedValues: string[]) => {
		onChange(checkedValues)
	}

	return (
		<Checkbox.Group value={selectedValues} onChange={handleChange}>
			{equipmentOptions.map(option => (
				<Checkbox key={option} value={option}>
					{option}
				</Checkbox>
			))}
		</Checkbox.Group>
	)
}

export default VehicleEquipmentFilter
