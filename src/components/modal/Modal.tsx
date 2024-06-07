import React, { useEffect } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [onClose])

	if (!isOpen) return null

	return (
		<div className={styles.modal} onClick={onClose}>
			<div className={styles.modalContent} onClick={e => e.stopPropagation()}>
				<button className={styles.closeBtn} onClick={onClose}>
					×
				</button>
				{children}
			</div>
		</div>
	)
}

export default Modal
