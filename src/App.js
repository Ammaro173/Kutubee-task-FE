import './App.css';
import React from 'react';

import { Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home/Home';
import MemoryGame from './components/MemoryGame/MemoryGame';
import ResultPage from './components/ResultPage/ResultPage';
import QuizGame from './components/QuizGame/QuizGame';

const PageNotFound = () => (
	<div>
		<h1>
			404! PageNotFound -&gt; <Link to='/'>Home</Link>
		</h1>

		<img src='/sad_bee.svg' alt='sad bee' style={{ marginTop: 100 }} />
	</div>
);

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route index element={<Home />} />
				<Route path='*' element={<PageNotFound />} />
				<Route path='MemoryGame' element={<MemoryGame />} />
				<Route path='QuizGame' element={<QuizGame />} />
				<Route path='ResultPage' element={<ResultPage />} />
			</Routes>
		</div>
	);
}

export default App;
