const randomColor = (index) => {
	const colorArray = [
		'rgba(253,146,223,0.5)',
		'rgba(168,160,255,0.5)',
		'rgba(50,203,194,0.5)',
		'rgba(110,163,253,0.5)',
		'rgba(255,151,151,0.5)'
	];
	const arrLength = colorArray.length;
	const currentColorIndex = index % arrLength;
	return colorArray[currentColorIndex];
};

export default randomColor;
