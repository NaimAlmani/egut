import config from './config';
const changeToGallery = (images) => {
	const result = [];
	images.map((img) => {
		result.push({
			id: img.id,
			src: config.imagesPath + img.path,
			thumbnail: config.imagesPath + img.path,
			thumbnailWidth: img.width,
			thumbnailHeight: img.height,
			isSelected: img.isSelected || false,
			caption: img.title,
			description: img.description
		});
	});
	return result;
};
export default changeToGallery;
