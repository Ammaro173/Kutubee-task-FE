import React from 'react';
import './ResultPage.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResultPage() {
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location);
	// console.table(location);
	let { state } = location;
	// console.log(state);

	return (
		<>
			{state.passed ? (
				<div>
					<img src='/won.svg' alt='party bee' style={{ marginTop: 100 }} />
					<button className='btn-end' onClick={() => navigate('/')}>
						Explore the Library
					</button>
				</div>
			) : (
				<div>
					<img src='/lost.svg' alt='sad bee' style={{ marginTop: 100 }} />
					<button className='btn-endL' onClick={() => navigate('/')}>
						Go back to open library
					</button>

					<button className='btn-endR' onClick={() => navigate(-1)}>
						Read Again
					</button>
				</div>
			)}
		</>
	);
}
