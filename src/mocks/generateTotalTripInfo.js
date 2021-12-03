import { MONTH_NAMES } from '../const';

const evaluateTotalPrice = (events) => events.reduce((sum, event) => {
  let eventSum = event.price;
  eventSum += event.offers.reduce((res, offer) => res + offer.price, 0);
  return sum + eventSum;
}, 0);

const eveluateDuration = (events) => {
  const startMonth = `${MONTH_NAMES[events[0].dateFrom.getMonth()]}`;
  const startDay = `${events[0].dateFrom.getDate()}`;
  const finishMonth = `${MONTH_NAMES[events[events.length - 1].dateTo.getMonth()]}`;
  const finishDay = `${events[events.length - 1].dateTo.getDate()}`;
  if (startMonth === finishMonth) {
    return `${startMonth} ${startDay} - ${finishDay}`;
  }
  return `${startMonth} ${startDay} - ${finishMonth} ${finishDay}`;
};

const eveluateRoute = (events) => {
  const tripPoints = [events[0].destination.name];
  for (let i = 1; i < events.length; i += 1) {
    const intermediatePoint = events[i].destination.name;
    if (tripPoints[tripPoints.length - 1] !== intermediatePoint) tripPoints.push(intermediatePoint);
  }
  const tripStart = tripPoints[0];
  const tripFinish = tripPoints[tripPoints.length - 1];
  if (tripPoints.length === 1) return `${tripStart}`;
  if (tripPoints.length === 2) return `${tripStart} &mdash; ${tripFinish}`;
  if (tripPoints.length === 3) return `${tripStart} &mdash; ${tripPoints[1]} &mdash;  ${tripFinish}`;
  return `${tripStart} &mdash; ... &mdash; ${tripFinish}`;
};

function TotalTripInfoObjGenerator(events) {
  this.route = eveluateRoute(events);
  this.duration = eveluateDuration(events);
  this.price = evaluateTotalPrice(events);
}

const generateTotalTripInfo = (events) => new TotalTripInfoObjGenerator(events);

export { generateTotalTripInfo, TotalTripInfoObjGenerator };
