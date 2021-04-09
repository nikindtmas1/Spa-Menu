import { html } from '../../node_modules/lit-html/lit-html.js';
import {login as loginApi} from '../api/data.js';

const loginTemplate = (onSubmit) => html`
<section id="login">
    <div class="container">
        <form @submit=${onSubmit} id="login-form" action="#" method="post">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Email</p>
            <input placeholder="Enter Email" name="email" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>
`;

export async function loginPage(ctx) {

    ctx.render(loginTemplate(onSubmit));

   async function onSubmit(event){

        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        await loginApi(email,password);
        ctx.setUserNav();
        ctx.page.redirect('/all-listings');
    }

}