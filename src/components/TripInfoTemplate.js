const TripInfoDescriptionTemplate = () => `
        <div class="trip-info__main">
          <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
          <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
        </div>`;

const TripInfoCostTemplate = () => `
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
        </p>
    `;

const TripInfoTemplate = () => `
      <section class="trip-main__trip-info  trip-info">
            ${TripInfoDescriptionTemplate()}
            ${TripInfoCostTemplate()}
      </section>
    `;
export default TripInfoTemplate;
