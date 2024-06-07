import React from 'react'
import { Select } from 'antd'

interface LocationFilterProps {
	locations: string[]
	onChange: (value: string) => void
}

const LocationFilter: React.FC<LocationFilterProps> = ({
	locations,
	onChange,
}) => {
	return (
		<Select
			style={{ width: 200 }}
			onChange={onChange}
			placeholder='Select location'
		>
			{locations.map(location => (
				<Select.Option key={location} value={location}>
					{location}
				</Select.Option>
			))}
		</Select>
	)
}

export default LocationFilter
