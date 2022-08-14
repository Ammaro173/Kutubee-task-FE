//rfc
import React from 'react';
import './SignleCard.css';

export default function SignleCard({ card, handleChoice, flipped, disabled }) {
	// console.log(disabled);
	const hadnleClick = () => {
		if (!disabled) {
			handleChoice(card);
		}
	};

	return (
		<div className='card' key={card.id}>
			<div className={flipped ? 'flipped' : ''}>
				<img className='frontOfCard' src={card.src} alt='front Of Card <3' />
				<img
					className='backOfCard'
					src='/img/yellowQ(1).jpg'
					onClick={hadnleClick}
					alt='back Of Card ?'
					style={{ height: 200, width: 200 }}
				/>
			</div>
		</div>
	);
}
