import  { useEffect, useState } from 'react';
import MovieCard from './movieCard';

import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
	try {
	  setIsLoading(true);
	  console.log('Fetching movie items');

	  const response = await axios.get('http://localhost:4000/api/movies_poster');
	  const data = response.data;
	  console.log('Data:', data);

	  const {first14Movies} = data;

	  setMovies(first14Movies);
	  console.log('Movie items fetched!:', first14Movies);
	} catch (error) {
	  console.error('Error fetching movie items:', error);
	} finally {
	  setIsLoading(false);
	}
  };

  useEffect(() => {
	fetchMovies();
  }, []);

	return (
		<>
			
			<section className='movie-list'>
				<h2 className='moviecard-title'>Most Popular Titles</h2>
				{isLoading ? (
					<p>Loading...</p>
				) : movies.length === 0 ? (
						<p>No Movies found</p>
					) : (
					movies.map(item => <MovieCard key={item._id} item={item} />)
				)}
			</section>
		</>
	);
}

export default MovieList;
