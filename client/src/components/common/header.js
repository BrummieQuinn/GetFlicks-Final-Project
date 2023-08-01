import { Link } from "react-router-dom";


export default function Header() {
	return (
		<header className="nav-container">
			<nav className="navbar">
					<ul className="nav">
						<li className="nav-item">
							<Link to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link to="/search"></Link>
							<input
								type="search"
								className="search-box"
								placeholder="🔎 Search..."
							></input>
						</li>
						<li className="nav-item">
							<Link to="/cart">Basket</Link>
						</li>
					</ul>
				</nav>
			</header>

	)
}