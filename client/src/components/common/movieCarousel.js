import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Carousel() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);

	const fetchMovies = async () => {
		try {
			setIsLoading(true);
			console.log('Fetching movies for carousel');

			const response = await axios.get('http://localhost:4000/api/movies_poster');
			const data = response.data;
			console.log('Data:', data);

			const {  extraMovies } = data;

			setMovies(extraMovies);
			console.log('Movie carousel items fetched!:', extraMovies);

		} catch (error) {
			console.error('Error fetching movies for carousel:', error);
		} finally {
			setIsLoading(false);
		}
		
	};
	
	useEffect(() => {
		fetchMovies();
	}, []);

	const handleNext = () => {
		setCurrentIndex(prevIndex => (prevIndex + 1) % movies.length);
	};

	const handlePrev = () => {
		setCurrentIndex(prevIndex => (prevIndex - 1 + movies.length) % movies.length);
	};

	return (
		<section className='carousel-container'>
			<h2 className='carousel-title'>Bestsellers</h2>
			<article className='carousel'>
				{isLoading ? (
					<p>Loading...</p>
				) : movies.length === 0 ? (
					<p>No movies found</p>
					) : (
						<>
					{/* Render the movies here*/}
								<h3 className='carousel-movie-title'>{movies[currentIndex].title}</h3>
								<p className='carousel-movie-year'>{movies[currentIndex].year}</p>
								<img className='carousel-movie' src={movies[currentIndex].poster} alt={movies[currentIndex].title} />
							</>
					
				)}
			</article>
	
			<button className='carousel-btn-prev' onClick={handlePrev}>Previous</button>
			<button className='carousel-btn-next' onClick={handleNext}>Next</button>
		</section>
	);
}