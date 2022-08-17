import { useEffect, useState } from 'react';
import './MemoryGame.css';
import SignleCard from './SignleCard.js';
// import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const cardsImages = [
	{ src: '/img/helmet-1.png', matched: false },
	{ src: '/img/potion-1.png', matched: false },
	{ src: '/img/ring-1.png', matched: false },
	{ src: '/img/scroll-1.png', matched: false },
	// { src: '/img/shield-1.png', matched: false },
	// { src: '/img/sword-1.png', matched: false },
	// { src: '/img/elephant(1).jpg', matched: false },
];

function MemoryGame() {
	// to redirect after all cards are matched
	const navigate = useNavigate();

	const [data1, setData1] = useState([]);
	//for game
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);
	const [allMatched, setAllMatched] = useState(false);
	const [faded, setFaded] = useState(false);

	//for audio
	const [playing, setPlaying] = useState(false);

	// shuffle the cards(creats a new gam)
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
			if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
				console.log('thats a match :)');
				setFaded(true);

				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});

				cards.every((card) => {
					if (card.matched) {
						setAllMatched(true);
					}
				});
				// console.log('allMatched??', allMatched);

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

	const playAudio = () => {
		const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3');
		if (!playing) {
			audio.play();
		}
		setTimeout(() => {
			audio.pause();
			setPlaying(false);
		}, 9000);
		setPlaying(true);
	};

	// eachtime start a new game automatically & shuffle the cards
	useEffect(() => {
		shuffle();
	}, []);

	const fetchData1 = async () => {
		try {
			const res = await fetch('http://localhost:8080/MemoryGames');

			const mem_game = await res.json();
			setData1(mem_game);
			console.log(data1);
		} catch (error) {
			console.log('error', error);
		}
	};

	useEffect(() => {
		fetchData1();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (allMatched) {
			shuffle();
			setAllMatched(false);
			alert('you win');
			navigate('/ResultPage');
		}
	}, [allMatched]);

	return (
		<div className='MemoryGame'>
			<Link id='back' to='/'>
				<img src='/leftArrow.svg' alt='leftArrow' />
			</Link>

			<div style={{ marginTop: 48 }}>
				<img src='/levels.svg' alt='level-bar' />
			</div>

			<button onClick={() => playAudio()}>
				<img src='/audio.svg' alt='audio svg' />
			</button>

			<h2 style={{ marginTop: 9, textAlign: 'left' }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laci dollacii met, consectetur ad quam ?
			</h2>
			{/* <button onClick={shuffle}>New Game</button> */}

			<div className='cards-grid'>
				{cards.map((card) => (
					<SignleCard
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
						disabled={disabled}
						faded={faded}
						isMatched={card.matched}
					/>
				))}
			</div>
			{/* <p>Turns : {turns}</p> */}
		</div>
	);
}

export default MemoryGame;
