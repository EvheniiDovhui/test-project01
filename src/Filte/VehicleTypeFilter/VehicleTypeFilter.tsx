import React from 'react'
import { Radio } from 'antd'

const VehicleTypeFilter: React.FC = () => {
	return (
		<Radio.Group>
			<Radio value='Van'>Van</Radio>
			<Radio value='Motorhome'>Motorhome</Radio>
		</Radio.Group>
	)
}

export default VehicleTypeFilter
