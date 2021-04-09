import { html } from '../../node_modules/lit-html/lit-html.js';

const homeTemplate = () => html`
<section id="main">
    <div id="welcome-container">
        <h1>Welcome To Spa Menu</h1>
        <img class="hero" src="/images/relax.jpg" alt="carIntro">
        <h2>To see all massages click the link below:</h2>
        <div>
            <a href="/all-listings" class="button">All massages</a>
        </div>
    </div>
</section>
`;

export async function homePage(ctx) {

    ctx.render(homeTemplate());
}