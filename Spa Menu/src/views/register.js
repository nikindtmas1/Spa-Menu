import { html } from '../../node_modules/lit-html/lit-html.js';
import { register as registerApi} from '../api/data.js';

const registerTemplate = (onSubmit) => html`
<section id="register">
    <div class="container">
        <form @submit=${onSubmit} id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Email</p>
            <input type="text" placeholder="Enter Email" name="email" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>
`;

export async function registerPage(ctx) {

    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('repeatPass').trim();

        if(email == '' || password == '' || repass == ''){
            return alert('All fields are required!');
        }

        if(password != repass){

            return alert('Password don\'t matches!');
        }

        await registerApi(email,password);
        ctx.setUserNav();
        event.target.reset();
        ctx.page.redirect('/all-listings');

    }

}