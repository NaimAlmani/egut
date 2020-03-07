import config from './../../utils/config';
import isEmpty from './../../validation/is-empty';
const changeToGallery = images => {
  const result = [];
  images.map(img => {
    result.push({
      id: img.id,
      src: config.imagesPath + img.path,
      thumbnail: config.imagesPath + img.path,
      thumbnailWidth: img.width,
      thumbnailHeight: img.height,
      isSelected: img.isSelected || false,
      caption: isEmpty(img.activity) ? img.title : img.activity.name,
      description: img.description,
      activity_id: !isEmpty(img.activity) ? img.activity.id : img.id
    });
  });
  return result;
};
export default changeToGallery;
