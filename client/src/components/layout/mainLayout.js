import { Fragment } from "react";
import Header from "../common/header";
import Footer from "../common/footer";

export default function MainLayout({ children }) {
	
	return (
		<Fragment>
			<Header />
				<main>
				{children}
				</main>
		
			<Footer />
		</Fragment>
	);
}
