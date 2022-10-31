import styles from './maker.module.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ FileInput,authService }) => {
	// 배열 + map은 state의 모든 데이터를 일주 후 item을 리턴하지만
	// object는 key만 일주 하고 return하기때문에 양이 많을때 더 빠르다
	const [cards, setCards ] = useState({
		'1': {
			id: '1',
			name: 'Zoe',
			company: 'PolyTech',
			theme: 'dark',
			title: 'FrontEnd Engineer',
			email: 'plasou0114@gmail.com',
			message: 'I can do it',
			fileName: 'lej',
			fileURL: 'lej.png'
		},
		'2': {
			id: '2',
			name: 'Ellie',
			company: 'Samsung',
			theme: 'light',
			title: 'software Engineer',
			email: 'ellie@gmail.com',
			message: 'go for it',
			fileName: 'ellie',
			fileURL: null
		},
		'3': {
			id: '3',
			name: 'Ellie2',
			company: 'Samsung',
			theme: 'colorful',
			title: 'software Engineer',
			email: 'ellie@gmail.com',
			message: 'go for it',
			fileName: 'ellie',
			fileURL: null
		},
	});


	const navigate = useNavigate();
	const onLogout = () => {
		authService.logout();
	};

	useEffect(() => {
		authService.onAuthChange(user => {
			if(!user) {
				navigate('/');
			}
		});
	});

	const createOupdateCard = (card) => {
		setCards(cards => {
			const updated = {...cards};
			updated[card.id] = card;
			return updated;
		});

	};
	const deleteCard = (card) => {
		setCards(cards => {
			const updated = {...cards};
			delete updated[card.id]
			return updated;
		});
	};
		return (
			<section className={styles.maker}>
				<Header onLogout={onLogout} />
				<div className={styles.container}>
					<Editor FileInput={FileInput} cards={cards} addCard={createOupdateCard} updateCard={createOupdateCard} deleteCard={deleteCard} />
					<Preview cards={cards} />
				</div>
				<Footer />
			</section>
		)
	};

export default Maker;