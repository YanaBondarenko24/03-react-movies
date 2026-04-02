
import SearchBar from '../SearchBar/SearchBar'
import fetchMovies from '../../services/movieService'
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useState } from 'react';
import {type Movie} from '../../types/movie'
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  


const fetchCard = async(search : string) => {
  try { 
  setIsLoading(true);
  setIsError(false);
  setMovies([])
   const searchMovie = await fetchMovies(search);
   setMovies(searchMovie)
    if (searchMovie.length === 0) {
      toast("No movies found for your request.",
      {
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  })
}   
} catch {
setIsLoading(false);
setIsError(true);
  }finally{
setIsLoading(false);
  }
}


  return(
    <>
<SearchBar onSubmit={fetchCard}/>
  <Toaster />
  {isLoading && <Loader/>}
  {isError && <ErrorMessage/>}
 {movies.length > 0 && <MovieGrid onSelect={(movie) => {setIsOpen(true); setSelectedMovie(movie)}} movies ={movies} />}
 {isOpen && <MovieModal onClose={() => {setIsOpen(false); setSelectedMovie(null)}}  movie={selectedMovie}/>}  
    </>
  )
}