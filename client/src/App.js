import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLayout from './components/layout/homeLayout';
// import Main Layout from './components/layout/mainLayout';
import Home from './components/pages/home';
// import Cart from './pages/cart';
// import Order from './pages/order';
// import Search from './pages/search';

function App() {
  return (
    <Router>
      <div className="App">
      <HomeLayout>
        <Routes>
            <Route path="/" index element={<Home />} />
            {/* <Route path="/search" element={
              <MainLayout>
              <Route path="/" element={<search />} />
              </MainLayout>
             }
             />
             <Route path="/cart" element={
              <MainLayout>
              <Route path="/" element={<Cart />} />
              </MainLayout>
             } 
             /> */}
        </Routes>
      </HomeLayout>

      </div>

    </Router >
    );
}
export default App;
