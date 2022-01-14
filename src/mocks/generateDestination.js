import { Destination } from '../const';
import { getRandomArrayItem, getRandomIntNumber } from '../utils/common';

const getRandomPictures = () => {
  const picturesAmount = getRandomIntNumber(Destination.PHOTOS.length - 1);
  const picturesArr = new Array(picturesAmount);
  return picturesArr
    .fill(0)
    .map(() => Destination.PHOTOS[getRandomIntNumber(Destination.PHOTOS.length - 1)]);
};

function DestinationObjGenerator(place) {
  this.description = getRandomArrayItem(Destination.DESCRIPTIONS);
  this.place = place;
  this.pictures = getRandomPictures();
}

const GENERATED_DESTINATIONS = Destination.PLACES
  .map((place) => new DestinationObjGenerator(place));

export { GENERATED_DESTINATIONS, DestinationObjGenerator };
