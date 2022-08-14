import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';

import { Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home/Home';
import MemoryGame from './components/MemoryGame/MemoryGame';
import ResultPage from './components/ResultPage/ResultPage';

const PageNotFound = () => (
	<div>
		<h1>
			404! PageNotFound -&gt; <Link to='/'>Home</Link>
		</h1>

		<img src='/sad_bee.svg' alt='sad bee' style={{ marginTop: 100 }} />
	</div>
);

function App() {
	const [data, setData] = useState([]);

	const fetchData = async () => {
		try {
			const res = await fetch('http://localhost:8080/memory-games');

			const datam = await res.json();
			setData(datam);
			console.log(data);
		} catch (error) {
			console.log('error', error);
		}
	};

	useEffect(() => {
		fetchData();
	});

	return (
		<div className='body'>
			<Routes>
				<Route index element={<Home />} />
				<Route path='MemoryGame' element={<MemoryGame />} />
				<Route path='*' element={<PageNotFound />} />
				<Route path='ResultPage' element={<ResultPage props={'hi'} />} />
			</Routes>
		</div>
	);
}

export default App;
