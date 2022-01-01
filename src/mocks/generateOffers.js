import { getRandomArrayItem, getRandomIntNumber } from '../utils/common';
import { OFFERS_WARIANTS, TYPES } from '../const';

let preventDuplicates = [];
function OfferObjGenerator() {
  // ToDo: Исправить или удалить когда появятся серверные данные
  // Для предотвращения дубликатов заводится отдельный массив
  // Вновь создаваемые элементы сравниваются с уже созданными
  // Присваивание каждому элементу уникального id позволило бы избежать этой проблемы
  let offer = getRandomArrayItem(OFFERS_WARIANTS);
  let hasDuplicates = preventDuplicates.find((existingOffer) => existingOffer.id === offer.id);
  while (hasDuplicates) {
    offer = getRandomArrayItem(OFFERS_WARIANTS);
    // eslint-disable-next-line no-loop-func
    hasDuplicates = preventDuplicates.find((existingOffer) => existingOffer.id === offer.id);
  }
  this.title = offer.title;
  this.price = offer.price;
  this.id = offer.id;
  this.class = offer.class;
  preventDuplicates.push(this);
}
const MAX_OFFERS_COUNT = 8;

function OfferWithTypeObjGenerator(type) {
  this.type = type;
  const offersAmount = getRandomIntNumber(MAX_OFFERS_COUNT);
  this.offers = new Array(offersAmount).fill(0).map(() => new OfferObjGenerator());
  preventDuplicates = [];
}
// ToDo: Устранить проблему описанною ниже, когда появится доступ к реальным серверным данным
// Способ исправления - удалить getEventActiveOffers, удалить offersWithTypes, вызов функции
// generateOffersForEachType производить в main и результат присваивать переменной offersForEachType

// Надо создать переменную, доступную из EditTemplate, в которой для каждого type будут свои offers
// Но так же нужна функция для генерации offers (выбранные пользователем) для event,
// а для этого доступ к переменной нужен в месте реализации функции getEventActiveOffers
/// Поэтому переменная создается здесь, а затем экспортируется
const generateOffersForEachType = () => TYPES.slice()
  .map((type) => new OfferWithTypeObjGenerator(type.name));

// Это сгенерированная константа, поэтому она находится не в const.js (фиксированные константы)
const offersForEachType = generateOffersForEachType();

const getEventActiveOffers = (type) => {
  // Находим offer с определенным type
  // На основе offer.offers генерируем массив случайных элементов
  const offerObj = offersForEachType.find((offer) => offer.type === type.name);
  preventDuplicates = [];
  const activeOffersAmount = getRandomIntNumber(offerObj.offers.length);
  return (new Array(activeOffersAmount)).fill(0).map(() => {
    let offer = getRandomArrayItem(offerObj.offers);
    let hasDuplicates = preventDuplicates.find((existingOffer) => existingOffer.id === offer.id);
    while (hasDuplicates) {
      offer = getRandomArrayItem(OFFERS_WARIANTS);
      // eslint-disable-next-line no-loop-func
      hasDuplicates = preventDuplicates.find((existingOffer) => existingOffer.id === offer.id);
    }
    preventDuplicates.push(offer);
    return {
      title: offer.title,
      price: offer.price,
      id: offer.id,
    };
  });
};

export { getEventActiveOffers, offersForEachType };
