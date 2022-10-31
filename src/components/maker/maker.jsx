import styles from './maker.module.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ authService }) => {
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

	const createOrupdateCard = (card) => {
		setCards(cards => {
			const updated = {...cards};
			updated[card.id] = card;
			return updated;
		});

	};
	const deleteCard = (card) => {
		setCards(cards => {
			const updated = {...cards};
			delete updated[card.id];
			return updated;
		});
	};
		return (
			<section className={styles.maker}>
				<Header onLogout={onLogout} />
				<div className={styles.container}>
					<Editor cards={cards} addCard={createOrupdateCard} updateCard={createOrupdateCard} deleteCard={deleteCard} />
					<Preview cards={cards} />
				</div>
				<Footer />
			</section>
		)
	};

export default Maker;