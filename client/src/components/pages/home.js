import MovieList from '../common/movieList';
import '../../CSS/home.css';
import Carousel from '../common/movieCarousel'




export default function Home() {
	const currentYear = new Date().getFullYear();

	return (
		<main className='home'>
			<section className='movie-selection'>
				<h1 className='home-title'>Welcome to GetFlicks!</h1>
				<p className='home-subtitle'>Your one-stop shop for all things second-hand Bluray & DVD's!</p>
				<Carousel />
				<div className="card-container">
					
					<MovieList year={currentYear} />
					
				</div>
			</section>
		</main>
	)
}
