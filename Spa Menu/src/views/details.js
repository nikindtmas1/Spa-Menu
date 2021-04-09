import { html } from '../../node_modules/lit-html/lit-html.js';
import {getCarsById} from '../api/data.js';
import {deleteCar} from '../api/data.js';

const detailsTemplate = (car,isOwner,onDelete) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Type:</span>${car.type}</li>
            <li><span>Name:</span>${car.name}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>

        ${isOwner ? html`
        <div class="listings-buttons">
            <a href=${`/edit/${car.objectId}`} class="button-list">Edit</a>
            <a @click=${onDelete} href="/all-listings" class="button-list">Delete</a>
        </div>
        ` : ''}
        
    </div>
</section>
`;

export async function detailsPage(ctx) {

    const id = ctx.params.id;
    const car = await getCarsById(id);

    const userId = sessionStorage.getItem('userId');

    ctx.render(detailsTemplate(car,car._ownerId == userId,onDelete));

    async function onDelete(){

        const confirmed = confirm('Are you sure you want to delete this car-listing!');
        if(confirmed){

            await deleteCar(car.objectId);

            ctx.page.redirect('/all-listings');
        }
    }
}