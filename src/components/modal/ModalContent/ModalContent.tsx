// ModalContent.tsx
import React, { useState } from 'react'
import styles from './ModalContent.module.css'

interface ModalContentProps {
	name: string
	description: string
	advert: any
}

const ModalContent: React.FC<ModalContentProps> = ({
	name,
	description,
	advert,
}) => {
	const [isExpanded, setIsExpanded] = useState(false)

	const handleToggleExpand = () => {
		setIsExpanded(!isExpanded)
	}

	return (
		<div className={styles.modalContent}>
			<div className={styles.header}>
				<h2 className={styles.title}>{name}</h2>
				<div>
					<span className={styles.reviewCount}>
						⭐ {advert.rating} ({advert.reviews.length} Reviews)
					</span>
					<span className={styles.location}>{advert.location}</span>
				</div>
				<span className={styles.price}>€{advert.price.toFixed(2)}</span>
			</div>
			<div className={styles.gallery}>
				{advert.gallery.map((image: string, index: number) => (
					<img key={index} src={image} alt={name} className={styles.image} />
				))}
			</div>
			<p
				className={`${styles.description} ${isExpanded ? styles.expanded : ''}`}
			>
				{description}
			</p>
			<button onClick={handleToggleExpand} className={styles.toggleButton}>
				{isExpanded ? 'Show less' : 'Show more'}
			</button>
			<div className={styles.tabs}>
				<button className={`${styles.tab} ${styles.active}`}>Features</button>
				<button className={styles.tab}>Reviews</button>
			</div>

			<div className={styles.featuresContent}>
				<div className={styles.features}>{advert.adults} adults</div>
				<div className={styles.features}>{advert.children} children</div>
			</div>

			<div className={styles.reviewsContent}>
				<div className={styles.reviews}>
					{advert.reviews.map((review: any, index: number) => (
						<div key={index} className={styles.review}>
							<div className={styles.reviewHeader}>
								<span className={styles.reviewAuthor}>
									{review.reviewer_name}
								</span>
								<span className={styles.reviewRating}>
									{'⭐'.repeat(review.reviewer_rating)}
								</span>
							</div>
							<p className={styles.reviewText}>{review.comment}</p>
						</div>
					))}
				</div>
				<div className={styles.bookingForm}>
					<h3>Book your campervan now</h3>
					<p>Stay connected! We are always ready to help you.</p>
					<form>
						<input type='text' placeholder='Name' className={styles.input} />
						<input type='email' placeholder='Email' className={styles.input} />
						<input
							type='date'
							placeholder='Booking date'
							className={styles.input}
						/>
						<textarea placeholder='Comment' className={styles.input} />
						<button type='submit' className={styles.submitButton}>
							Send
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default ModalContent
