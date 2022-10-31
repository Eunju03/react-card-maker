import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './login.module.css';

const Login = ({ authService }) => {
	const navigate = useNavigate();
	const goToMaker = (userId) => {
		navigate('/maker', {state: {id:userId}});
	};
	const onLogin = (event) => {
		authService //
			.login(event.currentTarget.textContent)
			.then(data =>  goToMaker(data.user.uid));
	};

	// 이미 로그인되어있을 때 홈을 누르면 로그인페이지말고 maker로 감
	useEffect(() => {
		authService.onAuthChange(user => {
			user && goToMaker(user.id);
		})
	});
	return (
		<section className={styles.login}>
			<Header />
				<section>
					<h1>Login</h1>
					<ul className={styles.list}>
						<li className={styles.item}>
							<button className={styles.button} onClick={onLogin}>Google</button>
						</li>
						<li className={styles.item}>
							<button className={styles.button} onClick={onLogin}>Github</button>
						</li>
					</ul>
				</section>
			<Footer />
		</section>
	);
}

export default Login;