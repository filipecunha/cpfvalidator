'use client';

import Image from 'next/image';
import styles from './page.module.css';

import logo from '@/assets/images/nstech.webp';
import { useState } from 'react';

export default function Home() {
	const [cpf, setCpf] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState('');

	const iniMsg = {
		message: '',
		insert: false,
	};

	const [msg, setMsg] = useState(iniMsg);

	const fetchData = async () => {
		const response = await fetch(`/api/cpf/${cpf}`);
		const data = await response.json();

		console.log(data.insert);

		setMsg(data);
	};

	const onKeyPress = (evt) => {
		if (evt.code === 'Enter' && cpf !== '') {
			fetchData();
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<Image src={logo} alt='Logo' width={400} />
				<input
					onKeyPress={onKeyPress}
					className={styles.input}
					type='text'
					placeholder='Digite o registro'
					value={cpf}
					onChange={(evt) => setCpf(evt.target.value)}
				/>
				{msg.message && (
					<p className={msg.insert ? styles.successMsg : styles.errorMsg}>
						{msg.message}
					</p>
				)}
			</div>
		</div>
	);
}
