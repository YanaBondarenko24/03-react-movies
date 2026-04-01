
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
  const [instaillMovies, setInstaillMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  


const feachCard = async(search : string) => {
  try { 
  setIsLoading(true);
   const searchMovie = await fetchMovies(search);
   setInstaillMovies(searchMovie)
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
setIsLoading(true);
setIsError(true);
  }finally{
setIsLoading(false);
setIsError(false);
  }
}


  return(
    <>
<SearchBar onSubmit={feachCard}/>
  <Toaster />
  {isLoading && <Loader/>}
  {isError && <ErrorMessage/>}
 {instaillMovies.length > 0 && <MovieGrid onSelect={(movie) => {setIsOpen(true); setSelectedMovie(movie)}} movies ={instaillMovies} />}
 {isOpen && <MovieModal onClose={() => {setIsOpen(false); setSelectedMovie(null)}}  movie={selectedMovie}/>}  
    </>
  )
}