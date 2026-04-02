import type {Movie} from '../types/movie'
import axios from 'axios'

const url = 'https://api.themoviedb.org/3/search/movie';
const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface MovieServiseProps{
    results : Movie[]
}

export default async function  fetchMovies (query : string): Promise<Movie[]> {
    const response = await axios.get<MovieServiseProps>(url, {
    params: {
    query 
  },
    headers: {
    Authorization: `Bearer ${myKey}`
  }   
    })
    return response.data.results;
}

