import {  useEffect, useState } from 'react';
import { useCart } from '../../controllers/cartController';
import { useNavigate } from 'react-router-dom';



export default function MovieCard({ item }) {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useCart();
  const [cartChanged, setCartChanged] = useState(false);
  const handleAdd = () => {
    if (item.stock === 0) {
      console.log('Item is out of stock');

    } else {
      console.log('Adding movies:', item);
   
   
    addToCart(item);
    console.log('Redirecting to /cart with state:', { action: 'add', item: item });
      navigate('/cart', { state: { action: 'add', item: item } });
    }
  };

  const handleRemove = () => {
    console.log('Removing movies:', item);
    removeFromCart(item);
    console.log('Redirecting to /cart with state:', { action: 'remove', item: item });
    navigate('/cart', { state: { action: 'add', item: item } });
  };

  // intialise the cart state from local storage
  // save the cart to local storage
  useEffect(() => {
    if (cartChanged) {
      localStorage.setItem('cart', JSON.stringify(cart));
      setCartChanged(false);
    }
  }, [cart, cartChanged]);


  console.log('cart', cart);
  console.log('item', item);

   

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
  );
};

