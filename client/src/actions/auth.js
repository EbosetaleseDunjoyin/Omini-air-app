import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";
import jwt_decode from 'jwt-decode'

export const createOrGetUser = (response) => async (dispatch) => {
  try {
   const decoded = jwt_decode(response.credential);
   const {given_name,family_name, email, sub, picture} = decoded;

   const user = {
     _id: sub,
     _type: "user",
     firstName: given_name,
     lastName: family_name,
     email: email,
     imageUrl:picture
   };

    // dispatch({ type: AUTH, data });
   console.log(user);
    // router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
