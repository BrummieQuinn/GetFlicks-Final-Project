import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CartContext from '../../contexts/cartContext'
import {calculateTotalPrice, getCart} from '../../controllers/cartController'
import Modal from '../common/modal'
import { useLocation } from 'react-router-dom'

const Cart = () => {
    const location = useLocation()

    const { cart, addToCart, removeFromCart, emptyCart, } = useContext(CartContext)

    const [purchased, setPurchase] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const [itemToPurchase, setItemToPurchase] = useState(null)

    const getTotalPrice = () => {
        return calculateTotalPrice(cart);
    };



    const handleBuyClick = (item) => {
        setItemToPurchase(item)
        setShowModal(true)
    }

    const handleConfirmPurchase = () => {
        emptyCart()
        setShowModal(false)
        setPurchase(true)
    }

    const handleCancelPurchase = () => {
        setShowModal(false)
    }

   

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        if (location.state) {
            const { action, item } = location.state
            if (action === 'add') {
                addToCart(item)
            } else if (action === 'remove') {
                removeFromCart(item)
            }
        }
    }, [location.state, addToCart, removeFromCart])



    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart,  getTotalPrice, getCart }}>
        <h1 className="Basket-title">My Cart</h1>
        {cart.map((item) => (
            <div key={item.title} className="Basket-container">
                <h2 className="basket-item-title">{item.title}</h2>
                <img className='movie-poster' src={item.poster} alt={item.title} />
                <h3>{item.price}</h3>
                <p className="basket-total">Total(£): {getTotalPrice()} GBP</p> {/**Need to fix the constant rendering of price on purchase confirm */ }
                <button type="button" className="btn-purchase" onClick={() => handleBuyClick(item)}>Buy</button>
                <Modal show={showModal} onClose={() => setShowModal(false)} onConfirm={handleConfirmPurchase} onCancel={handleCancelPurchase} item={itemToPurchase} />
            </div>
        ))}
        {purchased && <p>Thank you for your purchase!"</p>}
        <Link to="/">Back to Home</Link>
    </CartContext.Provider>
    )
    }
    export default Cart
    