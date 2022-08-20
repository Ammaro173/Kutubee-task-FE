import { useEffect, useState } from 'react';
import './MemoryGame.css';
import SignleCard from './SignleCard.js';
// import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3');
const cardsImages = [
	// { src: '/img/helmet-1.png', matched: false },
	{ src: '/img/potion-1.png', matched: false },
	{ src: '/img/ring-1.png', matched: false },
	{ src: '/img/scroll-1.png', matched: false },
	{ src: '/img/shield-1.png', matched: false },
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
	const [score, setScore] = useState(0);

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
		setAllMatched(false);
	};
	// eachtime start a new game automatically & shuffle the cards
	useEffect(() => {
		shuffle();
	}, []);

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
				setScore(score + 1);
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

				// console.log('allMatched??', allMatched);
				setTimeout(() => {
					resetTurn();
				}, 800);
			} else {
				console.log('no match :(');
				setTimeout(() => {
					resetTurn();
				}, 1000);
			}

			// setTurns(turns + 1);
		}

		// eslint-disable-next-line array-callback-return

		// check if every card has matched as true
		// if (cards?.every((card) => card.matched === true)) {
		// 	setAllMatched(true);
		// }

		// eslint-disable-next-line  array-callback-return
		// cards.every((card) => {
		// 	if (card.matched === true && card.matched !== false) {
		// 		setAllMatched(true);
		// 	}
		// });
		// cards.every(isAllMatched);

		// function isAllMatched(el, index, arr) {
		// 	el.matched === true ? setAllMatched(true) : setAllMatched(false);
		// }

		if (score === cardsImages.length && score !== 0) {
			setAllMatched(true);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		if (!playing) {
			audio.play();
		}
		setTimeout(() => {
			audio.pause();
			setPlaying(false);
		}, 9000);
		setPlaying(true);
	};

	const fetchData1 = async () => {
		try {
			const res = await fetch('https://kutubee-task-be.herokuapp.com/MemoryGames');

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
			if (turns < 10) {
				setTimeout(() => {
					// alert('Game Over Win');
					navigate('/ResultPage', { state: { passed: true } });
				}, 1000);
			} else {
				setTimeout(() => {
					// alert('Game Over Lost');
					navigate('/ResultPage', { state: { passed: false } });
				}, 1000);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
