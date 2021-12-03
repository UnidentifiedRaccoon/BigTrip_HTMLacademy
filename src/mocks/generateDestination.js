import { Destination } from '../const';
import { getRandomArrayItem, getRandomIntNumber } from '../utils';

const getRandomPictures = () => {
  const picturesAmount = getRandomIntNumber(Destination.PHOTOS.length - 1);
  const picturesArr = new Array(picturesAmount);
  return picturesArr
    .fill(0)
    .map(() => Destination.PHOTOS[getRandomIntNumber(Destination.PHOTOS.length - 1)]);
};

function DestinationObjGenerator() {
  this.description = getRandomArrayItem(Destination.DESCRIPTIONS);
  this.name = getRandomArrayItem(Destination.PLACES);
  this.pictures = getRandomPictures();
}

const generateDestination = () => new DestinationObjGenerator();

export { generateDestination, DestinationObjGenerator };
