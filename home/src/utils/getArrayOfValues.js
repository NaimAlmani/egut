const getArrayOfValues = (arr, key) => {
	return arr.map((el) => {
		return el[key];
	});
};
export default getArrayOfValues;
