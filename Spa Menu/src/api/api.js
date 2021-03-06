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
        headers:{
            'X-Parse-Application-Id': 'GwOuRx9b2yahh6b9Ijtko0EqBnfxxTIWUWTcyBDX',
            'X-Parse-REST-API-Key': 'WhpWvVDJz4iOciZNlUpqRsvr19DIUCEG7n5ANMvS'
        }
    }

    const token = sessionStorage.getItem('authToken');

    if (token != null) {

        options.headers['X-Parse-Session-Token'] = token;
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

export async function login(username,password){
    const result = await post(settings.host + '/login', {username,password});
   
    sessionStorage.setItem('username',result.username);
    sessionStorage.setItem('authToken',result.sessionToken);
    sessionStorage.setItem('userId',result.objectId);
    sessionStorage.setItem('email',result.email);
    return result;
}

//username,email,password, gender - options
export async function register(email,username,password){
    const result = await post(settings.host + '/users', {email,username,password});//username,email,password, gender - options
  
    sessionStorage.setItem('username',username);
    sessionStorage.setItem('authToken',result.sessionToken);
    sessionStorage.setItem('userId',result.objectId);
   sessionStorage.setItem('email',result.email);
    
    return result;
}

export async function logout(){
    const result = await post(settings.host + '/logout', {});

    sessionStorage.removeItem('username');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');
    return result;
}
