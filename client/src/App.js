import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLayout from './components/layout/homeLayout';
 import MainLayout from './components/layout/mainLayout';
import Home from './components/pages/home';
import Cart from './components/pages/cart';
import MoviesProvider from '../../client/src/contexts/moviesProvider';
// import CartProvider from '../../client/src/controllers/cartController';
// import Order from './pages/order';
// import Search from './pages/search';

function App() {
    return (
        <Router>
            <div className="App">
                <MoviesProvider>
                    {/* <CartProvider> */}
                <Routes>
                    <Route path="/" index element={ <HomeLayout><Home /></HomeLayout> } />
                    {/* <Route path="/search" element={
              <MainLayout>
              <Route path="/" element={<search />} />
              </MainLayout>
             }
             />*/}
                    <Route path="/cart" element={ <MainLayout><Cart /></MainLayout> }
                    />
                </Routes>
                    {/* </CartProvider>*/}
                </MoviesProvider>
            </div>

        </Router >
    )
}
export default App