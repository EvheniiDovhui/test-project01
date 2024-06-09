declare module 'react-slick' {
	import * as React from 'react'

	interface SliderProps {
		dots?: boolean
		infinite?: boolean
		speed?: number
		slidesToShow?: number
		slidesToScroll?: number
		[key: string]: any
	}

	export default class Slider extends React.Component<SliderProps> {}
}
