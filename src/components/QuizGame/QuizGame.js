import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './QuizGame.css';

function QuizGame() {
	document.addEventListener('keydown', (e) => {
		if (e.keyCode === 116) {
			e.preventDefault();
		}
	});
	const [data2, setData2] = useState([]);
	const [id, setId] = useState();
	// Properties
	const [showResults, setShowResults] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answer, setAnswer] = useState();
	const [showWrong, setShowWrong] = useState(false);
	const [score, setScore] = useState(0);
	const [disabled, setDisabled] = useState(true);
	const [choosed, setChoosed] = useState(false);
	//for audio
	const [playing, setPlaying] = useState(false);

	const fetchData2 = async () => {
		try {
			const res = await fetch('http://localhost:8080/QuizGames');

			const qz_game = await res.json();
			setData2(qz_game);
			// console.log(data2);
			// data2.map((ele) => console.log(ele));
		} catch (error) {
			console.log('error', error);
		}
	};
	useEffect(() => {
		fetchData2();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// console.log(data2);
	const arr = [];

	data2 &&
		data2.map((ele) => {
			let obj = {
				text: ele.QuestionTag || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laci dollacii met, consectetur ad quam ?',
				options: [
					{ id: 0, text: ele.Answer1, isCorrect: ele.isCorrect1 || false },
					{
						id: 1,
						text: ele.Answer2,
						isCorrect: ele.isCorrect2 || false,
					},
					{ id: 2, text: ele.Answer3, isCorrect: ele.isCorrect3 || false },
					{ id: 3, text: ele.Answer4, isCorrect: ele.isCorrect4 || false },
				],
			};
			arr.push(obj);
			// console.log('arrr', arr);
		});

	const questions = [
		{
			text: 'What is the capital of America?',
			options: [
				{ id: 0, text: 'New York City', isCorrect: false },
				{ id: 1, text: 'Boston', isCorrect: false },
				{ id: 2, text: 'Santa Fe', isCorrect: false },
				{ id: 3, text: 'Washington DC', isCorrect: true },
			],
		},
		{
			text: 'What year was the Constitution of America written?',
			options: [
				{ id: 0, text: '1787', isCorrect: true },
				{ id: 1, text: '1776', isCorrect: false },
				{ id: 2, text: '1774', isCorrect: false },
				{ id: 3, text: '1826', isCorrect: false },
			],
		},
		{
			text: 'Who was the second president of the US?',
			options: [
				{ id: 0, text: 'John Adams', isCorrect: true },
				{ id: 1, text: 'Paul Revere', isCorrect: false },
				{ id: 2, text: 'Thomas Jefferson', isCorrect: false },
				{ id: 3, text: 'Benjamin Franklin', isCorrect: false },
			],
		},
		{
			text: 'What is the largest state in the US?',
			options: [
				{ id: 0, text: 'California', isCorrect: false },
				{ id: 1, text: 'Alaska', isCorrect: true },
				{ id: 2, text: 'Texas', isCorrect: false },
				{ id: 3, text: 'Montana', isCorrect: false },
			],
		},
		{
			text: 'Which of the following countries DO NOT border the US?',
			options: [
				{ id: 0, text: 'Canada', isCorrect: false },
				{ id: 1, text: 'Russia', isCorrect: true },
				{ id: 2, text: 'Cuba', isCorrect: true },
				{ id: 3, text: 'Mexico', isCorrect: false },
			],
		},
	];

	// Helper Functions

	/* A possible answer was clicked */
	const optionClicked = (isCorrect) => {
		// Increment the score
		if (isCorrect) {
			setScore(score + 1);
			playAudio();
			if (currentQuestion + 1 < questions.length) {
				setTimeout(() => {
					setCurrentQuestion(currentQuestion + 1);
					setChoosed(false);
					setShowWrong(false);
				}, 2000);
			} else {
				setTimeout(() => {
					setShowResults(true);
				}, 2200);

				// setTimeout(() => {
				// 	restartGame();
				// }, 5000);
			}
		} else {
			setShowWrong(true);
			setTimeout(() => {
				setShowWrong(false);
				setChoosed(false);
			}, 2000);
		}

		setDisabled(true);
	};

	/* Resets the game back to default */
	const restartGame = () => {
		setScore(0);
		setCurrentQuestion(0);
		setShowResults(false);
		setChoosed(false);
	};

	const playAudio = () => {
		const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');
		if (!playing) {
			audio.play();
		}
		setTimeout(() => {
			audio.pause();
			setPlaying(false);
		}, 2000);
		setPlaying(true);
	};

	return (
		<div className='QuizGame'>
			<Link id='back' to='/'>
				<img src='/leftArrow.svg' alt='leftArrow' />
			</Link>
			<ul>
				current question ={currentQuestion + 1}
				{arr?.map((_, i) => (
					<li className={currentQuestion + 1 === i + 1 ? 'active' : 'notActive'}>{i + 1}</li>
				))}
			</ul>
			<button id='audio' onClick={() => playAudio()}>
				<img src='/audio.svg' alt='audio svg' />
			</button>

			<div style={{ marginTop: 48 }}>
				<img src='/levels.svg' alt='level-bar' />
			</div>

			{/* 3. Show results or show the question game  */}
			{showResults ? (
				/* 4. Final Results */
				<div className='final-results'>
					<h1>Final Results</h1>
					<h2>
						{score} out of {arr?.length} correct - ({(score / arr?.length) * 100}%)
					</h2>
					<button onClick={() => restartGame()}>Restart game</button>
				</div>
			) : (
				/* 5. Question Card  */
				<div className='question-card'>
					<h2 id='question'>{arr[currentQuestion]?.text}</h2>
					{/* Current Question  */}
					{/* <h2>
						Question: {currentQuestion + 1} out of {arr.length}
					</h2> */}
					{/* <h3 className='question-text'>{arr[currentQuestion].text}</h3> */}

					{/* List of possible answers  */}
					<ol>
						{arr[currentQuestion]?.options.map((option) => {
							return (
								<li key={option.id} className={!showWrong && disabled && choosed && option.isCorrect ? 'correctLi' : 'incorrectLi'}>
									<button
										className={!showWrong && disabled && choosed && option.isCorrect ? 'correct' : 'incorrect'}
										onClick={() => {
											setAnswer(option.isCorrect);
											setDisabled(false);
											setChoosed(true);
											setId(option.id);
										}}
										key={option.id}
										id={option.id}
									>
										{option.text}
									</button>
								</li>
							);
						})}
					</ol>
					{choosed && showWrong ? (
						<div style={{ textAlign: 'left', display: 'flex', gap: 10 }}>
							<img src='/ex.svg' alt='ex' />
							<p style={{ color: '#E52730', fontFamily: 'FF Hekaya Light', fontSize: '36px' }}>Your answer is wrong, try again </p>
						</div>
					) : (
						<></>
					)}
					<button id={choosed ? 'check' : 'notCheck'} onClick={() => optionClicked(answer)} disabled={disabled}>
						Check
					</button>
				</div>
			)}
		</div>
	);
}

export default QuizGame;

// onClick={() => optionClicked(option.isCorrect)}
