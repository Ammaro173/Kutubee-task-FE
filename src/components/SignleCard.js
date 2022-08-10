//rfc
import React from 'react';
import './SignleCard.css';

export default function SignleCard({ card, handleChoice, flipped, disabled }) {
	console.log(disabled);
	const hadnleClick = () => {
		if (!disabled) {
			handleChoice(card);
		}
	};

	return (
		<div className='card' key={card.id}>
			<div className={flipped ? 'flipped' : ''}>
				<img className='frontOfCard' src={card.src} alt='front Of Card <3' />
				<img className='backOfCard' src='/img/cover.png' onClick={hadnleClick} alt='back Of Card ?' />
			</div>
		</div>
	);
}
