import config from './config';
const randomBackground = (index) => {
	const colorArray = [
		'https://dev.restadgard-utb.se/images/randomBackground2.jpg',
		'https://dev.restadgard-utb.se/images/randomBackground3.jpg',
		'https://dev.restadgard-utb.se/images/randomBackground1.jpg',
		'https://dev.restadgard-utb.se/images/randomBackground1.jpg',
		'https://dev.restadgard-utb.se/images/randomBackground4.jpg.jpg'
	];
	const arrLength = colorArray.length;
	const currentColorIndex = index % arrLength;
	return colorArray[currentColorIndex];
};

export default randomBackground;
