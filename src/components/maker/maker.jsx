import styles from './maker.module.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ FileInput,authService, cardRepository }) => {
	// 배열 + map은 state의 모든 데이터를 일주 후 item을 리턴하지만
	// object는 key만 일주 하고 return하기때문에 양이 많을때 더 빠르다
	const NavigateState = useNavigate().state;
	const [cards, setCards ] = useState({});
	const [userId, setUserId] = useState(NavigateState && NavigateState.id);

	const navigate = useNavigate();
	const onLogout = () => {
		authService.logout();
	};

	useEffect(() => {
		if(!userId) {
			return;
		}
		const stopSync =  cardRepository.syncCards(userId, cards => {
			setCards(cards);
		})
		return () => stopSync();
	}, [userId]);
	
	useEffect(() => {
		authService.onAuthChange(user => {
			if(user) {
				setUserId(user.uid);
			} else {
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
		cardRepository.saveCard(userId, card);
	};
	const deleteCard = (card) => {
		setCards(cards => {
			const updated = {...cards};
			delete updated[card.id]
			return updated;
		});
		cardRepository.removeCard(userId, card);
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