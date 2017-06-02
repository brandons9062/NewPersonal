import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'brandons9062.auth0.com',
    clientID: 'hpzmH6RwHJQFPXz0F8hHBQZxxCZ0I8bz',
    redirectUri: 'http://localhost:3000',
    audience: 'https://brandons9062.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}