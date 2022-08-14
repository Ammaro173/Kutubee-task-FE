import { useEffect, useState } from 'react';
import './MemoryGame.css';
import SignleCard from './SignleCard.js';
import axios from 'axios';
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

	//for game
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);
	const [allMatched, setAllMatched] = useState(false);

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

	useEffect(() => {
		axios
			.get('http://localhost:8080/memory-games')
			.then((res) => {
				console.log('res', res.data);
			})
			.catch((err) => {
				console.log('err', err);
			});
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
		<div className='App'>
			<Link id='back' to='/'>
				<img src='/leftArrow.svg' alt='leftArrow' />
			</Link>
			{/* <button>{'🡨'}</button> */}
			{/* <>
				<h2>Breadcrumb Pagination</h2>
				<ul class='breadcrumb'>
					<li>
						<a href='#'>1</a>
					</li>
					<li>
						<a href='#'>2</a>
					</li>
					<li>
						<a href='#'>3</a>
					</li>
					<li>Italy</li>
				</ul>
			</> */}
			<ul>
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li className='active'>4</li>
				<li>5</li>
				<li>6</li>
				<li>7</li>
			</ul>

			<div style={{ marginTop: 48 }}>
				<img src='/levels.svg' alt='level-bar' />
			</div>

			<button onClick={() => playAudio()}>
				<img src='/audio.svg' alt='audio svg' />
			</button>

			<h5 style={{ marginTop: 9 }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laci dollacii met, consectetur ad quam ?
			</h5>
			{/* <button onClick={shuffle}>New Game</button> */}

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
			{/* <p>Turns : {turns}</p> */}
			{/* {allMatched ?? <Navigate replace to='/' />} */}
		</div>
	);
}

export default MemoryGame;
