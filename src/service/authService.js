import axios from "axios";

const API_URL = "http://localhost:3000";

export const signUpService = (firstName, lastName, username, password,confirmPassword) => {
    return axios.post(`http://localhost:3000/auth/register`, {
      username: username,
      password: password,
    });
  };
  
  export const loginService = (username, password) => {
      return axios.post('api/auth/login',{
          username:username,
          password:password
      });
  };
