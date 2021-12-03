const TripInfoDescriptionTemplate = (route, duration) => `
        <div class="trip-info__main">
          <h1 class="trip-info__title">${route}</h1>
          <p class="trip-info__dates">${duration}</p>
        </div>`;

const TripInfoCostTemplate = (price) => `
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
        </p>
    `;

const TotalTripInfoTemplate = (totalTripInfo) => {
  const { route, price, duration } = totalTripInfo;

  return `
    <section class="trip-main__trip-info  trip-info">
      ${TripInfoDescriptionTemplate(route, duration)}
      ${TripInfoCostTemplate(price)}
    </section>`;
};
export default TotalTripInfoTemplate;
