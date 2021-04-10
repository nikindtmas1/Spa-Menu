import { html } from '../../node_modules/lit-html/lit-html.js';
import {getCarsById} from '../api/data.js';
import {editCars} from '../api/data.js';

const editTemplate = (item,onSubmit) => html`
    <section id="edit-listing">
        <div class="container">
    
            <form @submit=${onSubmit} id="edit-form">
                <h1>Edit Massage List</h1>
                <p>Please fill in this form to edit an list.</p>
                <hr>
    
                <p>Massage Type</p>
                <input type="text" placeholder="Enter Car Brand" name="type" .value=${item.type}>
    
                <p>Massage Name</p>
                <input type="text" placeholder="Enter Car Model" name="name" .value=${item.name}>
    
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" .value=${item.description}>
    
                <p>Massage Time</p>
                <input type="number" placeholder="Enter Car Year" name="time" .value=${item.time}>
    
                <p>Massage Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${item.imageUrl}>
    
                <p>Massage Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" .value=${item.price}>
    
                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>
`;

export async function editPage(ctx) {
   
    const id = ctx.params.id;
    
    const item = await getCarsById(id);
  
    ctx.render(editTemplate(item,onSubmit));

    async function onSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);
        const type = formData.get('type');
        const name = formData.get('name');
        const description = formData.get('description');
        const time = formData.get('time');
        const imageUrl = formData.get('imageUrl');
        const price = formData.get('price');

        if(time == NaN || price == NaN){
            return alert('The years end price must by positive number!');
        }

        const data = {
            type,
            name,
            description,
            time,
            imageUrl,
            price
        }

        await editCars(item.objectId,data);
        ctx.page.redirect(`/details/${item.objectId}`);

    }
}