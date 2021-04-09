import { html } from '../../node_modules/lit-html/lit-html.js';
import {createCar} from '../api/data.js';

const createTemplate = (onSubmit) => html`
<section id="create-listing">
    <div class="container">
        <form @submit=${onSubmit} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Massage Type</p>
            <input type="text" placeholder="Enter Car Brand" name="type">

            <p>Massage Name</p>
            <input type="text" placeholder="Enter Car Model" name="name">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Massage Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Massage Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Massage Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
`;

export async function createPage(ctx) {

    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);
        const type = formData.get('type');
        const name = formData.get('name');
        const description = formData.get('description');
        const year = Number(formData.get('year'));
        const imageUrl = formData.get('imageUrl');
        const price = Number(formData.get('price'));

        if(type == '' || name == '' || description == '' || year == '' || imageUrl == '' || price == ''){
            return alert('All fields are required!');
        }

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


            await createCar(data);
            event.target.reset();
            ctx.page.redirect('/all-listings');
    }

}