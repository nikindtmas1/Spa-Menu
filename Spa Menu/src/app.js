import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import {logout as logoutAp} from './api/data.js';

import * as api from './api/data.js';

import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/createListing.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myListingsMassages } from './views/myListing.js';
import { searchPage } from '../search/search.js';
import { searchPageTime } from '../search/searchByTime.js';
import { searchPageType } from '../search/searchByType.js';
import { catalogLoggedPage } from './views/catalogLogged.js';


window.api = api;

const main = document.getElementById('site-content');

page('/',midWeare,homePage);
page('/login',midWeare,loginPage);
page('/register',midWeare,registerPage);
page('/all-listings',midWeare,catalogPage);
page('/all-massages',midWeare,catalogLoggedPage);
page('/create',midWeare,createPage);
page('/details/:id',midWeare,detailsPage);
page('/edit/:id',midWeare,editPage);
page('/myCarsList',midWeare,myListingsMassages);
page('/search',midWeare,searchPage);
page('/searchTime',midWeare,searchPageTime);
page('/searchType',midWeare,searchPageType);


setUserNav();
page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logoutAp();
    setUserNav();
    page.redirect('/');
});

function midWeare(ctx,next){

    ctx.render = (content) => render(content,main);
    ctx.setUserNav = setUserNav;
    next();

}

function setUserNav(){

    const userId = sessionStorage.getItem('userId');
    
    const username = sessionStorage.getItem('username');
    

    if(userId != null){
        
        document.getElementById('guest').style.display = 'none';
        document.getElementById('profile').style.display = '';
        document.getElementById('userId').textContent = `Welcome ${username}`;
        document.getElementById('logged-user').style.display = '';
        document.getElementById('unlogged-user').style.display = 'none';
    }else{

        document.getElementById('guest').style.display = '';
        document.getElementById('profile').style.display = 'none';
        document.getElementById('logged-user').style.display = 'none';
        document.getElementById('unlogged-user').style.display = '';

    }

}

