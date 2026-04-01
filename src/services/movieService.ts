import type {Movie} from '../types/movie'
import axios from 'axios'

const url = 'https://api.themoviedb.org/3/search/movie';
const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface moiveServiseProps{
    results : Movie[]
}
export default async function  fetchMovies (query : string){
    const response = await axios.get<moiveServiseProps>(url, {
    params: {
    query 
  },
    headers: {
    Authorization: `Bearer ${myKey}`
  }   
    })
    return response.data.results;
}

