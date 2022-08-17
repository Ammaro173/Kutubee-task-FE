import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<div>
			<br></br>
			<br></br>
			Play- <Link to='/MemoryGame'>MemoryGame</Link>
			<br></br>
			<hr></hr>
			<br></br>
			PLay- <Link to='/QuizGame'>QuizGame</Link>
		</div>
	);
}
