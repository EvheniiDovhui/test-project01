import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar: React.FC = () => {
	return (
		<nav className={styles.navbar}>
			<ul>
				<li>
					<Link to='/' className={styles.navlink}>
						Home
					</Link>
				</li>
				<li>
					<Link to='/catalog' className={styles.navlink}>
						Catalog
					</Link>
				</li>
				<li>
					<Link to='/favorites' className={styles.navlink}>
						Favorites
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
