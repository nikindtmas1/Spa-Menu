import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyCars } from '../api/data.js';

const myTemplate = (myCars) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

        <!-- Display all records -->
        ${myCars.length == 0 ? html`
        <p class="no-cars"> You haven't listed any cars yet.</p>
        ` : myCars.map(carTemplate)}

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

export async function myListingsCars(ctx) {

    const myCars = await getMyCars();

    ctx.render(myTemplate(myCars));
}