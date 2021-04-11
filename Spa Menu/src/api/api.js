export const settings = {
    host:''
};

export async function request(url,options){
    try{
    const response = await fetch(url,options);
    
    if(response.ok == false){
        const error = await response.json();
        throw new Error(error.message);
    }

    try{
    const data = await response.json();

    return data;
    }catch(error){
        return response;
    }

    }catch(error){
        alert(error.message);
        throw error
    }
}

function getOption(method = 'get',body){

    const options = {
        method,
        headers:{}
    }

    const token = sessionStorage.getItem('authToken');

    if (token != null) {

        options.headers['X-Authorization'] = token;
    }

    if (body) {

        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;

}

//univers requests
export async function get(url){
  return  await request(url,getOption());
}

export async function post(url,data){
    return await request(url,getOption('post',data));
}

export async function put(url,data){
    return await request(url,getOption('put',data));
}

export async function del(url){
    return await request(url,getOption('delete'));
}

export async function login(user){
    const result = await post(settings.host + '/37CCEB5C-F7E5-BFB6-FFAA-12879CF3A000/775F0275-7F15-48D6-87F9-41CFA9076E16/users/login', user);
   
    sessionStorage.setItem('email',result.email);
    sessionStorage.setItem('authToken',result.accessToken);
    sessionStorage.setItem('userId',result.objectId);

    return result;
}

//username,email,password, gender - options
export async function register(email,password){
    const result = await post(settings.host + '/37CCEB5C-F7E5-BFB6-FFAA-12879CF3A000/775F0275-7F15-48D6-87F9-41CFA9076E16/users/register', {email,password});//username,email,password, gender - options
  
    sessionStorage.setItem('email',result.email);
    sessionStorage.setItem('authToken',result.accessToken);
    sessionStorage.setItem('userId',result.objectId);
   
    
    return result;
}

export async function logout(){
    const result = await get(settings.host + '/37CCEB5C-F7E5-BFB6-FFAA-12879CF3A000/775F0275-7F15-48D6-87F9-41CFA9076E16/users/logout');

    sessionStorage.removeItem('email');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    
    return result;
}
