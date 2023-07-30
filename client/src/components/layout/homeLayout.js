import Header from "../common/header";
import Footer from "../common/footer";
import Carousel from "../common/movieCarousel";
import React from "react";
// import Layout from "./Layout";

export default function HomeLayout ({children}) {
	return (
		<React.Fragment>
			<Carousel />
			<Header />
			<main>
			{children}
			</main>
			<Footer />
		</React.Fragment>
	);
}