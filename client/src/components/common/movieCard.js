import { useContext } from 'react';
import { MoviesContext } from '../../contexts/moviesContext'
import CartContext from '../../contexts/cartContext'
import { useNavigate } from 'react-router-dom';



export default function MovieCard({ item }) {
	const { addMovies, removeMovies } = useContext(MoviesContext);
	const { addToCart, removeFromCart } = useContext(CartContext);
    const history = useNavigate();
	
	const handleAdd = () => {
		addMovies(item);
		history.push({
			pathname: '/cart',
			state: { action: 'add', item: item }
		});
	};
	const handleRemove = () => {
		removeMovies(item)
		history.push({
			pathname: '/cart',
			state: { action: 'remove', item: item }
		})
	};

	 const genres = item.genres || [];
	
	console.log(item);
	


	return (
		<section className='movie-card'>
					
						<h2 className='movie-title'>{item.title}</h2>
						<img className='movie-poster' src={item.poster} alt={item.title} />
						<ul className='movie-info'>
							<li className='movie-genres'>Genres: {genres.join(', ')}</li>
							<li className='movie-year'>Year: {item.year}</li>
							<li className='movie-price'>Price: {item.price}</li>
							<p className='movie-hasStock'>{item.hasStock}</p>
							<li className='movie-stock'>Stock: {item.stock}</li>
						</ul>
						
						<button className='btn-add' onClick={handleAdd}>Add to cart</button>
						<button className='btn-remove' onClick={handleRemove}>Remove from cart</button>
			
		</section>
)};

