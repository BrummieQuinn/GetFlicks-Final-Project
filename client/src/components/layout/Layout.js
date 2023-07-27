import { Outlet, Link } from "react-router-dom";

export default function Layout() {
	
	return (
		<>
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/">Home</Link>
					</li>
					<li className="nav-item">
						<Link to="/blogs">Search</Link>
					</li>
					<li className="nav-item">
						<Link to="/contact">Basket</Link>
					</li>
				</ul>
			</nav>
		

			<Outlet />
		</>
	  );
}
