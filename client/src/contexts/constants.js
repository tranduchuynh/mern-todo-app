export const apiUrl = process.env.NODE_ENV !== 'production' ? 'https://fathomless-falls-04415.herokuapp.com/api': 'some deployed url';

export const LOCAL_STORAGE_TOKEN_NAME = 'mern-token';

export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS';
export const POSTS_LOADED_FAIL = 'POSTS_LOADED_FAIL';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const FIND_POST = 'FIND_POST';