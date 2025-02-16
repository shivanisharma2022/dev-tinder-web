// for production only

// export const BASE_URL = "/api";

// for dev

//export const BASE_URL = "http://localhost:4000";

export const BASE_URL = 
location.hostName === 'localhost' ? 'http://localhost:4000' : '/api';

export const BASIC_AUTH_USERNAME = 'devTinder';
export const BASIC_AUTH_PASSWORD = 'dev@tinder$4000';