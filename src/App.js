import { useEffect, useState } from 'react';
import './App.css';
import SignleCard from '../src/components/SignleCard.js';

const cardsImages = [
	{ src: '/img/helmet-1.png', matched: false },
	{ src: '/img/potion-1.png', matched: false },
	{ src: '/img/ring-1.png', matched: false },
	{ src: '/img/scroll-1.png', matched: false },
	{ src: '/img/shield-1.png', matched: false },
	{ src: '/img/sword-1.png', matched: false },
];

function App() {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	// shuffle the cards
	const shuffle = () => {
		// shuffle the cards based on sort each item in the array (positive number will switch the position / negative number will keep the position)
		const shuffledCards = [...cardsImages, ...cardsImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));
		setCards(shuffledCards);
		setTurns(0);

		//just in case
		setChoiceOne(null);
		setChoiceTwo(null);
		setDisabled(false);
	};

	// console.log('cards', cards);
	console.log('turns', turns);
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
		// setDisabled(true);
		// console.log('choiceOne', choiceOne);
		// console.log('choiceTwo', choiceTwo);
	};

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.src === choiceTwo.src) {
				console.log('thats a match :)');

				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});

				resetTurn();
			} else {
				console.log('no match :(');
				setTimeout(() => {
					resetTurn();
				}, 1000);
			}
			// setTurns(turns + 1);
		}
	}, [choiceOne, choiceTwo]);

	console.log('check state new', cards);

	// reset choices choosen and increase the turns
	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prevTurns) => prevTurns + 1);
		setDisabled(false);
	};

	// eachtime start a new game automatically & shuffle the cards
	useEffect(() => {
		shuffle();
	}, []);

	return (
		<div className='App'>
			<button id='back'>{'🡨'}</button>
			<h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laci dollacii met, consectetur ad quam ?</h5>
			<button onClick={shuffle}>New Game</button>

			<div className='cards-grid'>
				{cards.map((card) => (
					<SignleCard
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
						disabled={disabled}
					/>
				))}
			</div>
			<p>Turns : {turns}</p>
		</div>
	);
}

export default App;
