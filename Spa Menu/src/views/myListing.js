import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllMassages } from '../api/data.js';

const myTemplate = (myMassages) => html`
<section id="my-listings">
    <h1>My Massage List</h1>
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
            <h3>Time: ${item.time} minute</h3>
            <h3>Price: ${item.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href=${`/details/${item.objectId}`} class="button-carDetails">Details</a>
        </div>
    </div>
</div>
`;

export async function myListingsMassages(ctx) {

    const myMassages = await getAllMassages();
    const userId = sessionStorage.getItem('userId');
   
    const result =  myMassages.results;
    const filtered = result.filter(result => result.ownerId == userId);
   
    const sorted = filtered.sort((a,b) => a.name.localeCompare(b.name));

    ctx.render(myTemplate(sorted));
}