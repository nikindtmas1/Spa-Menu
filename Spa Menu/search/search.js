import { html } from '../node_modules/lit-html/lit-html.js';
import {searchCars} from '../src/api/data.js'

const searchTemplate = (data,onSearch,year) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value=${year || ''}>
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        <!-- Display all records -->
        ${data.length == 0 ? html`
        <p class="no-cars"> No results.</p>
        ` : data.map(itemTemplate)}

        <!-- Display if there are no matches -->
        
    </div>
</section>
`;

const itemTemplate = (item) => html`
<div class="listing">
    <div class="preview">
        <img src=${item.imageUrl}>
    </div>
    <h2>${item.brand} ${item.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${item.year}</h3>
            <h3>Price: ${item.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href=${`/details/${item._id}`} class="button-carDetails">Details</a>
        </div>
    </div>
</div>
`;

export async function searchPage(ctx) {
    
    const year = Number(ctx.querystring.split('=')[1]);
    const data = Number.isNaN(year) ? [] : await searchCars(year);

    ctx.render(searchTemplate(data,onSearch,year));

    function onSearch(){
        const query = Number(document.getElementById('search-input').value);
        ctx.page.redirect('/search?query=' + query);
    }
}