import { html } from '../../node_modules/lit-html/lit-html.js';
import {getCarsById} from '../api/data.js';
import {editCars} from '../api/data.js';

const editTemplate = (car,onSubmit) => html`
    <section id="edit-listing">
        <div class="container">
    
            <form @submit=${onSubmit} id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>
    
                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="type" .value=${car.type}>
    
                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="name" .value=${car.name}>
    
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" .value=${car.description}>
    
                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" .value=${car.year}>
    
                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl}>
    
                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" .value=${car.price}>
    
                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>
`;

export async function editPage(ctx) {

    const id = ctx.params.objectId;
    const car = await getCarsById(id);
    ctx.render(editTemplate(car,onSubmit));

    async function onSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);
        const type = formData.get('type');
        const name = formData.get('name');
        const description = formData.get('description');
        const year = formData.get('year');
        const imageUrl = formData.get('imageUrl');
        const price = formData.get('price');

        if(year == NaN || price == NaN){
            return alert('The years end price must by positive number!');
        }

        const data = {
            type,
            name,
            description,
            year,
            imageUrl,
            price
        }

        await editCars(car.objectId,data);
        ctx.page.redirect(`/details/${car.objectId}`);

    }
}