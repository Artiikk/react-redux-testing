import { GET_POSTS } from './types';
import axios from 'axios';

export const fetchPosts = () => async (dispatch) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
    dispatch({ type: GET_POSTS, payload: response.data })
  } catch (err) {
    console.log('error', err)
  }
};