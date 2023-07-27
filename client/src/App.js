import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/pages/home';
// import Cart from './pages/cart';
// import Order from './pages/order';
// import NotFound from './pages/404';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout />
        <Routes>
          <Route path="/" index element={<Home />} />
        </Routes> 
    
    
      </div>
     <Outlet />
    
    </Router >      
  );
}
export default App;
