import React from 'react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			onClose()
		}
	}

	if (!isOpen) return null

	return (
		<div className='modal' onClick={onClose}>
			<div className='modal-content' onClick={e => e.stopPropagation()}>
				<button className='close-btn' onClick={onClose}>
					×
				</button>
				{children}
			</div>
		</div>
	)
}

export default Modal
