const isContain = (arr, obj) => {
	var found = false;
	if (arr.filter((e) => e.id === obj.id).length > 0) {
		found = true;
	} else {
		found = false;
	}
	return found;
};

export default isContain;
