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

const carTemplate = (item) => html`
<div class="listing">
    <div class="preview">
        <img src=${item.imageUrl}>
    </div>
    <h2>${item.type} ${item.name}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Time: ${item.time} minute</h3>
            <h3>Price: ${item.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href=${`/details/${item.objectId}`} class="button-carDetails">Details</a>
        </div>
    </div>
</div>
`;

export async function catalogPage(ctx) {

    const allCars = await getAllCars();
    
    ctx.render(catalogTemplate(allCars));
}