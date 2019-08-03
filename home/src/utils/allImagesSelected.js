const allImagesSelected = (images) => {
	var f = images.filter(function(img) {
		return img.isSelected == true;
	});
	return f.length === images.length;
};
export default allImagesSelected;
