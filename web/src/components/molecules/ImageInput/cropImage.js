const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 */
export default async function getCroppedImg(imageSrc, pixelCrop, ratio) {
  const image = await createImage(imageSrc);

  const canvas = document.createElement('canvas');

  let newWidth = Math.round((pixelCrop.width / 100) * image.width);
  let newHeight = Math.round((pixelCrop.height / 100) * image.height);

  // find nearest newWidth neighbor that is a multiple of 3
  // https://www.geeksforgeeks.org/multiple-of-x-closest-to-n/
  newWidth += Math.floor(ratio.width / 2);
  newWidth -= newWidth % ratio.width;

  // if this new width is greater than initial image width, find the nearest multiple of 3
  // that is smaller than this width
  while (newWidth > image.width) newWidth -= ratio.width;

  // based on this new width, the new height should be new_width / 3 * 4
  // if this new height is greater than image height, then start again
  newHeight = (newWidth / ratio.width) * ratio.height;
  while (newHeight > image.height) {
    newWidth -= ratio.width;
    newHeight = (newWidth / ratio.width) * ratio.height;
  }

  canvas.width = newWidth;
  canvas.height = newHeight;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    (pixelCrop.x / 100) * image.width,
    (pixelCrop.y / 100) * image.height,
    newWidth,
    newHeight,
    0,
    0,
    newWidth,
    newHeight,
  );

  // As Base64 string
  return canvas.toDataURL('image/jpeg');
}
