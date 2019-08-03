const randomBackground = (index) => {
	const colorArray = [
		'https://www.ttela.se/image/policy:1.1328395:1463563873/restad-gard.jpg?f=Wide&w=1024&$p$f$w=23c2251',
		'https://www.hemhyra.se/app/uploads/2015/05/restad-gard-1-webb-2-1080x675.jpg',
		'https://static-cdn.sr.se/sida/images/125/3042432_1200_675.jpg',
		'http://restadgard.se/wp-content/uploads/bb-plugin/cache/RestadGard-panorama.jpg'
	];
	const arrLength = colorArray.length;
	const currentColorIndex = index % arrLength;
	return colorArray[currentColorIndex];
};

export default randomBackground;
