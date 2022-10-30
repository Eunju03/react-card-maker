import styles from './maker.module.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ authService }) => {
	const [cards, setCards ] = useState([
		{
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
		{
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
		{
			id: '3',
			name: 'Ellie2',
			company: 'Samsung',
			theme: 'colorful',
			title: 'software Engineer',
			email: 'ellie@gmail.com',
			message: 'go for it',
			fileName: 'ellie',
			fileURL: null
		}
	]);
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
		return (
			<section className={styles.maker}>
				<Header onLogout={onLogout} />
				<div className={styles.container}>
					<Editor cards={cards} />
					<Preview cards={cards} />
				</div>
				<Footer />
			</section>
		)
	};

export default Maker;