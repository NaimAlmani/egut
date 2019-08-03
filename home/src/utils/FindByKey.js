const FindByKey = (arr, val, key) => {
	return arr.filter((c) => c[key] === val);
};

export default FindByKey;
