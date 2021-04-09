import { html } from '../../node_modules/lit-html/lit-html.js';
import {createCar} from '../api/data.js';

const createTemplate = (onSubmit) => html`
<section id="create-listing">
    <div class="container">
        <form @submit=${onSubmit} id="create-form">
            <h1>Create Massage Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Massage Type</p>
            <input type="text" placeholder="Enter Massage Type" name="type">

            <p>Massage Name</p>
            <input type="text" placeholder="Enter Massage Name" name="name">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Massage Year</p>
            <input type="number" placeholder="Enter Massage Time" name="time">

            <p>Massage Image</p>
            <input type="text" placeholder="Enter Massage Image" name="imageUrl">

            <p>Massage Price</p>
            <input type="number" placeholder="Enter Massage Price" name="price">

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
        const time = Number(formData.get('time'));
        const imageUrl = formData.get('imageUrl');
        const price = Number(formData.get('price'));

        if(type == '' || name == '' || description == '' || time == '' || imageUrl == '' || price == ''){
            return alert('All fields are required!');
        }

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


            await createCar(data);
            event.target.reset();
            ctx.page.redirect('/all-listings');
    }

}