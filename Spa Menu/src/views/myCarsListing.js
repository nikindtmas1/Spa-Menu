import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyCars } from '../api/data.js';

const myTemplate = (myMassages) => html`
<section id="my-listings">
    <h1>My massage list</h1>
    <div class="listings">

        <!-- Display all records -->
        ${myMassages.length == 0 ? html`
        <p class="no-cars"> You haven't listed any massage yet.</p>
        ` : myMassages.map(carTemplate)}

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
            <h3>Time: ${item.time}</h3>
            <h3>Price: ${item.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href=${`/details/${item.objectId}`} class="button-carDetails">Details</a>
        </div>
    </div>
</div>
`;

export async function myListingsCars(ctx) {

    const myMassages = await getMyCars();
    console.log(myMassages);

    ctx.render(myTemplate(myMassages));
}