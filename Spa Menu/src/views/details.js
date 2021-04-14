import { html } from '../../node_modules/lit-html/lit-html.js';
import {getMassageById} from '../api/data.js';
import {deleteMassage} from '../api/data.js';

const detailsTemplate = (item,isOwner,onDelete) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${item.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Type:</span>${item.type}</li>
            <li><span>Name:</span>${item.name}</li>
            <li><span>Time:</span>${item.time} minute</li>
            <li><span>Price:</span>${item.price} $</li>
        </ul>

        <p class="description-para">${item.description}</p>

        ${isOwner ? html`
        <div class="listings-buttons">
            <a href=${`/edit/${item.objectId}`} class="button-list">Edit</a>
            <a @click=${onDelete} href='/all-massages' class="button-list">Delete</a>
        </div>
        ` : ''}
        
    </div>
</section>
`;

export async function detailsPage(ctx) {

    const id = ctx.params.id;

    const item = await getMassageById(id);
 
    const userId = sessionStorage.getItem('userId');
    
    
    ctx.render(detailsTemplate(item,item.ownerId == userId,onDelete));

    async function onDelete(){

        const confirmed = confirm('Are you sure you want to delete this car-listing!');
        if(confirmed){

            await deleteMassage(item.objectId);

            ctx.page.redirect('/all-massages');
        }
    }
}