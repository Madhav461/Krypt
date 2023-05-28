import React from 'react'
import {useState} from "react"
 import Navbar from './Navbar';
import Welcome from './components/Welcome';
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import Transactions from "./components/Transactions";
import Services from "./components/Services";

class App extends React.Component {
	
	
	render() {
		return (

		<div className='min-h-screen'>
			<div className='gradient-bg-welcome'>
				<Navbar></Navbar>
				<Welcome></Welcome>

			</div>
			<Services></Services>
			<Transactions></Transactions>
			<Footer></Footer>

		</div>
			
	);
}
}



export default App;















