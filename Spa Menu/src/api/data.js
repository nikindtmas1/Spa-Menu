import * as api from '../api/api.js';

const host = 'https://parseapi.back4app.com/';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//specific requests
export async function getAllMassages(){
    return await api.get(host + '/classes/spa_menu');
}

export async function getCarsById(id){
    return await api.get(host + '/classes/spa_menu/' + id);
}

// export async function getNumLikes(movieId){
//     return await api.get(host + `/data/likes?where=movieId%3D%22${movieId}%22&amp;distinct=_ownerId&amp;count`);
// }

// export async function getLikeByMovieId(movieId){
//     const userId = sessionStorage.getItem('userId');
//     return await api.get(host + `/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
// }

export async function getMyCars(){
   const userId = sessionStorage.getItem('userId');
   
    return await api.get(host + `/classes/spa_menu/` + userId);
}

export async function createCar(data){
    return await api.post(host + '/classes/spa_menu',data);
}

// export async function createLike(data){
//     return await api.post(host + '/data/likes',data);
// }

export async function editCars(id, data){
    return await api.put(host + '/classes/spa_menu/' + id, data);
}

export async function deleteCar(id){
    return await api.del(host + '/classes/spa_menu/' + id);
}

export async function searchCars(query){
    return await api.get(host + `/37CCEB5C-F7E5-BFB6-FFAA-12879CF3A000/775F0275-7F15-48D6-87F9-41CFA9076E16/data/test_menu?props=price,${query}`)//url take not from test
}