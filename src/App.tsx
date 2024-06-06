// App.tsx
import React from 'react'

import styles from './App.module.css' // Імпортуємо CSS модуль
import Navbar from './components/Navbar/Navbar'

const App = () => {
	return (
		<div className={styles.app}>
			<Navbar />
		</div>
	)
}

export default App
