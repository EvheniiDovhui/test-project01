import React, { useState } from 'react'
import Slider from 'react-slick'
import Lightbox from 'react-image-lightbox'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-image-lightbox/style.css' // This only needs to be imported once in your app

import styles from './SimpleCarousel.module.css'

const SimpleCarousel: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [photoIndex, setPhotoIndex] = useState(0)

	const images = [
		'https://robbreport.com/wp-content/uploads/2023/12/RR_Best_Camper_Vans_Lead.jpg?w=1000',
		'https://cdn.vox-cdn.com/thumbor/uuRrqR7OfGH2Z7io7ziWg7y6MnY=/0x0:1396x606/1200x800/filters:focal(587x192:809x414)/cdn.vox-cdn.com/uploads/chorus_image/image/57102973/fiat_ducato_base_camper_van_designboom_header.0.jpg',
		'https://afar.brightspotcdn.com/dims4/default/d56c248/2147483647/strip/false/crop/2000x1333+0+0/resize/1486x990!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2F1d%2Fb7%2F61c9c4204132a6d43971acc997ee%2Ferv.jpg',
		'https://cdn.motor1.com/images/mgl/BXOVQw/s3/thor-unveils-electric-camper-van-concept-with-300-mile-range.jpg',
		'https://www.topgear.com/sites/default/files/2023/08/hummer-ev-earthcruiser-02.jpg',
		'https://www.escapecampervans.com/wp-content/uploads/2022/03/EscapeCamperVans_6718-2-600x353.jpg',
	]

	const settings = {
		dots: true,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		swipeToSlide: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	}

	function SampleNextArrow(props: any) {
		const { className, style, onClick } = props
		return (
			<div
				className={className}
				style={{
					...style,
					display: 'block',
					background: 'grey',
					borderRadius: '50%',
				}}
				onClick={onClick}
			/>
		)
	}

	function SamplePrevArrow(props: any) {
		const { className, style, onClick } = props
		return (
			<div
				className={className}
				style={{
					...style,
					display: 'block',
					background: 'grey',
					borderRadius: '50%',
				}}
				onClick={onClick}
			/>
		)
	}

	return (
		<div className={styles.sliderContainer}>
			<Slider {...settings}>
				{images.map((src, index) => (
					<div
						key={index}
						onClick={() => {
							setIsOpen(true)
							setPhotoIndex(index)
						}}
					>
						<img
							src={src}
							alt={`slide-${index + 1}`}
							className={styles.image}
						/>
					</div>
				))}
			</Slider>

			{isOpen && (
				<Lightbox
					mainSrc={images[photoIndex]}
					nextSrc={images[(photoIndex + 1) % images.length]}
					prevSrc={images[(photoIndex + images.length - 1) % images.length]}
					onCloseRequest={() => setIsOpen(false)}
					onMovePrevRequest={() =>
						setPhotoIndex((photoIndex + images.length - 1) % images.length)
					}
					onMoveNextRequest={() =>
						setPhotoIndex((photoIndex + 1) % images.length)
					}
				/>
			)}
		</div>
	)
}

export default SimpleCarousel
