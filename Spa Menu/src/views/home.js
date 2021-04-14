import { html } from '../../node_modules/lit-html/lit-html.js';

const homeTemplate = (userId) => html`
<section id="main">
    <div id="welcome-container">
        <h1>Welcome To Spa Menu</h1>
        <img class="hero" src="/images/relax.jpg" alt="carIntro">
        <h2>To see all massages click the link below:</h2>
        <div>
        ${userId != null ? html`
        <a href="/all-massages" class="button">All massages</a>
        ` : html`
        <a href="/all-listings" class="button">All massages</a>
        `}
            
        </div>
    </div>
</section>
`;

export async function homePage(ctx) {
const userId = sessionStorage.getItem('userId');
    ctx.render(homeTemplate(userId));
}