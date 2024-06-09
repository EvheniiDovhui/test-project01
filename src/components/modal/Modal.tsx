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

	useEffect(() => {
		// Повернення фокусу на активатор модалки після закриття модалки
		if (isOpen) {
			const activeElement = document.activeElement as HTMLElement
			const modalContent = document.querySelector(
				`.${styles.modalContent}`
			) as HTMLElement

			if (modalContent && !modalContent.contains(activeElement)) {
				modalContent.focus()
			}
		}
	}, [isOpen])

	if (!isOpen) return null

	return (
		<div className={styles.modal} onClick={onClose}>
			<div
				className={styles.modalContent}
				onClick={e => e.stopPropagation()}
				tabIndex={0}
			>
				<button
					className={styles.closeBtn}
					onClick={onClose}
					aria-label='Close modal'
				>
					×
				</button>
				{children}
			</div>
		</div>
	)
}

export default Modal
