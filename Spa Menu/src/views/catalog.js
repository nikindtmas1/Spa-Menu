import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllCars } from '../api/data.js';

const catalogTemplate = (allCars) => html`
<section id="car-listings">
    <h1>Massage List</h1>
    <div class="listings">

        <!-- Display all records -->
       ${allCars.length == 0 ? html`<p class="no-cars">No cars in database.</p>` 
       : allCars.map(carTemplate)}
       
       
        <!-- Display if there are no records -->
    </div>
</section>
`;

const carTemplate = (car) => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.type} ${car.name}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href=${`/details/${car.objectId}`} class="button-carDetails">Details</a>
        </div>
    </div>
</div>
`;

export async function catalogPage(ctx) {

    const allCars = await getAllCars();
    console.log(allCars);
    ctx.render(catalogTemplate(allCars));
}