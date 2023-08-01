import MovieList from '../common/movieList'
import '../../CSS/home.css'
import '../../CSS/layout.css'

// import Layout from '../layout/Layout';
import { Outlet } from 'react-router-dom'





export default function Home() {
	const currentYear = new Date().getFullYear()

	return (
		<>


			<section className='movie-selection'>
				<h1 className='home-title'>Welcome to GetFlicks!</h1>

				<p className='home-subtitle'>Your one-stop shop for all things second-hand Bluray & DVD's!</p>

				<div className="card-container">
				
					<MovieList year={ currentYear } />
			
				</div>
				<Outlet />
			</section>




		</>
	)
}