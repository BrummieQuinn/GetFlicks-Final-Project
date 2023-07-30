import { Link } from "react-router-dom";

export default function Footer() {

	const currentDate = new Date().toLocaleDateString();
	const currentTime = new Date().toLocaleTimeString();
	
return (
		<footer className="footer">
			<p className="footer-datetime">
				{currentDate} - {currentTime}{" "}
			</p>
			<p className="footer-year">
				© {new Date().getFullYear()} GetFlicks. All rights reserved.
			</p>
		</footer>
	);

}